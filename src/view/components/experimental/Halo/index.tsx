import * as stylex from "@stylexjs/stylex";
import { Children, cloneElement, isValidElement, useEffect, useRef } from "react";

import { isMobile } from "lib/device";
import { useEventListener } from "lib/hooks";
import { type SxProp } from "lib/type-assertions";

const haloSides = ["top", "right", "bottom", "left"] as const;
const HALO_LINE_WIDTH_PX = 1;

export type HaloSide = (typeof haloSides)[number];
type HaloCornerRadii = {
	topLeft: number;
	topRight: number;
	bottomRight: number;
	bottomLeft: number;
};

export type HaloProps = React.JSX.IntrinsicElements["div"] &
	SxProp & {
		sides?: HaloSide[];
		size?: string;
		halo?: string;
		background?: string;
	};
export type HaloProviderProps = {
	children: React.ReactNode;
	staticForMobile?: boolean;
	gradient?: {
		size?: string;
		halo?: string;
		background?: string;
	};
};

const haloSideMaskPositionMap: Record<HaloSide, string> = {
	top: "top left",
	right: "top right",
	bottom: "bottom left",
	left: "top left"
};

const haloSideMaskSizeMap: Record<HaloSide, string> = {
	top: `100% ${HALO_LINE_WIDTH_PX}px`,
	right: `${HALO_LINE_WIDTH_PX}px 100%`,
	bottom: `100% ${HALO_LINE_WIDTH_PX}px`,
	left: `${HALO_LINE_WIDTH_PX}px 100%`
};

const haloCornerMaskConfig = {
	topLeft: {
		position: "top left",
		center: "100% 100%"
	},
	topRight: {
		position: "top right",
		center: "0% 100%"
	},
	bottomRight: {
		position: "bottom right",
		center: "0% 0%"
	},
	bottomLeft: {
		position: "bottom left",
		center: "100% 0%"
	}
} as const;

const formatPx = (value: number): string => `${Number(value.toFixed(3))}px`;

const parseCssLengthToPx = (raw: string, basis: number): number => {
	const value = Number.parseFloat(raw);
	if (!Number.isFinite(value)) {
		return 0;
	}

	if (raw.trim().endsWith("%")) {
		return Math.max(0, (value / 100) * basis);
	}

	return Math.max(0, value);
};

const parseCornerRadiusPx = (rawRadius: string, basis: number): number => {
	const [horizontalToken] = rawRadius.split(/\s+/);

	return parseCssLengthToPx(horizontalToken ?? "0px", basis);
};

const getCornerRadii = ($element: HTMLElement): HaloCornerRadii => {
	const computed = window.getComputedStyle($element);
	const rect = $element.getBoundingClientRect();
	const basis = Math.max(0, Math.min(rect.width, rect.height));

	return {
		topLeft: parseCornerRadiusPx(computed.borderTopLeftRadius, basis),
		topRight: parseCornerRadiusPx(computed.borderTopRightRadius, basis),
		bottomRight: parseCornerRadiusPx(computed.borderBottomRightRadius, basis),
		bottomLeft: parseCornerRadiusPx(computed.borderBottomLeftRadius, basis)
	};
};

const buildCornerMaskImage = (center: string, radiusPx: number): string => {
	const arcWidth = Math.min(HALO_LINE_WIDTH_PX + 0.75, radiusPx);
	const innerRadius = Math.max(0, radiusPx - arcWidth);
	const outerRadius = radiusPx + 0.5;

	return `radial-gradient(circle at ${center}, transparent ${formatPx(innerRadius)}, #000 ${formatPx(innerRadius)}, #000 ${formatPx(radiusPx)}, transparent ${formatPx(outerRadius)})`;
};

const normalizeHaloSides = (sides: HaloSide[] | undefined): HaloSide[] => {
	if (!sides || sides.length === 0) {
		return [...haloSides];
	}

	const selectedSides = new Set(sides);
	const normalized = haloSides.filter((side) => selectedSides.has(side));

	return normalized.length > 0 ? normalized : [...haloSides];
};

const parseHaloSides = (rawSides: string | undefined): HaloSide[] => {
	if (!rawSides) {
		return [...haloSides];
	}

	const selectedSides = new Set(
		rawSides
			.split(",")
			.map((side) => side.trim().toLowerCase())
			.filter((side): side is HaloSide => haloSides.includes(side as HaloSide))
	);
	const normalized = haloSides.filter((side) => selectedSides.has(side));

	return normalized.length > 0 ? normalized : [...haloSides];
};

const stringifyHaloSides = (sides: HaloSide[]): string => {
	return normalizeHaloSides(sides).join(",");
};

