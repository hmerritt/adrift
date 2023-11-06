import { css, cx } from "@linaria/core";

export type ImageProps = JSX.IntrinsicElements["img"] & {
	/** Maintains aspect ratio - even when render width/height are fluid */
	aspectRatioMaintain?: boolean;
};

export const Image = ({
	className,
	aspectRatioMaintain,
	height,
	width,
	...props
}: ImageProps) => {
	if (aspectRatioMaintain && (width == null || height == null)) {
		debug(
			"Image",
			"warn",
			"aspectRatioMaintain requires both width and height props"
		);
	}

	return (
		<img
			className={cx(className, aspectRatioMaintain && arm)}
			draggable={false} // <- All websites should do this my my
			width={width}
			height={height}
			{...props}
			style={{
				...props.style
			}}
		/>
	);
};

// aspectRatioMaintain
const arm = css`
	height: auto !important;
	max-width: 100%;
`;
