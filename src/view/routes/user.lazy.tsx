import { Link, Outlet, createLazyFileRoute } from "@tanstack/react-router";

import { Stack } from "view/components";

export const Route = createLazyFileRoute("/user")({
	component: UserLayoutComponent
});

function UserLayoutComponent() {
	return (
		<Stack spacing={15}>
			<Link to="/user/$userId" params={{ userId: "123" }}>
				User 123
			</Link>
			{/* Render sub routes */}
			<Outlet />
		</Stack>
	);
}
