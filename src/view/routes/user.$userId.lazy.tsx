import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Stack } from "view/components";

export const Route = createLazyFileRoute("/user/$userId")({
	component: UserRoute
});

function UserRoute() {
	const { userId } = Route.useParams();

	return (
		<Stack spacing={6}>
			<h1>User {userId}</h1>
			<Link to="/">Back</Link>

			<p className={"textTmp"}>
				position: relative; width: 700px; height: 350px; margin: auto; display:
				flex; overflow: hidden; align-items: center; flex-direction: column;
				justify-content: center; box-shadow: shadowBlock($blue-400);
			</p>
		</Stack>
	);
}
