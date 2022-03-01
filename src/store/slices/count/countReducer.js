export const COUNT_INCREMENT = "COUNT_INCREMENT";

const initialState = {
	current: 0,
};

const countReducer = (state = initialState, action) => {
	switch (action.type) {
		case COUNT_INCREMENT:
			return {
				...state,
				current: (
					parseFloat(state.current) + parseFloat(action.payload)
				).toFixed(2),
			};

		default:
			return state;
	}
};

export default countReducer;
