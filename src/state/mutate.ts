/**
 * Produce the next state by mutating the (current) state object.
 *
 * Based on `immer`'s draft syntax - no need to return anything, just mutate the draft object.
 *
 * @example
 * import { mutate } from "state";
 * const state = { count: 1 };
 * const next = mutate(state, (draft) => {
 * 	draft.count++;
 * })
 * // next = { count: 2 }
 */
export const mutate = <TState>(
	state: TState,
	mutateFn: (draft: TState) => void,
	middleware?: ((prevState: TState, nextState: TState, mutateTitle?: string) => void)[],
	mutateTitle?: string
): TState => {
	const nextState = { ...state };
	mutateFn(nextState);
	for (const middlewareFn of middleware ?? []) {
		middlewareFn(state, nextState, mutateTitle);
	}
	return nextState;
};

/**
 * Logger middleware for state mutations (mimics `redux-logger`).
 *
 * @example
 * import { mutate, mutateLogger } from "state";
 * const state = { count: 1 };
 * const next = mutate(state, (draft) => {
 * 	draft.count++;
 * }, [mutateLogger], "count increment");
 */
export const mutateLogger = (prevState: any, nextState: any, mutateTitle = "(state)") => {
	if (!env.isDevelopment) return;
	logn("state", "groupCollapsed", `${mutateTitle}`);
	console.log("prev", prevState);
	console.log("next", nextState);
	logn("state", "groupEnd");
};
