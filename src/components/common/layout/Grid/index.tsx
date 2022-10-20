import { css } from "@linaria/core";
import cx from "classnames";

export type GridProps = JSX.IntrinsicElements["div"] & {
	minWidth?: number;
	gutter?: number;
};

export const Grid = ({
	children,
	className,
	gutter = 10,
	minWidth = 20,
	...props
}: GridProps) => {
	// Specify the minimum width of each item in the grid,
	// if an item is smaller than this, the grid will remove a column to make it fit.
	let gridTemplateColumns = `repeat(auto-fit, minmax(min(100%, ${minWidth}rem), 1fr))`;

	return (
		<div
			{...props}
			className={cx(className, grid)}
			style={{
				gridGap: gutter,
				gridTemplateColumns: gridTemplateColumns,
				...props.style
			}}
		>
			{children}
		</div>
	);
};

const grid = css`
	position: relative;
	display: grid;
	width: 100%;
`;
