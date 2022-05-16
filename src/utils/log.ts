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
const timestamp = dayjs().format("HH:mm:ss.SSS");
const timestampColor = `%c${timestamp}%s`;

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
		if (logLevelTypes[logLevel]) {
			console[logLevel](timestampColor, styles, "", ...args);
		} else {
			console.log(timestampColor, styles, "", logLevel, ...args);
		}
	}
};

// Inject custom log functions to window object
export const injectGlobalLog = () => {
	window.log = log;
	window.debug = debug;
};
