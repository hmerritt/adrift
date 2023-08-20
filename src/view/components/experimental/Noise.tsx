import { useEffect, useRef } from "react";
import { css } from "@linaria/core";

const canvasNoise = (ctx: CanvasRenderingContext2D, patternSize = 64) => {
	const iData = ctx.createImageData(patternSize, patternSize),
		buffer32 = new Uint32Array(iData.data.buffer),
		len = buffer32.length;

	for (let i = 0; i < len; i++) if (Math.random() < 0.5) buffer32[i] = 0xffffffff;

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
export const Noise = ({
	framerate = 10,
	patternSize = 64,
	reactToWindowResize = false,
	opacity = 0.5
}) => {
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
				canvasNoise(ctx, patternSize);
			}
		})();

		return () => {
			loopRunning.current = false;
			window.removeEventListener("resize", () => canvasResize(canvas));
		};
	}, [framerate, reactToWindowResize]);

	return <canvas ref={$canvas} className={canvas} style={{ opacity }} />;
};

// Fill parent container
const canvas = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	user-select: none;
	pointer-events: none;
`;
