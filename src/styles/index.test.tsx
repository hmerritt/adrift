import { expect, test } from "vitest";

import StylesMock from "tests/StylesMock";
import { getStyle, render, select } from "tests";

/**
 * Test to see if the styles are being compiled and injected correctly.
 *
 * linaria needs to compile our custom SCSS `theme` object.
 *
 * Shouldn't need to do this for every component, a few couldn't hurt though.
 */

test("@linaria with theme injection", () => {
	const { container } = render(<StylesMock />);

	const styleContainer = getStyle(select(container, "div"));
	expect(styleContainer.maxWidth).toBe("567px");
	expect(styleContainer.marginLeft).toBe("auto");
	expect(styleContainer.marginRight).toBe("auto");
	expect(styleContainer.transition).toBe("all, 80ms, ease");

	const styleTitle = getStyle(select(container, "h1"));
	expect(styleTitle.color).toBe("#38a169");

	const styleSubTitle = getStyle(select(container, "h2"));
	expect(styleSubTitle.color).toBe("#dd6b20");
});
