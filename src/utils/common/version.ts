import { log } from './log';

export const appName = "App";
export const appVersion = process.env.REACT_APP_VERSION;
export const gitBranch = process.env.REACT_APP_GIT_BRANCH;
export const gitCommitHash = process.env.REACT_APP_GIT_COMMIT;

export const versionString = () => {
    if (!appVersion) {
		return `${appName} [Version unknown]`;
	}

    let versionString = `${appName} [Version ${appVersion}`;

    if (gitBranch !== "master") {
        versionString += `-${gitBranch ?? "unknown"}`;
    }

    if (gitCommitHash) {
        versionString += ` (${gitCommitHash})`;
    }

    versionString += `]`;

    return versionString;
}

export const versionLog = () => {
    log(versionString());
}
