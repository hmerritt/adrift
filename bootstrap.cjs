#!/usr/bin/env node
const core = require("./scripts/bootstrap/core.cjs");
const packageJSON = require("./package.json");

const path = __dirname;
const args = process.argv.slice(2);

// Run bootrap
bootstrap();

// Bootstrap runs code before react start/build.
// Run anything you like, here we get the app version from the package.json + the current commit hash.
// prettier-ignore
async function bootstrap() {
	const gitCommitHash = await core.run(`git rev-parse HEAD`, path, null);
	const gitCommitHashShort = gitCommitHash ? core.shorten(gitCommitHash) : null;
	const gitBranch = await core.getGitBranch(path);
	const appVersion = packageJSON?.version;
	const appName = packageJSON?.name;

	// When true, the env array below can be overridden by whatever is in the environment at runtime.
	const allowEnvOverride = true;

	// Set ENV array to inject, key/value
	const env = [
		["GENERATE_SOURCEMAP", false],
		["VITE_NAME", appName],
		["VITE_VERSION", appVersion],
		["VITE_GIT_BRANCH", gitBranch],
		["VITE_GIT_COMMIT", gitCommitHashShort]
	];

	core.bootstrap(env, allowEnvOverride, args, path);
}
