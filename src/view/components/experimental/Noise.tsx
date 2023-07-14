import { memo, useEffect, useRef, useState } from "react";
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
	canvas.width = window.innerWidth * window.devicePixelRatio;
	canvas.height = window.innerHeight * window.devicePixelRatio;
	canvas.style.width = window.innerWidth + "px";
	canvas.style.height = window.innerHeight + "px";
};

/**
 * Noise effect.
 *
 * @warning can negatively impact performance
 */
export const Noise = memo(() => {
	const $canvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = $canvas.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		canvasResize(canvas);
		window.addEventListener("resize", () => canvasResize(canvas));

		const fps = 10;
		let fpsInterval = 1000 / fps;
		let then = Date.now();

		// Escape loop when unmount
		const loopRunning = { current: true };

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
	}, []);

	return <canvas ref={$canvas} className={noise}></canvas>;
});

const noise = css`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: -5;
	opacity: 1;
	user-select: none;
	pointer-events: none;
`;
