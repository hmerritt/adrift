import dayjs from "dayjs";

import { padChar } from "utils/common/strings";

// @TODO Create a class for this

enum ConsoleFunctions {
	debug = "debug",
	error = "error",
	info = "info",
	log = "log",
	trace = "trace",
	warn = "warn"
}

type chars = string | number;
const defaultLogNamespace = "_log";
const styles = ["color: #888"].join(";");
const timestamp = () => dayjs().format("HH:mm:ss.SSS");
const padStr = (str: chars, c = 5) => padChar(str, c, " ", true);

const getTotalCount = (namespace = defaultLogNamespace) => {
	return window.debugTimestamps?.[namespace]?.[1] || 1;
};

const timestampString = (diff: chars, debugNamespace?: string) => {
	const ts = `%c${timestamp()} +${padStr(diff)}%s`;

	if (debugNamespace === defaultLogNamespace) {
		return ts;
	}

	return `${ts} x${padStr(getTotalCount(debugNamespace), 4)} ${padStr(
		debugNamespace,
		8
	)}`;
};

const _log = (debugNamespace: string, logLevel: any, ...args: any[]) => {
	const timeElapsed = dayjs().diff(
		window.debugTimestamps?.[debugNamespace]?.[0] || Date.now(),
		"millisecond"
	);

	const stringToLog = timestampString(timeElapsed, debugNamespace);

	if (ConsoleFunctions[logLevel]) {
		console[ConsoleFunctions[logLevel]](stringToLog, styles, "", ...args);
	} else {
		console.log(stringToLog, styles, "", logLevel, ...args);
	}

	window.debugTimestamps[debugNamespace] = [
		Date.now(),
		getTotalCount(debugNamespace) + 1
	];
};

/**
 * log.
 *
 * Adds a timestamp and timediff to each log automatically.
 */
export const log = (logLevel: any, ...args: any[]) => {
	_log(defaultLogNamespace, logLevel, ...args);
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
		_log: [Date.now(), 1] // [timestamp, totalCount]
	};
};
