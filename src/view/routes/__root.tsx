import { Outlet, rootRouteWithContext, useRouterState } from "@tanstack/react-router";

import { Icon } from "view/components";

/**
 * `@tanstack/react-router` file-based routing.
 *
 * https://tanstack.com/router/latest/docs/framework/react/overview
 */
export const Route = rootRouteWithContext()({
	component: RootRoute,
	notFoundComponent: NotFoundRoute
});

function RootRoute() {
	return (
		<div>
			{/* Show a global spinner when the router is transitioning */}
			<RouterSpinner />
			{/* Render our first route match */}
			<Outlet />
		</div>
	);
}

function RouterSpinner() {
	const isLoading = useRouterState({ select: (s) => s.status === "pending" });
	return isLoading ? <Icon name="Spinner" /> : null;
}

function NotFoundRoute() {
	return (
		<div className="flex-center" style={{ height: "100vh" }}>
			<h2 style={{ fontSize: "2rem", textAlign: "center" }}>
				404, Page not found :(
			</h2>
		</div>
	);
}
