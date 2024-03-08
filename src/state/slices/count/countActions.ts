import { store } from "state/index";

import { type ICountStore } from "./countStore";

const countUpdate = (getNext: (current: ICountStore) => Partial<ICountStore>) => {
	store.setState((state) => {
		return {
			...state,
			count: {
				...state.count,
				...getNext(state.count)
			}
		};
	});
};

export const countIncrement = (incrementAmount = 0.1) => {
	countUpdate((count) => ({
		current: Number((Number(count.current) + Number(incrementAmount)).toFixed(2))
	}));
};
