import { css, cx } from "@linaria/core";

// @TODO: improve this

export const Container = ({
	className,
	padding,
	style,
	width = "1320px",
	...props
}: JSX.IntrinsicElements["div"] & {
	width?: string;
	padding?: string;
}) => {
	return (
		<div
			className={cx(container, className)}
			style={{ ...style, padding, maxWidth: width }}
			{...props}
		/>
	);
};

const container = css`
	position: relative;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	padding: 0 2rem;

	@media screen and (max-width: 768px) {
		padding: 0 1rem;
	}
`;
