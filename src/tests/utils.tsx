import {
	Outlet,
	createHashHistory,
	createRootRoute,
	createRoute,
	createRouter
} from "@tanstack/react-router";

import { render } from "./render";

/**
 * Create test router from element.
 *
 * @Note There is little to no documentation on best practices here.
 *
 * https://github.com/TanStack/router/discussions/604
 * https://github.com/TanStack/router/discussions/583
 * https://github.com/TanStack/router/discussions/198
 */
export const createTestRouter = (element: any) => {
	const rootRoute = createRootRoute({
		component: Outlet
	});

	const componentRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: "/",
		component: () => element
	});

	const router = createRouter({
		routeTree: rootRoute.addChildren([componentRoute]),
		history: createHashHistory()
	});

	return router;
};

/**
 * Shorthand for `document.querySelector`.
 *
 * `const { container } = render(<Home />);`
 */
export const select = (input: Element | ReturnType<typeof render>, selectors: string) => {
	const el = input instanceof Element ? input : input?.container;
	return el.querySelector(selectors);
};

/**
 * Shorthand for `window.getComputedStyle`.
 */
export const getStyle = (el: Element | null): CSSStyleDeclaration => {
	if (!el) return {} as CSSStyleDeclaration;
	return window.getComputedStyle(el);
};
