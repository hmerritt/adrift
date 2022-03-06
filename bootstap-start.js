const util = require("util");
const exec = util.promisify(require("child_process").exec);

const packageJSON = require("./package.json");

bootstrap();

// Bootstrap runs code before react start/build.
// Run anything you like, here we get the app version from the package.json + the current commit hash.
async function bootstrap() {
	try {
		const gitCommitHash = await run("git rev-parse --short HEAD");
		const appVersion = packageJSON?.version;

		// Set ENV array to inject, key/value
		const env = [];
		env.push(["REACT_APP_VERSION", appVersion]);
		env.push(["REACT_APP_GIT_COMMIT", gitCommitHash]);

		// Build ENV string
		let envString = "";
		env.forEach((item, index) => {
			if (index > 0) envString += ` `;
			envString += `${item[0]}=${item[1]}`;
		});

		console.log("Injecting the following ENV :", envString);

		// Run react-scripts command
		await run(`npx cross-env ${envString} react-scripts start`);
	} catch (error) {
		console.error("[bootstrap]", error);
	}
}

// Execute OS commands, awaits response from stdout
async function run(command) {
	try {
		const { stdout, stderr } = await exec(command);
		return stdout?.trim();
	} catch (e) {
		console.error("[run]", e); // Should contain code (exit code) and signal (that caused the termination).
	}
}
