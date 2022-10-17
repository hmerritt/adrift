import { css } from "@linaria/core";

import { feature } from "utils";
import theme from "../../styles";
import { countIncrement } from "store/actions";
import { useDispatch, useSelector, useInterval } from "hooks";

import Icon from "components/common/Icon";
import { Stack } from "components/common/layout";

export const Home = () => {
	const dispatch = useDispatch();
	const count = useSelector((state) => state.count.current);

	if (feature("myExperimentalFeature", { alwaysShowOnDev: false })) {
		debug("super secret feature");
	}

	useInterval(() => {
		dispatch(countIncrement(0.1));
	}, 1000);

	return (
		<div className="Home">
			<Stack spacing={5} center style={{ height: "100vh" }}>
				<h1 className={header}>{count}</h1>
				<h1 style={{ fontSize: "3rem", textAlign: "center" }}>
					<small>useInterval 1000ms</small>
				</h1>
				<Icon name="spinner" />
			</Stack>
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
