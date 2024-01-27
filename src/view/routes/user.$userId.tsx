import { css } from "@linaria/core";
import { Link, createFileRoute } from "@tanstack/react-router";

import theme from "lib/styles";

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
			<h1 className={header}>User {userId}</h1>
			<Link to="/">Back</Link>
		</Stack>
	);
}

const header = css`
	${theme}
	text-transform: lowercase;
	font-style: italic;
	font-size: 10rem;
	font-weight: thin;
	color: $blue-100;
	text-shadow: shadowBlock($blue-400);
`;
