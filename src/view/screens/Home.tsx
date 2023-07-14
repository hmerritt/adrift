import { useState } from "react";
import { css, cx } from "@linaria/core";

import theme from "lib/styles";
import { countIncrement } from "state/actions";
import { useDispatch, useSelector, useInterval } from "lib/hooks";

import { GridDnd, Icon, Noise, Stack, Waves } from "view/components";

export const Home = () => {
	const dispatch = useDispatch();
	const count = useSelector((state) => state.count.current);

	const [data, setData] = useState([...Array(8)].map((e, i) => ({ id: String(i) })));

	useInterval(() => {
		if (feature("timerIncrement")) {
			dispatch(countIncrement(0.1));
		}
	}, 1000);

	return (
		<div className={background}>
			<h1 className={header}>Adrift</h1>
			{/* <Stack spacing={5} center style={{ height: "40vh" }}>
				<h2 style={{ fontSize: "3rem", textAlign: "center" }}>
					<small>useInterval 1000ms</small>
				</h2>
				<Icon name="spinner" />
			</Stack> */}

			<Waves />

			<Noise />

			<GridDnd
				data={data}
				setData={setData}
				renderWith={({ id, renderIndex, ...props }) => (
					<div className={cx(card, "flex-center")} {...props}>
						{`${renderIndex} -> ${id}`}
					</div>
				)}
				// grid
				className={grid}
				minWidth={40}
				maxWidth={40}
				gutter={10}
				center
			/>
		</div>
	);
};

const background = css`
	background-size: cover;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	/* background-image: url("https://images.unsplash.com/photo-1604076913837-52ab5629fba9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"); */
`;

// This will get compiled at build time into a css file.
// Why? - Performance is *greatly* improved over something like styled-components which compiles at run time!
const header = css`
	${theme} // Import theme object - can now use all SCSS variables and mixins set in styles/theme.ts
	text-transform: lowercase;
	font-style: italic;
	font-size: 10rem;
	max-width: 10ch;
	font-weight: thin;
	text-align: center;
	color: $blue-100;
	@include textShadowBlock($blue-400);
`;

const grid = css`
	${theme}
	margin: auto;
	margin-top: 50rem;
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
