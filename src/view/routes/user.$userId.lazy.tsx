import { Link, createLazyFileRoute } from "@tanstack/react-router";

// import { Stack } from "view/components";

export const Route = createLazyFileRoute("/user/$userId")({
	component: UserRoute
});

function UserRoute() {
	const { userId } = Route.useParams();

	return (
		<div>
			<h1>User {userId}</h1>
			<Link to="/">Back</Link>

			<p className={"textTmp"}>
				{" "}
				position: relative; width: 700px; height: 350px; margin: auto; display:
				flex; overflow: hidden; align-items: center; flex-direction: column;
				justify-content: center; box-shadow: shadowBlock($blue-400);
			</p>
		</div>
	);
}

// const textTmp = css`
// 	$purple-900: #322659;
// 	color: $purple-900;
// 	width: 300px;
// `;
