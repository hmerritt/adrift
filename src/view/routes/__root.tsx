import * as stylex from "@stylexjs/stylex";
import {
	Outlet,
	createRootRouteWithContext,
	useRouterState
} from "@tanstack/react-router";
import { lazy } from "react";

import { colors } from "lib/styles/colors.stylex";
import { shadowFn } from "lib/styles/shadows.stylex";

import { DotGrid, FrostedGlass, Icon, Stack } from "view/components";

const TanStackRouterDevtools = feature("showDevTools", { alwaysShowOnDev: false })
	? lazy(() =>
			import("@tanstack/router-devtools").then((res) => ({
				default: res.TanStackRouterDevtools
			}))
		)
	: () => null;

/**
 * `@tanstack/react-router` file-based routing.
 *
 * https://tanstack.com/router/latest/docs/framework/react/overview
 */
export const Route = createRootRouteWithContext()({
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
			{/* Router dev tools */}
			<TanStackRouterDevtools />
		</div>
	);
}

function RouterSpinner() {
	const isLoading = useRouterState({ select: (s) => s.status === "pending" });
	return isLoading ? <Icon name="Spinner" /> : null;
}

export function NotFoundRoute() {
	return (
		<>
			<Stack center sx={styles.fullScreen}>
				<FrostedGlass sx={[styles.titleGlass, shadowFn.boxBlock(colors.primary)]}>
					<h2 {...stylex.props(styles.title)}>404, Page not found :(</h2>
				</FrostedGlass>
			</Stack>
			<DotGrid
				position="fixed"
				refForMousePosition="window"
				reactToWindowResize
				spacing={40}
				damping={0.5}
				returnSpeed={0.18}
				attractionBase={1.025}
				maxAttraction={0.8}
			/>
		</>
	);
}

const styles = stylex.create({
	fullScreen: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100vh"
	},
	titleGlass: {
		padding: "2.5rem"
	},
	title: {
		fontSize: "2rem",
		textAlign: "center",
		zIndex: 10
	}
});
