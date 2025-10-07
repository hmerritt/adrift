import { useEffect, useRef } from "react";

import { type ShaderSourceProps, type ShaderState, fetchShader, setup } from "./webgl";

export type ShaderProps = {
	source: ShaderSourceProps;
};

const defaultState: ShaderState = {
	// Main Application State
	gl: null,
	program: null,
	uniformLocations: {},
	// Timing and animation
	startTime: 0,
	frameTime: 0,
	frameCount: 0
};

/**
 * Shader component
 */
export const Shader = ({ source }: ShaderProps) => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const s = useRef<ShaderState>(defaultState);

	// On mount, fetch the shader and set up WebGL
	useEffect(() => {
		(async () => {
			if (!canvas.current) return;

			// Get GLSL shader to render
			let mainImageShader = "";
			if (source.rawGLSL) mainImageShader = source.rawGLSL;
			else if (source.url) mainImageShader = await fetchShader(source.url);

			if (!mainImageShader) {
				logn.error("shader", "No GLSL shader code.");
				return;
			}

			s.current = defaultState; // Reset state on re-setup
			setup(mainImageShader, s.current, canvas.current);
		})();
	}, [canvas]);

	return <canvas ref={canvas} />;
};
