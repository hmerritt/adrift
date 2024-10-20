import * as stylex from "@stylexjs/stylex";
import { memo } from "react";

import { type IconSvgProps } from "./props";

export const Spinner = memo((props: IconSvgProps) => (
	<svg
		viewBox="0 0 66 66"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
		{...stylex.props(styles.spinner)}
	>
		<circle
			{...stylex.props(styles.path)}
			strokeWidth="6"
			strokeLinecap="round"
			stroke="currentColor"
			fill="none"
			cx="33"
			cy="33"
			r="30"
		></circle>
	</svg>
));

const styles = stylex.create({
	spinner: {
		animation: "rotator 1.4s linear infinite"
	},
	path: {
		strokeDashoffset: 0,
		strokeDasharray: 187,
		transformOrigin: "center",
		animation: "dash 1.4s ease-in-out infinite"
	}
});
