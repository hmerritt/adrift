import { cx } from "@linaria/core";
import { css } from '@linaria/atomic';

export type GridDndDragBoxProps = {
	dataItem: any;
	renderIndex: number;
	renderWith: (props: any) => JSX.Element;
};

/**
 * Drop target box for the grid.
 *
 * Renders element in a hidden state. This is to prevent layout issues,
 * such as an incorrect height of the GridDndDragBox.
 */
export const GridDndDragBox = ({
	dataItem,
	renderIndex,
	renderWith
}: GridDndDragBoxProps) => {
	const RenderWith = renderWith;

	return (
		<div className={cx(gridDragbox)}>
			<RenderWith {...dataItem} renderIndex={renderIndex} />
		</div>
	);
};

const gridDragbox = css`
	display: table;
	position: relative;
	width: 100%;
	height: 100%;
	border-radius: 0.8rem;
	border: 0.1rem dashed #ededed;

	// Hide all children.
	// This ensures the content height is preserved and fixes layout issues when rendering.
	* {
		opacity: 0 !important;
	}
`;
