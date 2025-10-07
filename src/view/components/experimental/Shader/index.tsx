import { useEffect, useRef } from "react";

import { type ShaderSourceProps, type ShaderState, setup } from "./webgl";

export type ShaderProps = {
	source: ShaderSourceProps;
};

/**
 * Shader component
 */
export const Shader = ({ source }: ShaderProps) => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const s = useRef<ShaderState>({
		// Main Application State
		gl: null,
		program: null,
		uniformLocations: {},
		// Timing and animation
		startTime: 0,
		frameTime: 0,
		frameCount: 0
	});

	// On mount, fetch the shader and set up WebGL
	useEffect(() => {
		if (!canvas.current) return;
		setup((source as any).rawGLSL, s.current, canvas.current);
	}, [canvas]);

	return <canvas ref={canvas} />;
};
