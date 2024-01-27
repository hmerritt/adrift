import { Outlet, createFileRoute } from "@tanstack/react-router";

import { Fullscreen, Stack } from "view/components";

export const Route = createFileRoute("/user")({
	component: UserLayoutComponent
});

function UserLayoutComponent() {
	return (
		<Stack spacing={15}>
			<Fullscreen
				center
				zIndex={1}
				position="relative"
				padding="1rem 2rem"
				style={{ height: "70vh" }}
			>
				{/* Render sub routes */}
				<Outlet />
			</Fullscreen>
		</Stack>
	);
}
