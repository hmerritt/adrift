import { css, cx } from "@linaria/core";
import { useCallback, useEffect, useRef, useState } from "react";

export type FrostedGlassProps = JSX.IntrinsicElements["div"] & {
	/** Pane direction */
	paneDirection?: "row" | "column";
	/** Target maximum width of each pane (only used when `paneDirection` is set to `row`) */
	paneMaxWidth?: number;
	/** Target maximum height of each pane (only used when `paneDirection` is set to `column`) */
	paneMaxHeight?: number;
	/** Initial number of panes shown before first render (pane count is re-calculated after component mounts) */
	paneInitialCount?: number;
	/** Recalculate pane count on window resize (responsive, but may impact performance) */
	reactToWindowResize?: boolean;
};

/**
 * Frosted glass effect.
 *
 * Items behind the glass will be blurred (on the other side of a translucent glass pane).
 */
export const FrostedGlass: React.FC<FrostedGlassProps> = ({
	children,
	className,
	paneDirection = "row",
	paneMaxWidth = 25,
	paneMaxHeight = 25,
	paneInitialCount = 5,
	reactToWindowResize = false,
	...divProps
}) => {
	const $div = useRef<HTMLDivElement>(null);

	const [paneCount, setPaneCount] = useState(paneInitialCount);

	const calculatePaneCount = useCallback(() => {
		if (!$div.current) return;

		if (paneDirection === "row") {
			setPaneCount(
				Math.floor($div.current?.clientWidth / paneMaxWidth) || paneInitialCount
			);
		}

		if (paneDirection === "column") {
			setPaneCount(
				Math.floor($div.current?.clientHeight / paneMaxHeight) || paneInitialCount
			);
		}
	}, [paneInitialCount, paneMaxWidth]);

	useEffect(() => {
		calculatePaneCount();

		if (reactToWindowResize) {
			window.addEventListener("resize", calculatePaneCount);
		}

		return () => {
			window.removeEventListener("resize", calculatePaneCount);
		};
	}, [reactToWindowResize, calculatePaneCount]);

	return (
		<div ref={$div} {...divProps} className={className}>
			{children}

			<div
				className={cx(paneContainer, paneDirection === "row" ? "row" : "column")}
			>
				{[...Array(paneCount).keys()].map((i) => (
					<div
						key={i}
						className={cx(pane, paneDirection === "row" ? "row" : "column")}
					/>
				))}
			</div>
		</div>
	);
};

const paneContainer = css`
	position: absolute;
	z-index: -1;
	inset: 0;
	display: flex;
	align-items: stretch;
	width: 100%;
	height: 100%;

	&.row {
		flex-direction: row;
	}

	&.column {
		flex-direction: column;
	}
`;

const pane = css`
	flex: 1;
	background: linear-gradient(
		to right,
		rgba(255, 255, 255, 0.2),
		rgba(255, 255, 255, 0.1)
	);
	backdrop-filter: blur(10px);

	&.row {
		height: 100%;
	}

	&.column {
		width: 100%;
	}
`;
