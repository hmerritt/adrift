import * as stylex from "@stylexjs/stylex";
import { SVGProps, memo } from "react";

export const Spinner = memo((props: SVGProps<SVGSVGElement>) => (
	<svg
		{...stylex.props(styles.spinner)}
		viewBox="0 0 66 66"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
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
