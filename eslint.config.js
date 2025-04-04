import globals from "globals";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import stylex from "@stylexjs/eslint-plugin";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
	{
		ignores: ["dist/*", "build/*", "coverage/*"]
	},
	js.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: globals.browser
		},
		plugins: {
			"@stylexjs": stylex,
			"@typescript-eslint": typescript,
			prettier: prettier,
			react: react,
			"react-compiler": reactCompiler,
			"react-hooks": reactHooks
		},
		rules: {
			// TypeScript specific rules
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_"
				}
			],
			"@typescript-eslint/no-non-null-assertion": "warn",

			// React specific rules
			"react/react-in-jsx-scope": "off", // Not needed in React 17+
			"react/prop-types": "off", // We use TypeScript for props validation
			"react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
			"react/jsx-props-no-spreading": "off",
			"react/require-default-props": "off",

			// React Hooks rules
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",

			"react-compiler/react-compiler": "error",
			"@stylexjs/valid-styles": "warn",

			// General rules
			"no-console": ["warn", { allow: ["warn", "error"] }],
			"prefer-const": "warn",
			"no-unused-expressions": "warn",
			"no-undef": "off", // TypeScript handles this
			"no-unused-vars": "off", // Using TypeScript's no-unused-vars instead

			// Import rules
			"import/prefer-default-export": "off",
			"import/no-unresolved": "off", // TypeScript handles this

			// Prettier
			"prettier/prettier": [
				"error",
				{},
				{
					usePrettierrc: true
				}
			]
		},
		settings: {
			react: {
				version: "detect"
			}
		}
	}
];
