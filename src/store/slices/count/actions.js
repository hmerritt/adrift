import * as types from "./reducer";

export const countIncrement = (incrementAmount = 0.1) => {
	return (dispatch) => {
		dispatch({ type: types.COUNT_INCREMENT, payload: incrementAmount });
	};
};
