import { describe, expect, test } from "vitest";

import { renderBasic } from "tests/render";

import { Shader } from "./index";

const shader = `void mainImage(out vec4 fragColor, vec2 fragCoord) {
	fragColor = vec4(1.0);
}`;

describe("Shader component", () => {
	test("renders with legacy source prop", async () => {
		const { getByTestId } = await renderBasic(
			<Shader data-testid="shader-canvas" source={{ rawGLSL: shader }} />
		);

		expect(getByTestId("shader-canvas").tagName.toLowerCase()).toBe("canvas");
	});

	test("renders with graph prop", async () => {
		const { getByTestId } = await renderBasic(
			<Shader
				data-testid="shader-graph-canvas"
				graph={{
					buffers: [
						{
							id: "bufferA",
							shader: { rawGLSL: shader },
							channels: [{ type: "pass", passId: "bufferA" }]
						}
					],
					image: {
						shader: { rawGLSL: shader },
						channels: [{ type: "pass", passId: "bufferA" }]
					}
				}}
			/>
		);

		expect(getByTestId("shader-graph-canvas").tagName.toLowerCase()).toBe("canvas");
	});
});
