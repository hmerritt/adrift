import eslint from "@nabla/vite-plugin-eslint";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { injectManifest } from "rollup-plugin-workbox";
import stylex from "unplugin-stylex/vite";
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
		minify: !isDev
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
			dev: isDev,
			stylex: {
				aliases,
				useCSSLayers: true,
				genConditionalClasses: false,
				treeshakeCompensation: false,
				runtimeInjection: isTest // isDev
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
