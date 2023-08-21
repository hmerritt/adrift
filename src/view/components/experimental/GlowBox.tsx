import { useRef } from "react";
import { css } from "@linaria/core";
import { useEventListener } from "lib/hooks";

export type GlowBoxProps = JSX.IntrinsicElements["div"];

/**
 * Animated glow effect around a box.
 */
export const GlowBox = ({ children }: GlowBoxProps) => {
	const $container = useRef<HTMLDivElement>(null);

	// Global glowBox functionality
	useEventListener("mousemove", (evt) => {
		// prettier-ignore
		if (!evt || (evt as MouseEvent)?.x == undefined || (evt as MouseEvent)?.y == undefined) return;
		const { x, y } = (evt as MouseEvent) || {};

		// Element
		if (!$container.current) return;
		const padding = 300;
		const { top, bottom, left, right } = $container.current.getBoundingClientRect();

		// Shut up and calculate
		const isMouseWithinElement =
			x >= left - padding &&
			x <= right + padding &&
			y >= top - padding &&
			y <= bottom + padding;

		console.log(isMouseWithinElement);
		if (!isMouseWithinElement) return;

		$container.current.style.background = `radial-gradient(24rem at ${x - left}px ${
			y - top
		}px, rgb(120, 120, 120), rgb(255, 255, 255))`;
	});

	return (
		<div ref={$container} className={glowBox}>
			{children}
		</div>
	);
};

// Fill parent container
const glowBox = css`
	padding: 1px;
	border-radius: 8px;
	transition: background 1s ease-out;

	& > * {
		border-radius: 7px;
		background-color: white;
	}
`;
