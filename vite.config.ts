import eslint from "@nabla/vite-plugin-eslint";
import stylex from "@stylexjs/rollup-plugin";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { injectManifest } from "rollup-plugin-workbox";
import { ViteMinifyPlugin as minify } from "vite-plugin-minify";
import tsconfigPaths from "vite-tsconfig-paths";
import { ViteUserConfig, defineConfig } from "vitest/config";

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;
const isTest = process.env.NODE_ENV === "test";

const aliases = {
	"lib/*": [path.join(__dirname, "src/lib/*")],
	"state/*": [path.join(__dirname, "src/state/*")],
	"tests/*": [path.join(__dirname, "src/tests/*")],
	"types/*": [path.join(__dirname, "src/types/*")],
	"view/*": [path.join(__dirname, "src/view/*")]
};
const exclude = [
	".cache",
	".expo-shared",
	".expo",
	".git",
	".github",
	".husky",
	".idea",
	".next",
	".tanstack",
	".turbo",
	".vscode",
	".yarn",
	"build",
	"coverage",
	"dist",
	"node_modules",
	"tests-e2e"
];

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: isDev,
		minify: isProd
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
		eslint({ eslintOptions: { stats: true } }),
		tsconfigPaths(),
		react({
			babel: {
				plugins: ["babel-plugin-react-compiler"]
			}
		}),
		stylex({
			fileName: "assets/stylex.css",
			aliases,
			dev: isDev,
			debug: isDev,
			test: isTest,
			useCSSLayers: true,
			runtimeInjection: isDev,
			treeshakeCompensation: true,
			unstable_moduleResolution: {
				type: "commonJS",
				rootDir: path.join(__dirname, "src")
			}
		}),
		tanstackRouter({
			routesDirectory: "src/view/routes"
		}),
		injectManifest({
			swDest: "dist/sw.js",
			globDirectory: "dist",
			swSrc: "src/service-worker.ts",
			maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
		}),
		minify({
			minifyCSS: true
		})
	],
	test: {
		globals: false,
		environment: "happy-dom",
		setupFiles: "./src/tests/setupTests.ts",
		css: true, // @Note Parsing CSS is slow
		exclude: exclude,
		coverage: {
			enabled: false,
			provider: "v8"
		},
		benchmark: {
			include: ["**/*.{bench,benchmark}.?(c|m)[jt]s?(x)"],
			exclude: exclude
		},
		// Debug
		logHeapUsage: true
	}
} as ViteUserConfig);
