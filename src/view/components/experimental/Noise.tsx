import { useEffect, useRef } from "react";
import { css } from "@linaria/core";

const canvasNoise = (ctx: CanvasRenderingContext2D) => {
	const w = ctx.canvas.width,
		h = ctx.canvas.height,
		iData = ctx.createImageData(w, h),
		buffer32 = new Uint32Array(iData.data.buffer),
		len = buffer32.length;
	let i = 0;

	for (; i < len; i++) if (Math.random() < 0.5) buffer32[i] = 0xffffffff;

	ctx.putImageData(iData, 0, 0);
};

const canvasResize = (canvas: HTMLCanvasElement) => {
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
};

/**
 * Animated noise effect.
 *
 * @warning can negatively impact performance
 */
export const Noise = ({ framerate = 10, reactToWindowResize = false, opacity = 0.5 }) => {
	const $canvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = $canvas.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		canvasResize(canvas);

		if (reactToWindowResize) {
			window.addEventListener("resize", () => canvasResize(canvas));
		}

		const loopRunning = { current: true }; // Escape loop when unmount
		const fpsInterval = 1000 / framerate;
		let then = Date.now();

		(function loop() {
			if (!canvas || !ctx || !loopRunning.current) return;
			requestAnimationFrame(loop);

			const now = Date.now();
			const elapsed = now - then;
			if (elapsed > fpsInterval) {
				then = now - (elapsed % fpsInterval);
				canvasNoise(ctx);
			}
		})();

		return () => {
			loopRunning.current = false;
			window.removeEventListener("resize", () => canvasResize(canvas));
		};
	}, [framerate, reactToWindowResize]);

	return <canvas ref={$canvas} className={canvas} style={{ opacity }} />;
};

// Fill container
const canvas = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	user-select: none;
	pointer-events: none;
`;