const applyHaloBackground = (
	$element: HTMLElement,
	sides: HaloSide[],
	haloFill: string,
	cornerRadii: HaloCornerRadii
) => {
	$element.style.backgroundImage = haloFill;
	$element.style.backgroundPosition = "center";
	$element.style.backgroundSize = "100% 100%";
	$element.style.backgroundRepeat = "no-repeat";

	const selectedSides = new Set(sides);
	const maskImages: string[] = [];
	const maskPositions: string[] = [];
	const maskSizes: string[] = [];
	const maskRepeats: string[] = [];

	sides.forEach((side) => {
		maskImages.push("linear-gradient(#000, #000)");
		maskPositions.push(haloSideMaskPositionMap[side]);
		maskSizes.push(haloSideMaskSizeMap[side]);
		maskRepeats.push("no-repeat");
	});

	const topLeftRadius = cornerRadii.topLeft;
	if (topLeftRadius > 0 && (selectedSides.has("top") || selectedSides.has("left"))) {
		maskImages.push(
			buildCornerMaskImage(haloCornerMaskConfig.topLeft.center, topLeftRadius)
		);
		maskPositions.push(haloCornerMaskConfig.topLeft.position);
		maskSizes.push(`${formatPx(topLeftRadius)} ${formatPx(topLeftRadius)}`);
		maskRepeats.push("no-repeat");
	}

	const topRightRadius = cornerRadii.topRight;
	if (topRightRadius > 0 && (selectedSides.has("top") || selectedSides.has("right"))) {
		maskImages.push(
			buildCornerMaskImage(haloCornerMaskConfig.topRight.center, topRightRadius)
		);
		maskPositions.push(haloCornerMaskConfig.topRight.position);
		maskSizes.push(`${formatPx(topRightRadius)} ${formatPx(topRightRadius)}`);
		maskRepeats.push("no-repeat");
	}

	const bottomRightRadius = cornerRadii.bottomRight;
	if (
		bottomRightRadius > 0 &&
		(selectedSides.has("bottom") || selectedSides.has("right"))
	) {
		maskImages.push(
			buildCornerMaskImage(
				haloCornerMaskConfig.bottomRight.center,
				bottomRightRadius
			)
		);
		maskPositions.push(haloCornerMaskConfig.bottomRight.position);
		maskSizes.push(`${formatPx(bottomRightRadius)} ${formatPx(bottomRightRadius)}`);
		maskRepeats.push("no-repeat");
	}

	const bottomLeftRadius = cornerRadii.bottomLeft;
	if (
		bottomLeftRadius > 0 &&
		(selectedSides.has("bottom") || selectedSides.has("left"))
	) {
		maskImages.push(
			buildCornerMaskImage(haloCornerMaskConfig.bottomLeft.center, bottomLeftRadius)
		);
		maskPositions.push(haloCornerMaskConfig.bottomLeft.position);
		maskSizes.push(`${formatPx(bottomLeftRadius)} ${formatPx(bottomLeftRadius)}`);
		maskRepeats.push("no-repeat");
	}

	const images = maskImages.join(", ");
	const positions = maskPositions.join(", ");
	const sizes = maskSizes.join(", ");
	const repeats = maskRepeats.join(", ");

	$element.style.setProperty("mask-image", images);
	$element.style.setProperty("mask-position", positions);
	$element.style.setProperty("mask-size", sizes);
	$element.style.setProperty("mask-repeat", repeats);

	$element.style.setProperty("-webkit-mask-image", images);
	$element.style.setProperty("-webkit-mask-position", positions);
	$element.style.setProperty("-webkit-mask-size", sizes);
	$element.style.setProperty("-webkit-mask-repeat", repeats);
};

/**
 * Animated halo/glow effect around a box.
 *
 * Tracks and updates according to the mouse position.
 */
export const Halo = ({
	sx,
	children,
	sides,
	size,
	halo,
	background,
	...divProps
}: HaloProps) => {
	return (
		<div
			{...divProps}
			{...stylex.props(styles.halo, sx)}
			data-halo
			data-halo-sides={stringifyHaloSides(sides ?? [])}
			data-halo-size={size}
			data-halo-color={halo}
			data-halo-background={background}
		>
			{Children.map(children, (child) => {
				if (isValidElement(child)) {
					const typedChild = child as React.ReactElement<{
						className?: string;
						style?: React.CSSProperties;
					}>;
					const haloChildProps = stylex.props(styles.haloChild);
					const existingChildProps = typedChild.props;

					return cloneElement(typedChild, {
						className: [existingChildProps.className, haloChildProps.className]
							.filter(Boolean)
							.join(" "),
						style: {
							...(existingChildProps.style ?? {}),
							...(haloChildProps.style ?? {})
						}
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

	const { size, halo, background } = {
		size: "24rem",
		halo: "rgb(120, 120, 120)",
		background: "rgb(255, 255, 255)",
		...(gradient ? gradient : {})
	};

	const updateAllHalos = () => {
		const { x, y } = state.current || { x: 0, y: 0 };

		const $elements = document.querySelectorAll<HTMLElement>("[data-halo]");
		$elements.forEach(($element) => {
			const elementSides = parseHaloSides($element.dataset.haloSides);
			const elementSize = $element.dataset.haloSize ?? size;
			const elementHalo = $element.dataset.haloColor ?? halo;
			const elementBackground = $element.dataset.haloBackground ?? background;
			const cornerRadii = getCornerRadii($element);

			// Stop on mobile
			if (staticForMobile && isMobile) {
				const staticFill = `linear-gradient(${elementHalo}, ${elementHalo})`;
				applyHaloBackground($element, elementSides, staticFill, cornerRadii);
				state.current = { ...state.current, stopUpdates: true };
				return;
			}

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

			if (!isMouseWithinElement && !isMobile) return;

			const rsize = !isMobile ? elementSize : "90vw";
			const rx = x - left;
			const ry = y - top;

			const haloFill = `radial-gradient(${rsize} at ${rx}px ${ry}px, ${elementHalo}, ${elementBackground})`;
			applyHaloBackground($element, elementSides, haloFill, cornerRadii);
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
		borderRadius: "8px",
		padding: "1px",
		overflow: "hidden"
	},
	haloChild: {
		backgroundColor: "inherit",
		borderRadius: "inherit"
	}
});
