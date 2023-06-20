/**
 * Returns global object to use.
 *
 * Aims to work in both the browser and node.
 */
export const getGlobal = () => {
	try {
		if (typeof window !== "undefined") {
			return window;
		}

		return globalThis;
	} catch (e) {
		return globalThis;
	}
};

export const $global = getGlobal();
