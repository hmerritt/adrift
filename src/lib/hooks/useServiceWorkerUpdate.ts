import { useSyncExternalStore } from "react";

import {
	getServiceWorkerUpdateState,
	subscribeToServiceWorkerUpdates,
	type ServiceWorkerUpdateState
} from "serviceWorkerRegistration";

/**
 * Hook that returns the current service worker update state.
 */
export const useServiceWorkerUpdate = (): ServiceWorkerUpdateState => {
	return useSyncExternalStore(
		subscribeToServiceWorkerUpdates,
		getServiceWorkerUpdateState,
		getServiceWorkerUpdateState
	);
};
