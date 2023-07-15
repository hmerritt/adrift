import { styled } from "@linaria/react";

export type FullscreenProps = JSX.IntrinsicElements["div"] & {
	position?: "absolute" | "fixed" | "relative";
	zIndex?: number;
	center?: boolean;
	overflow?: "hidden" | "auto";
};

export const Fullscreen = styled.div<FullscreenProps>`
	top: 0;
	left: 0;
	width: calc(100vw - 1rem);
	height: calc(100vh - 1rem); // Width of the scrollbar
	align-items: center;
	justify-content: center;
	z-index: ${({ zIndex }) => zIndex ?? 0};
	overflow: ${({ overflow }) => overflow ?? "hidden"};
	position: ${({ position }) => position ?? "relative"};
	display: ${({ center }) => (!center ? "block" : "flex")};
`;
