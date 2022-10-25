import { css } from "@linaria/core";

import theme from "styles";
import { feature } from "utils";
import { countIncrement } from "store/actions";
import { useDispatch, useSelector, useInterval } from "hooks";

import { Grid, Icon, Stack } from "components";

export const Home = () => {
	const dispatch = useDispatch();
	const count = useSelector((state) => state.count.current);

	useInterval(() => {
		if (feature("timerIncrement")) {
			dispatch(countIncrement(0.1));
		}
	}, 1000);

	return (
		<div className="Home">
			<Stack spacing={5} center style={{ height: "40vh" }}>
				<h1 className={header}>{count}</h1>
				<h1 style={{ fontSize: "3rem", textAlign: "center" }}>
					<small>useInterval 1000ms</small>
				</h1>
				<Icon name="spinner" />
			</Stack>
			<Grid
				center
				gutter={10}
				minWidth={20}
				maxWidth={20}
				className={grid}
			>
				{[...Array(12)].map((e, i) => (
					<div key={i} className={card} />
				))}
			</Grid>
		</div>
	);
};

// This will get compiled at build time into a css file
const header = css`
	${theme}
	text-transform: uppercase;
	font-size: 8rem;
	font-weight: thin;
	color: $red-500;
	/* color: pink; */
	text-align: center;
	text-shadow: $shadow-1;
	@include touch-highlight-disable();

	@for $i from 1 through 20 {
		.stack.stack-#{$i} {
			& > * {
				margin-top: #{$i}rem;
			}
		}
	}
`;

const grid = css`
	${theme}
	margin: auto;
	padding: 1rem;
	max-width: 900px;
	margin-bottom: 6rem;
`;

const card = css`
	${theme}
	width: 100%;
	height: 200px;
	border-radius: 20px;
	box-shadow: $shadow-1;
	background-color: #fff;
`;
