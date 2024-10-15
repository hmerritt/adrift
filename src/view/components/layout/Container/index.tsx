import * as stylex from "@stylexjs/stylex";

import { type SxProp } from "lib/type-assertions";

// @TODO: improve this

export const Container = ({
	sx,
	className,
	padding,
	style,
	width = "1320px",
	...props
}: JSX.IntrinsicElements["div"] &
	SxProp & {
		width?: string;
		padding?: string;
	}) => {
	return (
		<div
			{...stylex.props(styles.container, sx)}
			style={{ ...style, padding, maxWidth: width }}
			{...props}
		/>
	);
};

const styles = stylex.create({
	container: {
		position: "relative",
		width: "100%",
		marginLeft: "auto",
		marginRight: "auto",
		padding: "0 2rem",
		"@media screen and (max-width: 768px)": {
			padding: "0 1rem"
		}
	}
});
