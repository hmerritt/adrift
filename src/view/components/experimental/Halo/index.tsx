import * as stylex from "@stylexjs/stylex";
import { Children, cloneElement, isValidElement, useEffect, useRef } from "react";

import { isMobile } from "lib/device";
import { useEventListener } from "lib/hooks";
import { type SxProp } from "lib/type-assertions";

type HaloSide = "top" | "right" | "bottom" | "left";
type HaloGradient = {
	/** asd  */
	size?: string;
	halo?: string;
};

export type HaloProps = React.JSX.IntrinsicElements["div"] &
	SxProp &
	HaloGradient & {
		haloSides?: Partial<Record<HaloSide, boolean>>;
		lineSize?: string;
	};
export type HaloProviderProps = {
	children: React.ReactNode;
	staticForMobile?: boolean;
	gradient?: HaloGradient;
};

/**
 * Animated halo/glow effect around a box.
 *
 * Tracks and updates according to the mouse position.
 */
export const Halo = ({
	sx,
	children,
	haloSides,
	lineSize = "1px",
	size,
	halo,
	style,
	...divProps
}: HaloProps) => {
	const haloStyleProps = stylex.props(styles.halo, sx);
	const resolvedSides = haloSides || {
		top: true,
		right: true,
		bottom: true,
		left: true,
	};

	const sidePaddingStyles: React.CSSProperties = {
		paddingTop: resolvedSides.top ? lineSize : "0px",
		paddingRight: resolvedSides.right ? lineSize : "0px",
		paddingBottom: resolvedSides.bottom ? lineSize : "0px",
		paddingLeft: resolvedSides.left ? lineSize : "0px",
		...(haloStyleProps.style ? (haloStyleProps.style as React.CSSProperties) : {}),
		...(style ?? {})
	};

	return (
		<div
			{...divProps}
			{...haloStyleProps}
			data-halo
			data-halo-size={size}
			data-halo-color={halo}
			style={sidePaddingStyles}
		>
			{Children.map(children, (child) => {
				if (isValidElement(child)) {
					return cloneElement(child, {
						...stylex.props(styles.haloChild)
					});
				}
				return child;
			})}
		</div>
	);
};

/**
 * Provider for `<Halo />` effect (does all the heavy lifting).
 *
 * @Important Wrap your app with this provider. This is required for `<Halo />` to work!
 */
export const HaloProvider = ({
	children,
	staticForMobile = false,
	gradient
}: HaloProviderProps) => {
	const state = useRef({ x: 0, y: 0, stopUpdates: false });

	const defaultGradient = {
		size: "24rem",
		halo: "rgb(120, 120, 120)",
		...(gradient ? gradient : {})
	};

	const updateAllHalos = () => {
		const { x, y } = state.current || { x: 0, y: 0 };

		const $elements = document.querySelectorAll("[data-halo]");
		$elements.forEach(($element) => {
			const $haloElement = $element as HTMLElement;
			const currentSize = $haloElement.dataset.haloSize || defaultGradient.size;
			const currentHalo = $haloElement.dataset.haloColor || defaultGradient.halo;

			// Stop on mobile
			if (staticForMobile && isMobile) {
				$haloElement.style.background = `${currentHalo}`;
				state.current = { ...state.current, stopUpdates: true };
				return;
			}

			const { top, bottom, left, right } = $haloElement.getBoundingClientRect();
			const padding = {
				x: window.innerWidth / 2.5 > 300 ? window.innerWidth / 2.5 : 300,
				y: window.innerHeight / 2.5 > 300 ? window.innerHeight / 2.5 : 300
			};

			// Is the mouse within the element (plus padding)
			const isMouseWithinElement =
				x >= left - padding.x &&
				x <= right + padding.x &&
				y >= top - padding.y &&
				y <= bottom + padding.y;

			if (!isMouseWithinElement && !isMobile) return;

			const rsize = !isMobile ? currentSize : "90vw";
			const rx = x - left;
			const ry = y - top;

			$haloElement.style.background = `radial-gradient(${rsize} at ${rx}px ${ry}px, ${currentHalo}, transparent)`;
		});
	};

	// Global halo functionality
	useEventListener("mousemove", (evt) => {
		if (isMobile || state.current.stopUpdates) return;
		const { x, y } = (evt as MouseEvent) || {};
		if (x != null || y != null) state.current = { ...state.current, x: x, y: y };
		updateAllHalos();
	});

	useEventListener("scroll", (_) => {
		if (state.current.stopUpdates) return;

		if (isMobile) {
			state.current = {
				...state.current,
				x: window.innerWidth / 2,
				y: window.innerHeight / 3
			};
			updateAllHalos();
			return;
		}

		const event = new Event("mousemove");
		window.dispatchEvent(event); // Trigger mousemove on scroll
	});

	useEffect(() => {
		const event = new Event("scroll");
		window.dispatchEvent(event); // Trigger mousemove on load
	}, []);

	// @TODO: change styles via props/theme (dark/light)
	// @TODO: use theme when setting styles.

	return children;
};

const styles = stylex.create({
	// Fill parent container
	halo: {
		borderRadius: "8px"
	},
	haloChild: {
		backgroundColor: "white",
		borderRadius: "7px"
	}
});
