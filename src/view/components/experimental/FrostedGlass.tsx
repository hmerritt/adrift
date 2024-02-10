import { css } from "@linaria/core";
import { useCallback, useEffect, useRef, useState } from "react";

export type FrostedGlassProps = JSX.IntrinsicElements["div"] & {
	/** Target maximum width of each pane */
	paneMaxWidth?: number;
	/** Initial number of panes - before first render we need to show some panes */
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
	paneMaxWidth = 25,
	paneInitialCount = 5,
	reactToWindowResize = false,
	...divProps
}) => {
	const $div = useRef<HTMLDivElement>(null);

	const [paneCount, setPaneCount] = useState(paneInitialCount);

	const calculatePaneCount = useCallback(() => {
		if (!$div.current) return;
		setPaneCount(
			Math.floor(
				Math.floor($div.current?.clientWidth / paneMaxWidth) || paneInitialCount
			)
		);
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

			<div className={paneContainer}>
				{[...Array(paneCount).keys()].map((i) => (
					<div key={i} className={pane} />
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
	flex-direction: row;
	align-items: stretch;
	width: 100%;
	height: 100%;
`;

const pane = css`
	flex: 1;
	height: 100%;
	background: linear-gradient(
		to right,
		rgba(255, 255, 255, 0.2),
		rgba(255, 255, 255, 0.1)
	);
	backdrop-filter: blur(10px);
`;
