import { $global } from "./utils";

/**
 * Environment variables.
 *
 * Add all environment variables here to ensure type safety.
 */
export const env = {
	// Core
	appName: "App", // Optionally use `import.meta.env.VITE_NAME`
	appVersion: import.meta.env.VITE_VERSION,
	gitBranch: import.meta.env.VITE_GIT_BRANCH,
	gitCommitHash: import.meta.env.VITE_GIT_COMMIT,
	mode: import.meta.env.MODE,
	isDevelopment: import.meta.env.MODE === "development",
	isProduction: import.meta.env.MODE === "production",
	isTesting: import.meta.env.MODE === "test" || import.meta.env.MODE === "testing",
	// Features
	timerIncrement: import.meta.env.VITE_FEATURE_INCREMENT,
	someOtherFeature: false
};

export type EnvObj = typeof env;
export type EnvKeys = keyof EnvObj;

export const injectEnv = () => {
	$global.env = env;
};