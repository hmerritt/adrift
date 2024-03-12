/**
 * Logger middleware for state. Mimics `redux-logger`.
 */
export const stateLogger = (prevState: any, nextState: any) => {
	if (env.isProduction) return;
	logn("state", "groupCollapsed", `state update`);
	console.log("prev", prevState);
	console.log("next", nextState);
	logn("state", "groupEnd");
};
