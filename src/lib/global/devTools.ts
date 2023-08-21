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

export const getObjectOfEventListeners = () => {
	try {
		if (typeof window === "undefined" || !(window as any)?.getEventListeners)
			return {};
		return Array.from(document.querySelectorAll("*")).reduce(function (
			pre: any,
			dom: any
		) {
			const evtObj = (window as any).getEventListeners(dom);
			Object.keys(evtObj).forEach(function (evt) {
				if (typeof pre[evt] === "undefined") {
					pre[evt] = 0;
				}
				pre[evt] += evtObj[evt].length;
			});
			return pre;
		},
		{});
	} catch (e) {
		return {};
	}
};

export const injectDevTools = () => {
	$global.getNumberOfEventListeners = getNumberOfEventListeners;
	$global.getObjectOfEventListeners = getObjectOfEventListeners;
};
