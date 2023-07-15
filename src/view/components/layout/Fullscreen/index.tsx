import { styled } from "@linaria/react";

export type FullscreenProps = JSX.IntrinsicElements["div"] & {
	position?: "absolute" | "fixed" | "relative";
	zIndex?: number;
	center?: boolean;
	overflow?: "hidden" | "auto";
	padding?: string;
};

export const Fullscreen = styled.div<FullscreenProps>`
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	align-items: center;
	justify-content: center;
	z-index: ${({ zIndex }) => zIndex ?? 0};
	padding: ${({ padding }) => padding ?? "inherit"};
	overflow: ${({ overflow }) => overflow ?? "hidden"};
	position: ${({ position }) => position ?? "relative"};
	display: ${({ center }) => (!center ? "block" : "flex")};
`;
