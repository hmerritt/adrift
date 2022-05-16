import dayjs from "dayjs";

const logLevelTypes = {
	debug: 1,
	error: 1,
	info: 1,
	log: 1,
	trace: 1,
	warn: 1
};

const styles = ["color: #888"].join(";");
const timestamp = () => dayjs().format("HH:mm:ss.SSS");
const timestampString = (diff) => `%c${timestamp()} +${diff}%s`;

// Custom log function
export const log = (logLevel, ...args) => {
	if (logLevelTypes[logLevel]) {
		console[logLevel](...args);
	} else {
		console.log(logLevel, ...args);
	}
};

// Development only logs, plus a timespamp is added to each log automatically
export const debug = (logLevel, ...args) => {
	if (process.env.NODE_ENV !== "production") {
		const timeElapsed = dayjs().diff(
			window.lastDebugTimestamp,
			"millisecond"
		);

		if (logLevelTypes[logLevel]) {
			console[logLevel](
				timestampString(timeElapsed),
				styles,
				"",
				...args
			);
		} else {
			console.log(
				timestampString(timeElapsed),
				styles,
				"",
				logLevel,
				...args
			);
		}

		window.lastDebugTimestamp = Date.now();
	}
};

// Inject custom log functions to window object
export const injectGlobalLog = () => {
	window.log = log;
	window.debug = debug;
	window.lastDebugTimestamp = Date.now();
};
