import { Link, createFileRoute } from "@tanstack/react-router";

import { Stack } from "view/components";

export const Route = createFileRoute("/user/$userId")({
	component: UserRoute,
	parseParams: (params) => ({
		userId: Number(params.userId)
	}),
	stringifyParams: ({ userId }) => ({ userId: `${userId}` })
});

function UserRoute() {
	const userId = Route.useParams({ select: (p) => p.userId });

	return (
		<Stack spacing={6}>
			<h1>User {userId}</h1>
			<Link to="/">Back</Link>
		</Stack>
	);
}
