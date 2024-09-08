/**
 * Returns global object to use.
 *
 * Aims to work in both the browser and node.
 */
export const getGlobal = () => {
	try {
		if (typeof window !== "undefined") return window;
		if (typeof globalThis !== "undefined") return globalThis;
		return global;
	} catch (e) {
		return global;
	}
};

/**
 * Set immutable global variable.
 */
export const setGlobalValue = (key: string, value: any) => {
	Object.defineProperty(getGlobal(), key, {
		value: value,
		configurable: false,
		writable: false
	});
};

export const $global = getGlobal();

/**
 * Parse string environment variable into a primitive.
 *
 * @exmaple `parseEnv("VITE_FEATURE_ENABLED") => true`
 */
export const parseEnv = (value: any, isJson = false) => {
	if (value === "true") return true;
	if (value === "false") return false;
	if (value === "undefined") return undefined;
	if (value === "null") return null;
	if (isJson) {
		try {
			return JSON.parse(value);
		} catch (e) {}
	}
	return value;
};

/**
 * Safely run async task, catching and returning any errors as a variable (similar to Go).
 *
 * @example const [error, result] = await run(myPromise())
 */
export const run = async <T, E = Error>(
	promise: Promise<T>
): Promise<[null, T] | [E, null]> => {
	try {
		const result = await promise;
		return [null, result];
	} catch (error) {
		return [error as E, null];
	}
};

export type RunFn = typeof run;

export const injectRun = () => {
	setGlobalValue("run", run);
};
