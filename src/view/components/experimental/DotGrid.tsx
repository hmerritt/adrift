import { css } from "@linaria/atomic";
import { cx } from "@linaria/core";
import { useMove } from "@use-gesture/react";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

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
	spacing = 40,
	dotSize = 1,
	damping = 0.45,
	returnSpeed = 0.18,
	attractionBase = 1.03,
	maxAttraction = 0.6,
	refForMousePosition,
	reactToWindowResize = true,
	...canvasProps
}) => {
	const $canvas = useRef<HTMLCanvasElement>(null);
	const animationFrameHandle = useRef(-1);
	const mousePosition = useRef({ x: -1000, y: -1000 });

	const getTargetToBind = () =>
		refForMousePosition === "window"
			? window
			: refForMousePosition?.current || $canvas.current;
	const [targetToBind, setTargetToBind] = useState(getTargetToBind());
	const bind = useMove(
		(state) => {
			mousePosition.current.x = state?.xy?.[0];
			mousePosition.current.y = state?.xy?.[1];
		},
		{
			target: targetToBind
		}
	);

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
		if (!canvas?.getContext) return; // Tests fail without this

		const ctx = canvas?.getContext("2d");

		// Set canvas size
		if (refForMousePosition === "window") {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		} else {
			// Get parent element size
			const parentElement = canvas.parentElement;
			canvas.width = parentElement?.offsetWidth || window.innerWidth;
			canvas.height = parentElement?.offsetHeight || window.innerHeight;
		}

		const dots: {
			x: number;
			y: number;
			vx: number;
			vy: number;
			originalX: number;
			originalY: number;
		}[] = [];

		// Initialize dots array
		for (let x = Math.round(spacing / 2); x < canvas.width; x += spacing) {
			for (let y = Math.round(spacing / 2); y < canvas.height; y += spacing) {
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

		setTargetToBind(getTargetToBind());
		drawDotGrid();

		if (reactToWindowResize) {
			window.addEventListener("resize", drawDotGrid);
		}

		// Reset mouse position when off-screen
		const resetMousePosition = () => {
			setTimeout(() => {
				mousePosition.current.x = -1000;
				mousePosition.current.y = -1000;
			}, 400);
		};
		window.addEventListener("touchend", resetMousePosition);
		document.addEventListener("mouseleave", resetMousePosition);

		return () => {
			resetAnimationFrame();
			window.removeEventListener("resize", drawDotGrid);
			window.removeEventListener("touchend", resetMousePosition);
			document.removeEventListener("mouseleave", resetMousePosition);
		};
	}, [drawDotGrid, reactToWindowResize]);

	return (
		<canvas
			{...canvasProps}
			{...bind}
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
