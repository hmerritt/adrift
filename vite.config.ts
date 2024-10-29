import styleXPlugin from "@stylexjs/babel-plugin";
//@ts-ignore Complaining that the export does not exist, when in fact it does
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { injectManifest } from "rollup-plugin-workbox";
import eslint from "vite-plugin-eslint";
import styleX from "vite-plugin-stylex";
import tsconfigPaths from "vite-tsconfig-paths";
import { ViteUserConfig, defineConfig } from "vitest/config";

const isDev = process.env.NODE_ENV !== "production";
const isTest = process.env.NODE_ENV === "test";
const aliases = {
	"lib/*": [path.join(__dirname, "src/lib/*")],
	"state/*": [path.join(__dirname, "src/state/*")],
	"tests/*": [path.join(__dirname, "src/tests/*")],
	"types/*": [path.join(__dirname, "src/types/*")],
	"view/*": [path.join(__dirname, "src/view/*")]
};

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: isDev,
		minify: true
	},
	define: {
		"process.env": {}
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler"
			}
		}
	},
	plugins: [
		eslint(),
		tsconfigPaths(),
		react({
			babel: {
				plugins: [
					"babel-plugin-react-compiler",
					// StyleX Babel is only required for tests
					...(isTest
						? [
								[
									styleXPlugin,
									{
										aliases,
										dev: isDev || isTest,
										test: false,
										// Required for CSS variable support
										unstable_moduleResolution: {
											type: "commonJS",
											rootDir: __dirname
										}
									}
								]
							]
						: [])
				]
			}
		}),
		styleX({
			aliases,
			test: false,
			useCSSLayers: true,
			useRemForFontSize: true
		}),
		TanStackRouterVite({
			routesDirectory: "src/view/routes"
		}),
		injectManifest({
			swDest: "dist/sw.js",
			globDirectory: "dist",
			swSrc: "src/service-worker.ts",
			maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
		})
	],
	test: {
		globals: false,
		environment: "happy-dom",
		setupFiles: "./src/tests/setupTests.ts",
		css: true, // @Note Parsing CSS is slow
		exclude: ["node_modules", "tests-e2e", "dist", ".idea", ".git", ".cache"],
		coverage: {
			enabled: false,
			provider: "v8"
		},
		benchmark: {
			include: ["**/*.{bench,benchmark}.?(c|m)[jt]s?(x)"],
			exclude: ["node_modules", "tests-e2e", "dist", ".idea", ".git", ".cache"]
		},
		// Debug
		logHeapUsage: true
	}
} as ViteUserConfig);
