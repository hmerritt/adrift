// @ts-nocheck
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import linaria from "./config/linaria-rollup.js";
import { injectManifest } from "rollup-plugin-workbox";

process.env.NODE_ENV = "production";
process.env.BABEL_ENV = "production";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: false,
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
			sourceMap: false,
			extension: ".scss",
			preprocessor: "none"
		}),
		injectManifest({
			mode: "production",
			swDest: "dist/sw.js",
			globDirectory: "dist",
			swSrc: "src/service-worker.ts",
			maximumFileSizeToCacheInBytes: 6 * 1024 * 1024
		})
	],
	test: {
		// https://vitest.dev/api/
		globals: true,
		environment: "happy-dom",
		setupFiles: "./src/tests/setupTests.ts",
		// Parsing CSS is slow
		css: false
	}
});
