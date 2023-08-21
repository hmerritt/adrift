import { $global } from "./utils";

export const getNumberOfEventListeners = () => {
	try {
		if (typeof window === "undefined" || !(window as any)?.getEventListeners)
			return -1;
		return Array.from(document.querySelectorAll("*")).reduce(function (pre, dom) {
			const clks = (window as any).getEventListeners(dom)?.click;
			pre += clks ? clks.length || 0 : 0;
			return pre;
		}, 0);
	} catch (e) {
		return -1;
	}
};

export const injectDevTools = () => {
	$global.getNumberOfEventListeners = getNumberOfEventListeners;
};
