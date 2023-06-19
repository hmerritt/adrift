import dayjs from "dayjs";

import { padChar } from "utils/common/strings";

enum ConsoleFunctions {
	debug = "debug",
	error = "error",
	info = "info",
	log = "log",
	trace = "trace",
	warn = "warn"
}

type chars = string | number;
const styles = ["color: #888"].join(";");
const padStr = (str: chars) => padChar(str, 5, " ", true);
const timestamp = () => dayjs().format("HH:mm:ss.SSS");
const getConsoleFunction = (level: ConsoleFunctions) => ConsoleFunctions[level];

const timestampString = (diff: chars, debugNamespace?: string) => {
	return `%c${timestamp()} +${padStr(diff)}%s${
		debugNamespace?.length && debugNamespace !== "__log"
			? ` [${debugNamespace}]`
			: ""
	}`;
};

const _log = (debugNamespace: string, logLevel: any, ...args: any[]) => {
	const timeElapsed = dayjs().diff(
		window.debugTimestamps[debugNamespace],
		"millisecond"
	);

	const stringToLog = timestampString(timeElapsed, debugNamespace);

	if (getConsoleFunction(logLevel)) {
		console[getConsoleFunction(logLevel)](stringToLog, styles, "", ...args);
	} else {
		console.log(stringToLog, styles, "", logLevel, ...args);
	}

	window.debugTimestamps[debugNamespace] = Date.now();
};

/**
 * log.
 *
 * Adds a timestamp and timediff to each log automatically.
 */
export const log = (logLevel: any, ...args: any[]) => {
	_log("__log", logLevel, ...args);
};

/**
 * log in development only (`NODE_ENV !== "production"`)
 *
 * Namespaces logs to keep them separate.
 *
 * @example log("socket", "msg received") -> "[socket] msg recieved"
 */
export const debug = (
	debugNamespace: string,
	logLevel: any,
	...args: any[]
) => {
	if (import.meta.env.MODE === "production") return;
	_log(debugNamespace, logLevel, ...args);
};

/**
 * Inject custom log functions to window object
 */
export const injectGlobalLog = () => {
	window.log = log;
	window.debug = debug;
	window.debugTimestamps = {
		__log: Date.now()
	};
};
