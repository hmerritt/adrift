// @ts-nocheck

/**
 * Internal adrift version.
 */
const adriftVersion = "0.10.439";

/**
 * Checks with latest GitHub release to see if there is an update.
 */
async function isAdriftUpdateAvailable() {
	try {
		const url = 'https://raw.githubusercontent.com/hmerritt/adrift/master/scripts/bootstrap/version.cjs';
		const rawGithubText = await (await fetch(url)).text();

		const versionRegex = /adriftVersion\s*=\s*"([^"]+)"/;
		const match = rawGithubText.match(versionRegex)[1].trim();

		if (!match || !match.match(/\d+\.\d+\.\d+/gi)) {
			throw new Error("No version found");
		}

		if (adriftVersion !== match) {
			return match;
		}
	} catch (error) { }

	return false;
}

module.exports = { adriftVersion, isAdriftUpdateAvailable };
