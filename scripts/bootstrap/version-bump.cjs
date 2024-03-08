// @ts-nocheck
const fs = require('fs');
const path = require('path');

const core = require("./core.cjs");

const pathRoot = path.dirname(path.dirname(__dirname));
const packageJSON = require(path.join(pathRoot, "package.json"));

async function main() {
	const commitCount = (await core.run(`git rev-list --count HEAD`, pathRoot, '')).trim();

	// Read the contents of version.cjs
	const versionFile = path.join(__dirname, 'version.cjs');
	const versionFileContent = fs.readFileSync(versionFile, 'utf8');

	// Extract the version number parts
	const versionMatch = versionFileContent.match(/(const adriftVersion = ")(\d+\.\d+\.)(\d+)(")/);
	const majorMinor = versionMatch?.[2];
	const newVersion = `${majorMinor}${commitCount}`;

	if (!majorMinor) {
		throw new Error('No version number found in version.cjs');
	}

	// Replace the version patch with the commit count
	const updatedContent = versionFileContent.replace(/(const adriftVersion = ")(\d+\.\d+\.)\d+(")/g, `$1${newVersion}$3`);

	// Write the updated content back to version.cjs
	fs.writeFileSync(versionFile, updatedContent, 'utf8');

	console.log(`\x1b[36madrift@${newVersion}\x1b[0m`);
}

main();
