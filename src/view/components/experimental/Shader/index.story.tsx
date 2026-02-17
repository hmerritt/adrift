import * as stylex from "@stylexjs/stylex";
import { useFixtureInput } from "react-cosmos/client";

import { Stack } from "view/components";
import { Shader } from "view/components/experimental/Shader";

const GLSL = () => {
	const [inline] = useFixtureInput(
		"inline",
		`void mainImage(out vec4 fragColor, vec2 fragCoord) {
	float mr = min(iResolution.x, iResolution.y);
	vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;

	float d = -iTime * 0.8;
	float a = 0.0;
	for (float i = 0.0; i < 8.0; ++i) {
		a += cos(i - d - a * uv.x);
		d += sin(uv.y * i + a);
	}
	d += iTime * 0.5;

	vec3 colorA = vec3(0.0, 0.4, 1); // Blue
	vec3 colorB = vec3(.03, .03, .03); // Black
	float t = cos(a) * 0.5 + 0.5;
	vec3 col = mix(colorA, colorB, t);

	fragColor = vec4(col, 1);
}`
	);

	return (
		<Stack sx={styles.container}>
			<Shader sx={styles.canvas} input={{ inline }} />
		</Stack>
	);
};

const URL = () => {
	const [url] = useFixtureInput(
		"url",
		"https://samples.threepipe.org/shaders/tunnel-cylinders.glsl"
	);

	return (
		<Stack sx={styles.container}>
			<Shader sx={styles.canvas} input={{ url }} />
		</Stack>
	);
};

const MultiBufferFeedback = () => {
	return (
		<Stack sx={styles.container}>
			<Shader
				sx={styles.canvas}
				input={{
					graph: {
						buffers: [
							{
								id: "bufferA",
								shader: {
									inline: `void mainImage(out vec4 fragColor, vec2 fragCoord) {
									vec2 uv = fragCoord / iResolution.xy;
									vec3 prev = texture(iChannel0, uv).rgb;
									vec3 seed = vec3(
										0.5 + 0.5 * sin(iTime + uv.x * 10.0),
										0.5 + 0.5 * sin(iTime * 0.7 + uv.y * 7.0),
										0.5 + 0.5 * sin(iTime * 1.1)
									);
									fragColor = vec4(mix(prev, seed, 0.03), 1.0);
									}`
								},
								channels: [{ type: "pass", passId: "bufferA" }]
							}
						],
						image: {
							shader: {
								inline: `void mainImage(out vec4 fragColor, vec2 fragCoord) {
								vec2 uv = fragCoord / iResolution.xy;
								vec3 color = texture(iChannel0, uv).rgb;
								fragColor = vec4(color, 1.0);
								}`
							},
							channels: [{ type: "pass", passId: "bufferA" }]
						}
					}
				}}
			/>
		</Stack>
	);
};

const TextureInput = () => {
	const [textureUrl] = useFixtureInput(
		"textureUrl",
		"https://threejs.org/examples/textures/uv_grid_opengl.jpg"
	);

	return (
		<Stack sx={styles.container}>
			<Shader
				sx={styles.canvas}
				input={{
					graph: {
						image: {
							shader: {
								inline: `void mainImage(out vec4 fragColor, vec2 fragCoord) {
								vec2 uv = fragCoord / iResolution.xy;
								vec2 p = uv - 0.5;
								float angle = iTime * 0.3;
								mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
								vec2 warpedUV = rot * p + 0.5;
								vec4 tex = texture(iChannel0, warpedUV);
								fragColor = vec4(tex.rgb, 1.0);
								}`
							},
							channels: [{ type: "texture", url: textureUrl }]
						},
					}
				}}
			/>
		</Stack>
	);
};

export default { GLSL, URL, MultiBufferFeedback, TextureInput };

const styles = stylex.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -1
	},
	canvas: {
		width: "100%",
		height: "100%"
	}
});
