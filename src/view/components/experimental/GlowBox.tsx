import { useEffect, useRef } from "react";
import { css, cx } from "@linaria/core";
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

		//
		if (!$container.current) return;
		const { top, bottom, left, right } = $container.current.getBoundingClientRect();
		// Pad element dimensions ??

		// Shut up and calculate
		const isMouseWithinElement = x >= left && x <= right && y >= top && y <= bottom;
		// const mousePositionWithinElement = {
		// 	x: (x - left) / (right - left),
		// 	y: (y - top) / (bottom - top)
		// };
		console.log(
			x,
			y,
			$container.current.getBoundingClientRect(),
			isMouseWithinElement
		);
		if (!isMouseWithinElement) return;

		$container.current.style.backgroundImage = `radial-gradient(24rem at ${
			x - left
		}px ${y - top}px, rgb(45, 45, 45), rgb(255, 255, 255))`;
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
	/* background-image: radial-gradient(
		24rem at 000px 0px,
		rgb(80, 80, 80),
		rgb(255, 255, 255)
	); */

	& > * {
		border-radius: 7px;
		background-color: white;
	}
`;
