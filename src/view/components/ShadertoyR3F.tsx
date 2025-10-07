import { ScreenQuad } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { GLSL3, ShaderMaterial, Vector2, Vector3, Vector4 } from "three";

const ShadertoyR3F = ({
	shaderRaw = "",
	shaderUrl = "https://samples.threepipe.org/shaders/tunnel-cylinders.glsl",
	debug = false
}) => {
	const [mainImageShader, setMainImageShader] = useState(shaderRaw);
	const materialRef = useRef(null);
	const frameRef = useRef(0);
	const mouseRef = useRef({
		position: new Vector2(),
		clickPosition: new Vector2(),
		isDown: false
	});

	useEffect(() => {
		if (mainImageShader || !shaderUrl) return;
		const fetchShader = async () => {
			try {
				const response = await fetch(shaderUrl);
				if (!response.ok)
					throw new Error(`HTTP error! status: ${response.status}`);
				const text = (await response.text()) as any;
				setMainImageShader(text);
			} catch (error) {
				console.error("Failed to fetch shader:", error);
			}
		};
		fetchShader();
	}, [mainImageShader, shaderUrl]);

	// Construct the final shader by injecting the fetched code into our template.
	const fragmentShader = useMemo(() => {
		if (!mainImageShader) return null;
		return fragmentShaderTemplate.replace("{{mainImageShader}}", mainImageShader);
	}, [mainImageShader]);

	// For debugging: Log the final compiled shader to the console
	useEffect(() => {
		if (!debug) return;
		if (fragmentShader) {
			console.log("--- Compiled Fragment Shader ---");
			console.log(fragmentShader);
		}
	}, [fragmentShader, debug]);

	const uniforms = useMemo(
		() => ({
			iResolution: { value: new Vector3() },
			iTime: { value: 0 },
			iFrame: { value: 0 },
			iMouse: { value: new Vector4() },
			iTimeDelta: { value: 0 },
			iDate: { value: new Vector4() },
			iFrameRate: { value: 30.0 }, // Ensure it's a float
			iChannel0: { value: null },
			iChannel1: { value: null },
			iChannel2: { value: null },
			iChannel3: { value: null }
		}),
		[]
	);

	useEffect(() => {
		const el = document.body;
		const handlePointerMove = (e: any) => {
			mouseRef.current.position.set(e.clientX, window.innerHeight - e.clientY);
		};
		const handlePointerDown = (e: any) => {
			mouseRef.current.isDown = true;
			mouseRef.current.position.set(e.clientX, window.innerHeight - e.clientY);
			mouseRef.current.clickPosition.copy(mouseRef.current.position);
		};
		const handlePointerUp = () => {
			mouseRef.current.isDown = false;
		};

		el.addEventListener("pointermove", handlePointerMove);
		el.addEventListener("pointerdown", handlePointerDown);
		el.addEventListener("pointerup", handlePointerUp);

		return () => {
			el.removeEventListener("pointermove", handlePointerMove);
			el.removeEventListener("pointerdown", handlePointerDown);
			el.removeEventListener("pointerup", handlePointerUp);
		};
	}, []);

	useFrame((state, delta) => {
		if (!materialRef.current) return;
		const mat = materialRef.current as any;
		const { size, clock } = state;
		const dpr = state.viewport.dpr;

		mat.uniforms.iTime.value = clock.elapsedTime;
		mat.uniforms.iTimeDelta.value = delta;
		mat.uniforms.iFrame.value = frameRef.current++;
		mat.uniforms.iResolution.value.set(size.width * dpr, size.height * dpr, 1);
		const mouse = mouseRef.current;
		mat.uniforms.iMouse.value.set(
			mouse.position.x,
			mouse.position.y,
			mouse.clickPosition.x * (mouse.isDown ? 1 : -1),
			mouse.clickPosition.y * (mouse.isDown ? 1 : -1)
		);
		const date = new Date();
		mat.uniforms.iDate.value.set(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			date.getHours() * 3600 +
				date.getMinutes() * 60 +
				date.getSeconds() +
				date.getMilliseconds() / 1000
		);
	});

	if (!fragmentShader) return null;

	return (
		<ScreenQuad>
			<shaderMaterial
				ref={materialRef}
				key={fragmentShader} // Force re-creation when shader changes
				vertexShader={toyVert}
				fragmentShader={fragmentShader}
				uniforms={uniforms}
				glslVersion={GLSL3}
			/>
		</ScreenQuad>
	);
};

export default ShadertoyR3F;

// region GLSL Code
// --- UPDATED SHADERS ---

const toyVert = `
    // Send UV coordinates to the fragment shader
    out vec2 vUv; 
    
    void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
    }
`;

// This is our robust shader template.
const fragmentShaderTemplate = `
    precision highp float;

    // Final output color
    out vec4 fragColor;

    // Uniforms
    uniform vec3 iResolution;
    uniform float iTime;
    uniform float iTimeDelta;
    uniform int iFrame;
    uniform vec4 iMouse;
    uniform vec4 iDate;
    uniform float iFrameRate;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    uniform sampler2D iChannel2;
    uniform sampler2D iChannel3;

    // Varying inputs
    in vec2 vUv;

    // --- ShaderToy Code Placeholder ---
    // The fetched GLSL code will be injected here.
    // It is expected to provide a 'mainImage' function.
    {{mainImageShader}}

    void main() {
        // Call the 'mainImage' function from the injected code.
        mainImage(fragColor, gl_FragCoord.xy);
        
        fragColor.a = 1.0;
    }
`;
