import { css } from "@linaria/atomic";
import { cx } from "@linaria/core";
import { SVGProps, memo } from "react";

export const Spinner = memo((props: SVGProps<SVGSVGElement>) => (
	<svg
		className={cx(spinner)}
		viewBox="0 0 66 66"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<circle
			className={cx(path)}
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

const spinner = css`
	animation: rotator 1.4s linear infinite;
`;

const path = css`
	stroke-dashoffset: 0;
	stroke-dasharray: 187;
	transform-origin: center;
	animation: dash 1.4s ease-in-out infinite;
`;
