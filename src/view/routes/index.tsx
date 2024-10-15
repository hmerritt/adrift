import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: IndexRoute
});

export function IndexRoute() {
	return (
		<>
			<h4>Template react app with batteries included 🔋</h4>
		</>
	);
}
