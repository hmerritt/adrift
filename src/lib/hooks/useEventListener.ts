import { RefObject, useEffect, useRef } from "react";

/**
 * Use an EventListener. It takes an eventName, a call-back function (handler) and optionally a reference element.
 */
export function useEventListener<
	KW extends keyof WindowEventMap,
	KH extends keyof HTMLElementEventMap,
	T extends HTMLElement | void = void
>(
	eventName: KW | KH,
	handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void,
	element?: RefObject<T>
) {
	// Create a ref that stores handler
	const savedHandler = useRef(handler);

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		// Define the listening target
		const targetElement: T | Window = element?.current || window;
		if (!(targetElement && targetElement.addEventListener)) {
			return;
		}

		// Create event listener that calls handler function stored in ref
		const eventListener: typeof handler = (event) => savedHandler.current(event);

		targetElement.addEventListener(eventName, eventListener);

		// Remove event listener on cleanup
		return () => {
			targetElement.removeEventListener(eventName, eventListener);
		};
	}, [eventName, element]);
}
