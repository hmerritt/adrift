import { useState } from "react";
import { css, cx } from "@linaria/core";

import theme from "lib/styles";
import { countIncrement } from "state/actions";
import { useDispatch, useSelector, useInterval } from "lib/hooks";

import { Flex, Fullscreen, GridDnd, Icon, Noise, Stack, Waves } from "view/components";

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
		<>
			<Fullscreen position="relative" zIndex={1} style={{ height: "50vh" }} center>
				<div className={pictureFrame}>
					<h1 className={header}>Adrift</h1>
					<h4>Template react app with batteries included 🔋</h4>
					<Waves />
				</div>
			</Fullscreen>

			{/* <Stack spacing={5}>
				<h2 className={header}>Features</h2>
			</Stack> */}
			{/* <GridDnd
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
			/> */}
		</>
	);
};

// This will get compiled at build time into a css file.
// Why? - Performance is *greatly* improved over something like styled-components which compiles at run time!
const pictureFrame = css`
	${theme} // Import theme object - can now use all SCSS variables and mixins set in styles/theme.ts
	position: relative;
	width: 700px;
	height: 350px;
	margin: auto;
	display: flex;
	overflow: hidden;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	box-shadow: shadowBlock($blue-400);

	h4 {
		font-style: italic;
		padding: 1rem;
		opacity: 0.8;
		font-size: 1.5rem;
	}
`;

const header = css`
	${theme}
	text-transform: lowercase;
	font-style: italic;
	font-size: 10rem;
	font-weight: thin;
	color: $blue-100;
	text-shadow: shadowBlock($blue-400);
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
