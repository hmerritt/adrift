import { css, cx } from "@linaria/core";
import { useEventListener } from "lib/hooks";

export type GlowBoxProps = JSX.IntrinsicElements["div"];

/**
 * Animated glow effect around a box.
 */
export const GlowBox = ({ children, className, ...divProps }: GlowBoxProps) => {
	return (
		<div {...divProps} className={cx(glowBox, className)} data-glow>
			{children}
		</div>
	);
};

/**
 * Wrap your app with this provider.
 *
 * This is required for `<GlowBox />` to work!
 */
export const GlowBoxProvider = ({ children }: GlowBoxProps) => {
	// Global glowBox functionality
	useEventListener("mousemove", (evt) => {
		// prettier-ignore
		if (!evt || (evt as MouseEvent)?.x == undefined || (evt as MouseEvent)?.y == undefined) return;
		const { x, y } = (evt as MouseEvent) || {};

		const $elements = document.querySelectorAll("[data-glow]");
		$elements.forEach(($element: any) => {
			const { top, bottom, left, right } = $element.getBoundingClientRect();
			const padding = {
				x: window.innerWidth / 2.5 > 300 ? window.innerWidth / 2.5 : 300,
				y: window.innerHeight / 2.5 > 300 ? window.innerHeight / 2.5 : 300
			};

			// Shut up and calculate.
			//
			// Is the mouse within the element (plus padding)
			const isMouseWithinElement =
				x >= left - padding.x &&
				x <= right + padding.x &&
				y >= top - padding.y &&
				y <= bottom + padding.y;

			if (!isMouseWithinElement) return;

			$element.style.background = `radial-gradient(24rem at ${x - left}px ${
				y - top
			}px, rgb(120, 120, 120), rgb(255, 255, 255))`;
		});
	});

	// @TODO: Mobile specific functionality.
	//
	// Remove `mousemove` in favor of `onscroll` - top-bottom scroll

	// @TODO: change styles via props/theme
	// @TODO: use theme when setting styles.

	return children;
};

// Fill parent container
const glowBox = css`
	padding: 1px;
	border-radius: 8px;

	& > * {
		border-radius: 7px;
		background-color: white;
	}
`;
