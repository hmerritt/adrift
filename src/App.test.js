import React from "react";
import { screen } from "@testing-library/react";

import { render } from "tests";

import App from "./App";

test("renders app", () => {
	render(<App />);

	const linkElement = screen.getByText(/useInterval 100ms/i);
	expect(linkElement).toBeInTheDocument();
});
