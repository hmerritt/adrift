// @ts-nocheck
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { injectManifest } from "rollup-plugin-workbox";

import linaria from "./config/linaria-rollup";

const isDev = process.env.NODE_ENV !== "production";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: isDev,
		minify: true
	},
	define: {
		"process.env": {}
	},
	plugins: [
		react({
			// jsxRuntime: "classic",
			babelrc: true,
			configFile: true
		}),
		tsconfigPaths(),
		linaria({
			sourceMap: isDev,
			extension: ".scss",
			preprocessor: "none",
			exclude: ["src/global/**"],
			include: ["**/*.{ts,tsx}"],
			babelOptions: {
				presets: ["@babel/preset-typescript", "@babel/preset-react"]
			}
		}),
		injectManifest({
			swDest: "dist/sw.js",
			globDirectory: "dist",
			swSrc: "src/service-worker.ts",
			maximumFileSizeToCacheInBytes: 6 * 1024 * 1024
		})
	],
	test: {
		// https://vitest.dev/api/
		globals: false,
		environment: "happy-dom",
		setupFiles: "./src/tests/setupTests.ts",
		// Parsing CSS is slow
		css: false
	}
});
