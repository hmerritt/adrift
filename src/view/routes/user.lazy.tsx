import { Link, Outlet, createLazyFileRoute } from "@tanstack/react-router";

// import { Fullscreen, Stack } from "view/components";

export const Route = createLazyFileRoute("/user")({
	component: UserLayoutComponent
});

function UserLayoutComponent() {
	return (
		<div>
			<Link to="/user/$userId" params={{ userId: "123" }}>
				User 123
			</Link>
			{/* Render sub routes */}
			<Outlet />
		</div>
	);
}
