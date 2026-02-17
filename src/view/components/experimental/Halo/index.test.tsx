import { fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { renderBasic } from "tests/render";

import { Halo, HaloProvider } from "./index";

vi.mock("lib/device", () => ({
	isMobile: false
}));

const moveMouse = (x = 50, y = 50) => {
	window.dispatchEvent(new MouseEvent("mousemove", { clientX: x, clientY: y }));
};

describe("Halo component", () => {
	test("sets default halo marker and all-sides metadata", async () => {
		const { getByTestId } = await renderBasic(
			<Halo data-testid="halo">
				<div>Halo child</div>
			</Halo>,
			true
		);
		const $el = getByTestId("halo");

		expect($el).toHaveAttribute("data-halo");
		expect($el).toHaveAttribute("data-halo-sides", "top,right,bottom,left");
	});

	test("maps per-halo props to data-halo attributes", async () => {
		const { getByTestId } = await renderBasic(
			<Halo
				data-testid="halo"
				sides={["bottom"]}
				size="12rem"
				halo="rgb(10, 10, 10)"
				background="rgb(250, 250, 250)"
			>
				<div>Halo child</div>
			</Halo>,
			true
		);
		const $el = getByTestId("halo");

		expect($el).toHaveAttribute("data-halo-sides", "bottom");
		expect($el).toHaveAttribute("data-halo-size", "12rem");
		expect($el).toHaveAttribute("data-halo-color", "rgb(10, 10, 10)");
		expect($el).toHaveAttribute("data-halo-background", "rgb(250, 250, 250)");
	});

	test("uses data attributes as final overrides during provider calculations", async () => {
		const { getByTestId } = await renderBasic(
			<HaloProvider
				gradient={{
					size: "6rem",
					halo: "rgb(1, 1, 1)",
					background: "rgb(2, 2, 2)"
				}}
			>
				<Halo
					data-testid="halo"
					sides={["left"]}
					size="8rem"
					halo="rgb(3, 3, 3)"
					background="rgb(4, 4, 4)"
					data-halo-sides="bottom"
					data-halo-size="14rem"
					data-halo-color="rgb(80, 80, 80)"
					data-halo-background="rgb(220, 220, 220)"
				>
					<div>Halo child</div>
				</Halo>
			</HaloProvider>,
			true
		);
		const $el = getByTestId("halo");

		moveMouse();

		expect($el.style.backgroundImage).toContain("14rem");
		expect($el.style.getPropertyValue("mask-position")).toContain("bottom left");
		expect($el.style.getPropertyValue("mask-size")).toContain("100% 1px");
	});

	test("composes all side layers by default", async () => {
		const { getByTestId } = await renderBasic(
			<HaloProvider>
				<Halo data-testid="halo">
					<div>Halo child</div>
				</Halo>
			</HaloProvider>,
			true
		);
		const $el = getByTestId("halo");

		fireEvent.scroll(window);
		moveMouse();

		expect($el.style.getPropertyValue("mask-position")).toContain("top right");
		expect($el.style.getPropertyValue("mask-position")).toContain("bottom left");
		expect($el.style.getPropertyValue("mask-size")).toContain("100% 1px");
		expect($el.style.getPropertyValue("mask-size")).toContain("1px 100%");
	});

	test("adds corner mask layers for adjacent sides so corners stay continuous", async () => {
		const setPropertySpy = vi.spyOn(CSSStyleDeclaration.prototype, "setProperty");
		const originalGetComputedStyle = window.getComputedStyle.bind(window);
		const getComputedStyleSpy = vi
			.spyOn(window, "getComputedStyle")
			.mockImplementation((elt: Element) => {
				const computed = originalGetComputedStyle(elt);
				return {
					...computed,
					borderTopLeftRadius: "16px",
					borderTopRightRadius: "16px",
					borderBottomRightRadius: "16px",
					borderBottomLeftRadius: "16px"
				} as CSSStyleDeclaration;
			});
		const { getByTestId } = await renderBasic(
			<HaloProvider>
				<Halo data-testid="halo" sides={["top", "right"]} style={{ borderRadius: "16px" }}>
					<div>Halo child</div>
				</Halo>
			</HaloProvider>,
			true
		);
		const $el = getByTestId("halo");

		moveMouse();

		const maskImage = $el.style.getPropertyValue("mask-image");
		expect(maskImage).toContain("linear-gradient");
		expect($el.style.getPropertyValue("mask-position")).toContain("top right");

		const maskImageCall = setPropertySpy.mock.calls.find(
			([name]) => name === "mask-image"
		);
		expect(maskImageCall?.[1]).toContain("radial-gradient");
		setPropertySpy.mockRestore();
		getComputedStyleSpy.mockRestore();
	});

	test("does not add corner arc masks when border radius is zero", async () => {
		const { getByTestId } = await renderBasic(
			<HaloProvider>
				<Halo data-testid="halo" sides={["top", "right"]} style={{ borderRadius: 0 }}>
					<div>Halo child</div>
				</Halo>
			</HaloProvider>,
			true
		);
		const $el = getByTestId("halo");

		moveMouse();

		expect($el.style.getPropertyValue("mask-image")).toBe(
			"linear-gradient(#000, #000), linear-gradient(#000, #000)"
		);
	});
});
