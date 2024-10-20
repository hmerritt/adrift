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
	return <div {...props} {...stylex.props(styles.container({ padding, width }), sx)} />;
};

const styles = stylex.create({
	container: (s) => ({
		position: "relative",
		width: "100%",
		maxWidth: s.width || "initial",
		marginLeft: "auto",
		marginRight: "auto",
		padding: s.padding || "0 2rem",
		"@media screen and (max-width: 768px)": {
			padding: "0 1rem"
		}
	})
});
