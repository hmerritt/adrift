import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef } from "react";

import { type SxProp } from "lib/type-assertions";

import {
	type ShaderGraph,
	type ShaderSourceProps,
	type ShaderState,
	createShaderState,
	normalizeShaderGraph,
	setup,
	teardown
} from "./webgl";

type ShaderPropsBase = React.JSX.IntrinsicElements["canvas"] & SxProp;

type ShaderWithSourceProps = {
	source: ShaderSourceProps;
	graph?: ShaderGraph;
};

type ShaderWithGraphProps = {
	graph: ShaderGraph;
	source?: ShaderSourceProps;
};

export type ShaderProps = ShaderPropsBase & (ShaderWithSourceProps | ShaderWithGraphProps);

/**
 * Shader component
 *
 * Renders an image pass from raw GLSL/URL or a full shader graph with buffer passes.
 */
export const Shader = ({ source, graph, sx, ...canvasProps }: ShaderProps) => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const s = useRef<ShaderState>(createShaderState());
	const setupConfigKey = JSON.stringify({
		source: source ?? null,
		graph: graph ?? null
	});

	useEffect(() => {
		if (!canvas.current || env.isTest) return;

		const setupConfig = JSON.parse(setupConfigKey) as {
			source?: ShaderSourceProps;
			graph?: ShaderGraph;
		};

		if (setupConfig.source && setupConfig.graph) {
			logn.warn(
				"shader",
				"Both `source` and `graph` were provided. `graph` takes precedence."
			);
		}

		let normalizedGraph;
		try {
			normalizedGraph = normalizeShaderGraph(setupConfig);
		} catch (error) {
			logn.error("shader", "Invalid shader configuration.", error);
			return;
		}

		const shaderState = createShaderState();
		s.current = shaderState;
		void setup(normalizedGraph, shaderState, canvas.current);

		return () => {
			teardown(shaderState);
		};
	}, [setupConfigKey]);

	return <canvas {...canvasProps} ref={canvas} {...stylex.props(sx)} />;
};
