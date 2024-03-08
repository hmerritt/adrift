import { store } from "state/index";

import { type IColorStore } from "./colorStore";

const colorUpdate = (getNext: (current: IColorStore) => Partial<IColorStore>) => {
	store.setState((state) => {
		return {
			...state,
			color: {
				...state.color,
				...getNext(state.color)
			}
		};
	});
};

export const colorNext = () => {
	colorUpdate((color) => ({
		current: color.colors[Math.floor(Math.random() * color.colors.length)]
	}));
};
