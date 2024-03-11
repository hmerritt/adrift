import { Store } from "@tanstack/react-store";
import { create as produce } from "mutative";

import { colorStore } from "./slices/color/colorStore";
import { countStore } from "./slices/count/countStore";

/**
 * Main state store for entire app ⚡.
 *
 * Built from individual slices defined in `state/slices`. A slice is a way of namespacing state within the store.
 * Since a slice is used mainly for organization, an action in any slice can change the state of any other slice.
 * This differs from Redux's `combineReducers`, which can NOT be used to change the state of other reducers.
 *
 * @usage
 * Create a new slice by creating a directory with `[name]Store` and `[name]Actions` files. The store file only
 * contains an object (the initial state) for that slice. The actions contain functions that update the state.
 *
 * Slices are then combined into the main store below.
 *
 * @example
 * // Access state anywhere:
 * import { store } from "state";
 * const count = store.state.count.current;
 *
 * @example
 * // Access state within a component:
 * import { useStore } from "lib/hooks";
 * const count = useStore((state) => state.count.current);
 */
export const store = new Store({
	color: colorStore,
	count: countStore
});
export default store;
export type RootState = typeof store.state;

/**
 * Standard mutative options.
 *
 * @see https://mutative.js.org/docs/intro
 */
const mutativeOptions = {
	strict: false as false,
	enablePatches: false as false,
	enableAutoFreeze: false as false
};

/**
 * Update store state.
 *
 * Mutate `draft` state object to update state.
 *
 * Based on `immer`'s draft syntax - no need to return anything, just mutate the draft object.
 *
 * @example
 * import { updateState } from "state";
 * updateState((draft) => {
 * 	draft.count.current += 1;
 * });
 */
export const updateState = (mutateFn: (draft: RootState) => void) => {
	store.setState((state) => {
		return produce(state, mutateFn, mutativeOptions);
	});
};

/**
 * Update a slice of the store.
 *
 * Mutate `draft` state object to update state.
 *
 * Based on `immer`'s draft syntax - no need to return anything, just mutate the draft object.
 *
 * @example
 * import { updateSlice } from "state";
 * updateSlice("count", (draftSlice) => {
 * 	draftSlice.current += 1;
 * });
 */
export const updateSlice = <T extends keyof RootState>(
	slice: T,
	mutateFn: (draftSlice: RootState[T]) => void
) => {
	store.setState((state) => {
		return {
			...state,
			[slice]: produce(state[slice], mutateFn, mutativeOptions)
		};
	});
};
