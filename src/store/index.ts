import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

// Array of middleware to use with redux-store
const middlewares = [thunk];

// Add logger middleware during development only
if (process.env.NODE_ENV === "development") {
	middlewares.push(
		createLogger({
			collapsed: true,
			// Exclude "COUNT_INCREMENT" type from redux-logger
			// predicate: (getState, action) => action.type !== "COUNT_INCREMENT",
		})
	);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
