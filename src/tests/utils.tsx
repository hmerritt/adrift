/**
 * Shorthand for `document.querySelector`.
 *
 * `const { container } = render(<Home />);`
 */
export const select = (el: Element, selectors: string) => {
	return el.querySelector(selectors);
};

/**
 * Shorthand for `window.getComputedStyle`.
 */
export const getStyle = (el: Element | null): CSSStyleDeclaration => {
	if (!el) return {} as CSSStyleDeclaration;
	return window.getComputedStyle(el);
};
