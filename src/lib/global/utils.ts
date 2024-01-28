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
