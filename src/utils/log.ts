const logLevelTypes = {
	debug: 1,
	error: 1,
	info: 1,
	log: 1,
	trace: 1,
	warn: 1,
};

// Custom log function
export const log = (logLevel, ...args) => {
	if (logLevelTypes[logLevel]) {
		console[logLevel](...args);
	} else {
		console.log(logLevel, ...args);
	}
};

// Alias of log, execpt only in dev mode
export const debug = (logLevel, ...args) => {
	if (process.env.NODE_ENV !== 'production') {
		log(logLevel, ...args);
	}
};

// Append log functions to window object
// window.log = log;
// window.debug = debug;
