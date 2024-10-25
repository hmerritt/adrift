import * as stylex from "@stylexjs/stylex";

import { type SxProp } from "lib/type-assertions";

export type GridDndDragBoxProps = SxProp & {
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
	sx,
	dataItem,
	renderIndex,
	renderWith
}: GridDndDragBoxProps) => {
	const RenderWith = renderWith;

	return (
		<div {...stylex.props(styles.gridDragbox, sx)}>
			<RenderWith {...dataItem} renderIndex={renderIndex} />
		</div>
	);
};

const styles = stylex.create({
	gridDragbox: {
		display: "table",
		position: "relative",
		width: "100%",
		height: "100%",
		borderRadius: "0.8rem", // @TODO theme
		borderWidth: "0.1rem", // @TODO theme
		borderStyle: "dashed", // @TODO theme
		borderColor: "#ededed" // @TODO theme
	}

	// Hide all children.
	// This ensures the content height is preserved and fixes layout issues when rendering.
	// * {
	// 	opacity: 0 !important;
	// }
});
