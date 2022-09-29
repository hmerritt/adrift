// @ts-nocheck
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import linaria from "./config/linaria-rollup.js";

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: true
	},
	define: {
		"process.env": {}
	},
	plugins: [
		react({
			jsxRuntime: "classic",
			babelrc: true,
			configFile: true
		}),
		tsconfigPaths(),
		linaria({
			sourceMap: true,
			extension: ".scss",
			preprocessor: "none"
		})
	]
});
