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
const defaultLogNamespace = "_log";
const styles = ["color: #888"].join(";");
const timestamp = () => dayjs().format("HH:mm:ss.SSS");
const padStr = (str: chars, c = 5) => padChar(str, c, " ", true);

// Internal log store class. Keeps track of log times and counts per namespace.
//
// Injects into window object as `window.logStore`.
class LogStore {
	defaultNamespace: string;
	logStore: Record<string, [number, number]>;

	constructor() {
		this.defaultNamespace = "_log";
		this.logStore = {
			_log: [Date.now(), 1]
		};
	}

	get(namespace = this.defaultNamespace) {
		return this.logStore?.[namespace];
	}

	getTime(namespace = this.defaultNamespace) {
		return this.logStore?.[namespace]?.[0] || Date.now();
	}

	getCount(namespace = this.defaultNamespace) {
		return this.logStore?.[namespace]?.[1] || 1;
	}

	set(namespace = this.defaultNamespace, time = Date.now(), count = 1) {
		return (this.logStore[namespace] = [time, count]);
	}

	increment(namespace = this.defaultNamespace) {
		return this.set(namespace, Date.now(), this.getCount(namespace) + 1);
	}
}

export type LogStoreType = LogStore;

const timestampString = (diff: chars, namespace?: string) => {
	const ts = `%c${timestamp()} +${padStr(diff)}%s`;

	if (namespace === defaultLogNamespace) {
		return ts;
	}

	return `${ts} x${padStr(window.logStore.getCount(namespace), 4)} ${padStr(
		namespace,
		8
	)}`;
};

const _log = (namespace: string, logLevel: any, ...args: any[]) => {
	const timeElapsed = dayjs().diff(
		window.logStore.getTime(namespace),
		"millisecond"
	);

	const stringToLog = timestampString(timeElapsed, namespace);

	if (ConsoleFunctions[logLevel]) {
		console[ConsoleFunctions[logLevel]](stringToLog, styles, "", ...args);
	} else {
		console.log(stringToLog, styles, "", logLevel, ...args);
	}

	window.logStore.increment(namespace);
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
export const debug = (namespace: string, logLevel: any, ...args: any[]) => {
	if (import.meta.env.MODE === "production") return;
	_log(namespace, logLevel, ...args);
};

/**
 * Inject custom log functions to window object
 */
export const injectGlobalLog = () => {
	window.log = log;
	window.debug = debug;
	window.logStore = new LogStore();
};
