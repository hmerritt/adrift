import * as stylex from "@stylexjs/stylex";
import { memo } from "react";

import { keyframes } from "../../../../lib/styles/keyframes.stylex";
import { IconSvgProps } from "./props";

export const Spinner = memo(({ sx, ...props }: IconSvgProps) => (
	<svg
		viewBox="0 0 66 66"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
		{...stylex.props(styles.spinner, sx)}
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
		/>
	</svg>
));

const styles = stylex.create({
	spinner: {
		animationName: keyframes.rotator,
		animationDuration: "1.4s",
		animationTimingFunction: "linear",
		animationIterationCount: "infinite"
	},
	path: {
		strokeDashoffset: 0,
		strokeDasharray: "187",
		transformOrigin: "center",
		animationName: keyframes.dash,
		animationDuration: "1.4s",
		animationTimingFunction: "ease-in-out",
		animationIterationCount: "infinite"
	}
});
