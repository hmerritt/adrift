import { screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { renderBasic } from "tests/render";

import { Halo, HaloProvider } from "./index";

describe("Halo component", () => {
	test("applies side padding from sides and lineSize", async () => {
		await renderBasic(
			<Halo
				data-testid="halo"
				lineSize="3px"
				sides={{ top: true, right: false, bottom: true, left: false }}
			>
				<div>Item</div>
			</Halo>
		);
		const $el = screen.getByTestId("halo");

		expect($el).toHaveStyle("padding-top: 3px");
		expect($el).toHaveStyle("padding-right: 0px");
		expect($el).toHaveStyle("padding-bottom: 3px");
		expect($el).toHaveStyle("padding-left: 0px");
	});

	test("defaults to 1px padding on all sides", async () => {
		await renderBasic(
			<Halo data-testid="halo-default">
				<div>Item</div>
			</Halo>
		);
		const $el = screen.getByTestId("halo-default");

		expect($el).toHaveStyle("padding-top: 1px");
		expect($el).toHaveStyle("padding-right: 1px");
		expect($el).toHaveStyle("padding-bottom: 1px");
		expect($el).toHaveStyle("padding-left: 1px");
	});

	test("renders optional gradient data attributes", async () => {
		await renderBasic(
			<Halo
				data-testid="halo-attrs"
				size="30rem"
				halo="rgb(1, 2, 3)"
			>
				<div>Item</div>
			</Halo>
		);
		const $el = screen.getByTestId("halo-attrs");

		expect($el).toHaveAttribute("data-halo");
		expect($el).toHaveAttribute("data-halo-size", "30rem");
		expect($el).toHaveAttribute("data-halo-color", "rgb(1, 2, 3)");
	});
});
