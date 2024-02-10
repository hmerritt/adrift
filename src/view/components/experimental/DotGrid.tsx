import { css, cx } from "@linaria/core";
import { useEffect, useRef } from "react";

export type DotGridProps = {
	/** Spacing between the dots */
	spacing: number;
	/** Size of each dot */
	dotSize: number;
	/** Damping for smoother motion */
	damping: number;
	/** Speed at which dots return to their original position */
	returnSpeed: number;
	/** Base for the exponential function */
	attractionBase: number;
	/** Maximum attraction to avoid extreme values */
	maxAttraction: number;
	/** Redraw canvas on window resize (responsive, but may impact performance) */
	reactToWindowResize?: boolean;
};

export const DotGrid: React.FC<DotGridProps> = ({
	spacing = 25,
	dotSize = 1,
	damping = 0.4,
	returnSpeed = 0.15,
	attractionBase = 1.06,
	maxAttraction = 0.4,
	reactToWindowResize = true
}) => {
	const $canvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!$canvas.current) return;

		const canvas = $canvas.current;
		const ctx = canvas.getContext("2d");

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		let mouseX = -1000; // Start off canvas
		let mouseY = -1000;
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

		canvas.addEventListener("mousemove", function (event) {
			mouseX = event.clientX;
			mouseY = event.clientY;
		});

		function draw() {
			if (!ctx) return;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let dot of dots) {
				let dx = mouseX - dot.x;
				let dy = mouseY - dot.y;
				let distance = Math.sqrt(dx * dx + dy * dy);

				// Exponential attraction calculation
				let attractionFactor = Math.min(
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
			requestAnimationFrame(draw);
		}

		function drawDot(x: number, y: number, size: number) {
			if (!ctx) return;
			ctx.beginPath();
			ctx.arc(x, y, size, 0, Math.PI * 2, false);
			ctx.fillStyle = "black";
			ctx.fill();
		}

		draw();
	}, []);

	return <canvas ref={$canvas} className={dotGrid} />;
};

const dotGrid = css`
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
`;
