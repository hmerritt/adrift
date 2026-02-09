/**
 * State tracking for service worker (app) updates.
 */
export interface IUpdateStore {
	/** When true, an app update is available. Use `applyUpdate` action to apply. */
	updateAvailable: boolean;
}

export const updateStore: IUpdateStore = {
	updateAvailable: false
};

export default updateStore;
