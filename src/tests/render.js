import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render as jestRender } from "@testing-library/react";

import store from "store";

export const render = (ui) => {
	const Wrapper = ({ children }) => {
		return (
			<Provider store={store}>
				<Router>{children}</Router>
			</Provider>
		);
	};

	return jestRender(ui, { wrapper: Wrapper });
};
