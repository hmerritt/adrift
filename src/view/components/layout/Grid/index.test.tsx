import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderBasic as render } from "tests/render";

import { Grid } from "./index";

describe("Grid component", () => {
	it("should render without crashing", async () => {
		await render(<Grid data-testid="grid" />);
		const gridElement = screen.getByTestId("grid");

		expect(gridElement).toBeInTheDocument();
	});

	it("should render children correctly", async () => {
		await render(
			<Grid>
				<div>Child 1</div>
				<span>Child 2</span>
			</Grid>
		);
		expect(screen.getByText("Child 1")).toBeInTheDocument();
		expect(screen.getByText("Child 2")).toBeInTheDocument();
	});

	it("should pass through other standard div props", async () => {
		await render(
			<Grid
				id="my-custom-grid"
				aria-label="My grid container"
				data-testid="grid-passthrough"
			/>
		);
		const gridElement = screen.getByTestId("grid-passthrough");

		expect(gridElement).toHaveAttribute("id", "my-custom-grid");
		expect(gridElement).toHaveAttribute("aria-label", "My grid container");
	});

	it("should apply default styles", async () => {
		await render(<Grid data-testid="grid-default" />);
		const gridElement = screen.getByTestId("grid-default");
		const styleAttribute = gridElement.getAttribute("style");

		expect(gridElement).toHaveStyle({
			position: "relative",
			display: "grid",
			width: "100%"
		});
		expect(gridElement).not.toHaveStyle({
			justifyContent: "center"
		});

		expect(styleAttribute).toContain("--gridGap: 10;");
		expect(styleAttribute).toContain(
			"--gridTemplateColumns: repeat(auto-fit, minmax(min(100%, 100rem), 1fr));"
		);
	});

	it("should apply center style when center prop is true", async () => {
		await render(<Grid center data-testid="grid-center" />);
		const gridElement = screen.getByTestId("grid-center");

		expect(gridElement).toHaveStyle({
			justifyContent: "center"
		});
	});

	it("should apply custom gutter", async () => {
		await render(<Grid gutter={25} data-testid="grid-gutter" />);
		const gridElement = screen.getByTestId("grid-gutter");
		const styleAttribute = gridElement.getAttribute("style");

		expect(styleAttribute).toContain("--gridGap: 25;");
	});

	it("should apply custom minWidth and maxWidth using numbers (rem unit)", async () => {
		await render(<Grid minWidth={30} maxWidth={60} data-testid="grid-minmax-num" />);
		const gridElement = screen.getByTestId("grid-minmax-num");

		expect(gridElement).toHaveStyle({
			gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 30rem), 60rem))"
		});
	});

	it("should apply custom minWidth and maxWidth using strings", async () => {
		await render(
			<Grid minWidth="250px" maxWidth="50%" data-testid="grid-minmax-str" />
		);
		const gridElement = screen.getByTestId("grid-minmax-str");

		expect(gridElement).toHaveStyle({
			gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 50%))"
		});
	});

	it('should use "1fr" for maxWidth if value is not provided or undefined', async () => {
		await render(
			<Grid minWidth={15} maxWidth={undefined} data-testid="grid-max-default" />
		);
		const gridElement = screen.getByTestId("grid-max-default");
		expect(gridElement).toHaveStyle({
			gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))"
		});
	});

	it("should use 20rem for minWidth if value is not provided or undefined", async () => {
		await render(
			<Grid minWidth={undefined} maxWidth="500px" data-testid="grid-min-default" />
		);
		const gridElement = screen.getByTestId("grid-min-default");
		expect(gridElement).toHaveStyle({
			gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 100rem), 500px))"
		});
	});
});
