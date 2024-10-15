//@ts-ignore Complaining that the export does not exist, when in fact it does
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from "vite";
import { injectManifest } from "rollup-plugin-workbox";
import styleX from 'vite-plugin-stylex';
import tsconfigPaths from "vite-tsconfig-paths";

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
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler"
			}
		}
	},
	plugins: [
		react(),
		styleX(),
		tsconfigPaths(),
		TanStackRouterVite({
			routesDirectory: "src/view/routes"
		}),
		injectManifest({
			swDest: "dist/sw.js",
			globDirectory: "dist",
			swSrc: "src/service-worker.ts",
			maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
		})
	]
});
