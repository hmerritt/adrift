import { css, cx } from "@linaria/core";
import { useState } from "react";

export type ImageProps = JSX.IntrinsicElements["img"] & {
	/** Maintains image aspect ratio - even when render width/height are fluid */
	aspectRatioMaintain?: boolean;
	/** Image source that is shown if `src` image fails to load (also shown while loading if `loadingSrc` is unset) */
	fallbackSrc?: string;
	/** Image source that is shown while `src` image is loading */
	loadingSrc?: string;
};

export const Image = ({
	aspectRatioMaintain,
	className,
	fallbackSrc,
	height,
	loadingSrc,
	src,
	width,
	onError,
	onLoad,
	...props
}: ImageProps) => {
	if (aspectRatioMaintain && (width == null || height == null)) {
		debug(
			"Image",
			"warn",
			"aspectRatioMaintain requires both width and height props"
		);
	}

	const usesFallback = !!fallbackSrc || !!loadingSrc;

	const [{ isLoading, hasError }, setState] = useState({
		isLoading: true,
		hasError: false
	});

	return (
		<>
			<img
				src={src}
				className={cx(
					className,
					aspectRatioMaintain && arm,
					usesFallback && (isLoading || hasError) && "hidden"
				)}
				draggable={false} // <- All websites should do this my my
				width={width}
				height={height}
				{...((onLoad || usesFallback) && {
					onLoad: (e) => {
						if (onLoad) onLoad(e);
						setState((prev) => ({ ...prev, isLoading: false }));
					}
				})}
				{...((onError || usesFallback) && {
					onError: (e) => {
						if (onError) onError(e);
						setState((prev) => ({
							...prev,
							isLoading: false,
							hasError: true
						}));
					}
				})}
				{...props}
			/>

			{usesFallback && (
				<img
					src={isLoading && loadingSrc ? loadingSrc : fallbackSrc}
					className={cx(
						className,
						aspectRatioMaintain && arm,
						!isLoading && !hasError && "hidden"
					)}
					draggable={false}
					width={width}
					height={height}
					{...props}
				/>
			)}
		</>
	);
};

// aspectRatioMaintain
const arm = css`
	height: auto !important;
	max-width: 100%;
`;
