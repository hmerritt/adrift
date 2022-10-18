const config = {
	roots: ["<rootDir>/src"],
	collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
	setupFiles: ["react-app-polyfill/jsdom"],
	setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
	testMatch: [
		"<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
		"<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
	],
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(css|scss|sass)$": "jest-preview/transforms/css",
		"^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/file",
		"^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
	},
	transformIgnorePatterns: [
		"[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$"
	],
	modulePaths: ["<rootDir>/src"],
	moduleNameMapper: {
		"^react-native$": "react-native-web"
	},
	moduleFileExtensions: [
		"web.js",
		"js",
		"web.ts",
		"ts",
		"web.tsx",
		"tsx",
		"json",
		"web.jsx",
		"jsx",
		"node"
	],
	resetMocks: true
};

module.exports = config;
