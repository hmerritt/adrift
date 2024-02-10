import { css, cx } from "@linaria/core";
import { RefObject, useCallback, useEffect, useRef } from "react";

export type DotGridProps = JSX.IntrinsicElements["canvas"] & {
	/** Container position. Use `fixed` for background usage */
	position?: "absolute" | "fixed";
	/** Spacing between the dots */
	spacing?: number;
	/** Size of each dot */
	dotSize?: number;
	/** Damping for smoother motion */
	damping?: number;
	/** Speed at which dots return to their original position */
	returnSpeed?: number;
	/** Base for the exponential function */
	attractionBase?: number;
	/** Maximum attraction to avoid extreme values */
	maxAttraction?: number;
	/** ref of element to use for mouse position (leave undefined to use the canvas) */
	refForMousePosition?: RefObject<any> | "window";
	/** Redraw canvas on window resize (responsive, but may impact performance) */
	reactToWindowResize?: boolean;
};

/**
 * Grid of dots that are attracted to the mouse position.
 *
 * Inspired by https://twitter.com/eliguerron/status/1738116017631740213
 */
export const DotGrid: React.FC<DotGridProps> = ({
	position = "absolute",
	spacing = 25,
	dotSize = 1,
	damping = 0.4,
	returnSpeed = 0.18,
	attractionBase = 1.06,
	maxAttraction = 0.4,
	refForMousePosition,
	reactToWindowResize = true,
	...canvasProps
}) => {
	const $canvas = useRef<HTMLCanvasElement>(null);
	const mousePosition = useRef({ x: -1000, y: -1000 });
	const animationFrameHandle = useRef(-1);

	const resetAnimationFrame = () => {
		if (animationFrameHandle.current !== -1) {
			cancelAnimationFrame(animationFrameHandle.current); // Cancel previous frame
			animationFrameHandle.current = -1;
		}
	};

	const drawDotGrid = useCallback(() => {
		if (!$canvas.current) return;
		resetAnimationFrame();

		const canvas = $canvas.current;
		const ctx = canvas.getContext("2d");

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const dots: {
			x: number;
			y: number;
			vx: number;
			vy: number;
			originalX: number;
			originalY: number;
		}[] = [];

		// Initialize dots array
		for (let x = 0; x < canvas.width; x += spacing) {
			for (let y = 0; y < canvas.height; y += spacing) {
				dots.push({
					x: x,
					y: y,
					vx: 0,
					vy: 0,
					originalX: x,
					originalY: y
				});
			}
		}

		function draw() {
			if (!ctx) return;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (const dot of dots) {
				const dx = mousePosition.current.x - dot.x;
				const dy = mousePosition.current.y - dot.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				// Exponential attraction calculation
				const attractionFactor = Math.min(
					Math.pow(attractionBase, -distance),
					maxAttraction
				);

				if (distance > 1) {
					// Avoid extreme values near mouse
					dot.vx += dx * attractionFactor;
					dot.vy += dy * attractionFactor;
				}

				// Apply return force and damping
				dot.vx += (dot.originalX - dot.x) * returnSpeed;
				dot.vy += (dot.originalY - dot.y) * returnSpeed;
				dot.vx *= damping;
				dot.vy *= damping;

				// Update position
				dot.x += dot.vx;
				dot.y += dot.vy;

				drawDot(dot.x, dot.y, dotSize);
			}
			animationFrameHandle.current = requestAnimationFrame(draw);
		}

		function drawDot(x: number, y: number, size: number) {
			if (!ctx) return;
			ctx.beginPath();
			ctx.arc(x, y, size, 0, Math.PI * 2, false);
			ctx.fillStyle = "black";
			ctx.fill();
		}

		draw();
	}, [spacing, dotSize, damping, returnSpeed, attractionBase, maxAttraction]);

	useEffect(() => {
		if (!$canvas.current) return;

		const trackMousePosition = (event: MouseEvent) => {
			mousePosition.current.x = event.clientX;
			mousePosition.current.y = event.clientY;
		};
		const $elForMousePosition =
			refForMousePosition === "window"
				? window
				: refForMousePosition?.current || $canvas.current;
		$elForMousePosition.addEventListener("mousemove", trackMousePosition);

		drawDotGrid();

		if (reactToWindowResize) {
			window.addEventListener("resize", drawDotGrid);
		}

		return () => {
			resetAnimationFrame();
			window.removeEventListener("resize", drawDotGrid);
			$elForMousePosition?.removeEventListener("mousemove", trackMousePosition);
		};
	}, [drawDotGrid, reactToWindowResize]);

	return (
		<canvas
			{...canvasProps}
			ref={$canvas}
			className={cx(dotGrid, position === "fixed" && dotGridFixed)}
		/>
	);
};

const dotGrid = css`
	position: absolute;
	display: block;
	inset: 0;
`;

const dotGridFixed = css`
	position: fixed;
`;
