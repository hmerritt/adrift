import { Store } from "@tanstack/react-store";

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
