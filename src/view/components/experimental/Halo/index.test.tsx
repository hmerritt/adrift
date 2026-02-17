import { screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { renderBasic } from "tests/render";

import { Halo, HaloProvider } from "./index";

describe("Halo component", () => {
	test("applies side padding from haloSides and lineSize", async () => {
		await renderBasic(
			<Halo
				data-testid="halo"
				lineSize="3px"
				haloSides={{ top: true, right: false, bottom: true, left: false }}
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
				background="rgb(4, 5, 6)"
			>
				<div>Item</div>
			</Halo>
		);
		const $el = screen.getByTestId("halo-attrs");

		expect($el).toHaveAttribute("data-halo");
		expect($el).toHaveAttribute("data-halo-size", "30rem");
		expect($el).toHaveAttribute("data-halo-color", "rgb(1, 2, 3)");
		expect($el).toHaveAttribute("data-halo-background", "rgb(4, 5, 6)");
	});
});

describe("HaloProvider component", () => {
	test("uses per-Halo overrides before provider defaults", async () => {
		await renderBasic(
			<HaloProvider
				gradient={{
					size: "11rem",
					halo: "rgb(11, 11, 11)",
					background: "rgb(22, 22, 22)"
				}}
			>
				<Halo
					data-testid="halo-local"
					size="33rem"
					halo="rgb(1, 2, 3)"
					background="rgb(4, 5, 6)"
				>
					<div>Local</div>
				</Halo>
				<Halo data-testid="halo-global">
					<div>Global</div>
				</Halo>
			</HaloProvider>
		);

		window.dispatchEvent(
			new MouseEvent("mousemove", {
				clientX: 40,
				clientY: 60
			})
		);

		const $local = screen.getByTestId("halo-local");
		const $global = screen.getByTestId("halo-global");

		await waitFor(() => {
			expect($local.style.background).toContain("33rem");
			expect($local.style.background).toMatch(/rgb\(1,\s*2,\s*3\)/);
			expect($local.style.background).toMatch(/rgb\(4,\s*5,\s*6\)/);

			expect($global.style.background).toContain("11rem");
			expect($global.style.background).toMatch(/rgb\(11,\s*11,\s*11\)/);
			expect($global.style.background).toMatch(/rgb\(22,\s*22,\s*22\)/);
		});
	});
});
