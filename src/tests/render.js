import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render as jestRender } from "@testing-library/react";

import store from "store";

export const render = (ui, route = "") => {
	const Wrapper = ({ children }) => {
		return (
			<Provider store={store}>
				<MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
			</Provider>
		);
	};

	return jestRender(ui, { wrapper: Wrapper });
};

export const renderBasic = (ui) => {
	const Wrapper = ({ children }) => {
		return <Provider store={store}>{children}</Provider>;
	};

	return jestRender(ui, { wrapper: Wrapper });
};
