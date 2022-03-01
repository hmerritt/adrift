import * as types from "./types";

export const countIncrement = (incrementAmount = 0.1) => {
	return (dispatch) => {
		dispatch({ type: types.COUNT_INCREMENT, payload: incrementAmount });
	};
};
