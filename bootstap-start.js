const util = require("util");
const exec = require("child_process").exec;
const execAwait = util.promisify(exec);

const packageJSON = require("./package.json");

bootstrap();

// Bootstrap runs code before react start/build.
// Run anything you like, here we get the app version from the package.json + the current commit hash.
async function bootstrap() {
	try {
		const gitCommitHash = await run("git rev-parse --short HEAD");
		const appVersion = packageJSON?.version;

		// Set ENV array to inject, key/value
		const env = [
			["REACT_APP_VERSION", appVersion],
			["REACT_APP_GIT_COMMIT", gitCommitHash],
		];

		// Build ENV string
		const envString = buildENV(env);

		// Run react-scripts command
		runStream(`npx cross-env ${envString} react-scripts start`);
	} catch (error) {
		console.error("[bootstrap]", error);
	}
}

// Handles ENV array and build a string to use
function buildENV(env = []) {
	if (env.length < 1) return "";

	console.log("Building ENV to inject:");

	// Build ENV string
	let envString = "";
	env.forEach((item, index) => {
		if (index > 0) envString += ` `;
		const envPair = `${item[0]}=${item[1]}`;
		envString += envPair;
		console.log("  ", index, envPair);
	});

	console.log("");

	return envString;
}

// Execute OS commands, awaits response from stdout
async function run(command) {
	try {
		const { stdout, stderr } = await execAwait(command);
		return stdout?.trim();
	} catch (e) {
		console.error("[run]", e); // Should contain code (exit code) and signal (that caused the termination).
	}
}

// Execute OS commands, awaits response from stdout
function runStream(command) {
	const process = exec(command);

	process.stdout.on("data", (data) => {
		console.log(data.toString());
	});

	process.stderr.on("data", (data) => {
		console.error(data.toString());
	});

	process.on("exit", (code) => {
		console.log(
			"[runStream] Child process exited with code " + code.toString()
		);
	});
}
