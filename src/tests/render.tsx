import { RouterProvider } from "@tanstack/react-router";
import { render as reactRender } from "@testing-library/react";
import { JSXElementConstructor, ReactElement } from "react";
import { Provider } from "react-redux";
import store from "state";

import { createTestRouter } from "./utils";

export type Element = ReactElement<any, string | JSXElementConstructor<any>>;

type Children = {
	children: Element;
};

export const render = (ui: Element) => {
	const Wrapper = ({ children }: Children) => {
		return (
			<Provider store={store}>
				<RouterProvider router={createTestRouter(children)} />
			</Provider>
		);
	};

	return reactRender(ui, { wrapper: Wrapper });
};

export const renderBasic = (ui: Element) => {
	const Wrapper = ({ children }: Children) => {
		return <Provider store={store}>{children}</Provider>;
	};

	return reactRender(ui, { wrapper: Wrapper });
};
