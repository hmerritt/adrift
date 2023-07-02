/**
 * This file contains a Rollup loader for Linaria.
 * It uses the transform.ts function to generate class names from source code,
 * returns transformed code without template literals and attaches generated source maps
 */
import { createFilter } from "@rollup/pluginutils";
import { createCustomDebug } from "@linaria/logger";
import { getFileIdx, syncResolve } from "@linaria/utils";
import { transform, slugify, TransformCacheCollection } from "@linaria/babel-preset";

import type { Plugin } from "rollup";
import type { PluginOptions, Preprocessor, Result } from "@linaria/babel-preset";

type RollupPluginOptions = {
	include?: string | string[];
	exclude?: string | string[];
	sourceMap?: boolean;
	preprocessor?: Preprocessor;
} & Partial<PluginOptions>;

export default function linaria({
	include,
	exclude,
	sourceMap,
	preprocessor,
	...rest
}: RollupPluginOptions = {}): Plugin {
	const filter = createFilter(include, exclude);
	const cssLookup: { [key: string]: string } = {};
	const cache = new TransformCacheCollection();

	const plugin: Plugin = {
		name: "linaria",
		load(id: string) {
			return cssLookup[id];
		},
		/* eslint-disable-next-line consistent-return */
		resolveId(importee: string) {
			if (importee in cssLookup) return importee;
		},
		async transform(
			code: string,
			id: string
		): Promise<{ code: string; map: Result["sourceMap"] } | undefined> {
			// Do not transform ignored and generated files
			if (!filter(id) || id in cssLookup) return;

			const log = createCustomDebug("rollup", getFileIdx(id));

			log("rollup-init", id);

			const asyncResolve = async (
				what: string,
				importer: string,
				stack: string[]
			) => {
				const resolved = await this.resolve(what, importer);
				if (resolved) {
					if (resolved.external) {
						// If module is marked as external, Rollup will not resolve it,
						// so we need to resolve it ourselves with default resolver
						const resolvedId = syncResolve(what, importer, stack);
						log("resolve", "✅ '%s'@'%s -> %O\n%s", what, importer, resolved);
						return resolvedId;
					}

					log("resolve", "✅ '%s'@'%s -> %O\n%s", what, importer, resolved);

					// Vite adds param like `?v=667939b3` to cached modules
					const resolvedId = resolved.id.split("?")[0];

					if (resolvedId.startsWith("\0")) {
						// \0 is a special character in Rollup that tells Rollup to not include this in the bundle
						// https://rollupjs.org/guide/en/#outputexports
						return null;
					}

					return resolvedId;
				}

				log("resolve", "❌ '%s'@'%s", what, importer);
				throw new Error(`Could not resolve ${what}`);
			};

			const result = await transform(
				code,
				{
					filename: id,
					preprocessor,
					pluginOptions: rest
				},
				asyncResolve,
				{},
				cache
			);

			if (!result.cssText) return;

			let { cssText } = result;

			const slug = slugify(cssText);

			// @IMPORTANT: We *need* to use `.scss` extension here.
			// This tiny change is the only difference between this file and using `@linaria/vite`.
			const filename = `${id.replace(/\.[jt]sx?$/, "")}_${slug}.scss`;

			if (sourceMap && result.cssSourceMapText) {
				const map = Buffer.from(result.cssSourceMapText).toString("base64");
				cssText += `/*# sourceMappingURL=data:application/json;base64,${map}*/`;
			}

			cssLookup[filename] = cssText;

			result.code += `\nimport ${JSON.stringify(filename)};\n`;

			/* eslint-disable-next-line consistent-return */
			return { code: result.code, map: result.sourceMap };
		}
	};

	return plugin;
}
