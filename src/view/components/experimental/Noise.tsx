import { useEffect, useRef } from "react";
import { css } from "@linaria/core";

const canvasNoise = (
	ctx: CanvasRenderingContext2D,
	patternSize = 64,
	patternAlpha = 25
) => {
	const patternPixelDataLength = patternSize * patternSize * 4;
	const patternData = ctx.createImageData(patternSize, patternSize);

	for (let i = 0; i < patternPixelDataLength; i += 4) {
		const value: number = (Math.random() * 255) | 0;

		patternData.data[i] = value;
		patternData.data[i + 1] = value;
		patternData.data[i + 2] = value;
		patternData.data[i + 3] = patternAlpha;
	}

	ctx.putImageData(patternData, 0, 0);
};

const canvasResize = (canvas: HTMLCanvasElement, patternSize = 64) => {
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	canvas.width = patternSize;
	canvas.height = patternSize;
};

/**
 * Animated noise effect.
 *
 * @warning can negatively impact performance
 */
export const Noise = ({
	framerate = 12,
	size = 256,
	alpha = 25,
	reactToWindowResize = false
}) => {
	const $canvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = $canvas.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		canvasResize(canvas, size);

		if (reactToWindowResize) {
			window.addEventListener("resize", () => canvasResize(canvas, size));
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
				canvasNoise(ctx, size, alpha);
			}
		})();

		return () => {
			loopRunning.current = false;
			window.removeEventListener("resize", () => canvasResize(canvas, size));
		};
	}, [framerate, reactToWindowResize]);

	return <canvas ref={$canvas} className={canvas} />;
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
