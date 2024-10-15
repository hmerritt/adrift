import * as sass from "sass";
import { defineConfig } from "@farmfe/core";
//@ts-ignore Complaining that the export does not exist, when in fact it does
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import linaria from "@wyw-in-js/vite";
import path from "path";
import { injectManifest } from "rollup-plugin-workbox";
import tsconfigPaths from "vite-tsconfig-paths";

const rootPath = path.resolve(process.cwd());
const srcPath = path.resolve(rootPath, "src");
const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
	root: rootPath,
	compilation: {
		input: {
			index: "./src/index.html"
		},
		output: {
			path: "dist",
			publicPath: "/",
			targetEnv: "browser"
		},
		resolve: {
			alias: {
				"~": rootPath,
				"@": srcPath
			}
		},
		define: {
			"process.env": {}
		},
		external: [],
		sourcemap: isDev
	},
	server: {
		// host: '0.0.0.0',
		port: 4200,
		open: true
	},
	plugins: [
		"@farmfe/plugin-react",
		["@farmfe/plugin-sass", { api: "modern-compiler" }]
	],
	vitePlugins: [
		tsconfigPaths(),
		TanStackRouterVite({
			routesDirectory: "src/view/routes"
		}),
		// linaria({
		// 	sourceMap: isDev,
		// 	preprocessor: (selector, cssText) => {
		// 		try {
		// 			const result = sass.compileString(`${selector} {${cssText}}\n`);
		// 			return result.css.toString();
		// 		} catch (error) {
		// 			console.error("Error processing SCSS:", error);
		// 			return "";
		// 		}
		// 	},
		// 	exclude: ["src/global/**", "**/*.test.{ts,tsx}"],
		// 	include: ["**/*.{ts,tsx}"]
		// }),
		injectManifest({
			swDest: "dist/sw.js",
			globDirectory: "dist",
			swSrc: "src/service-worker.ts",
			maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
		})
	]
	//
	//
	//
	// build: {
	// 	sourcemap: isDev,
	// 	minify: true
	// },
	// define: {
	// 	"process.env": {}
	// },
	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			api: "modern-compiler"
	// 		}
	// 	}
	// },
	// plugins: [
	// 	react(),
	// 	tsconfigPaths(),
	// 	TanStackRouterVite({
	// 		routesDirectory: "src/view/routes"
	// 	}),
	// 	linaria({
	// 		sourceMap: isDev,
	// 		preprocessor: (selector, cssText) => {
	// 			try {
	// 				const result = sass.compileString(`${selector} {${cssText}}\n`);
	// 				return result.css.toString();
	// 			} catch (error) {
	// 				console.error("Error processing SCSS:", error);
	// 				return "";
	// 			}
	// 		},
	// 		exclude: ["src/global/**", "**/*.test.{ts,tsx}"],
	// 		include: ["**/*.{ts,tsx}"]
	// 	}),
	// 	injectManifest({
	// 		swDest: "dist/sw.js",
	// 		globDirectory: "dist",
	// 		swSrc: "src/service-worker.ts",
	// 		maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
	// 	})
	// ]
});
