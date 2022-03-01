import { combineReducers } from "redux";

import count from "./slices/count/reducer";

const rootReducer = combineReducers({
	count,
});

export default rootReducer;
