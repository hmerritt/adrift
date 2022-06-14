import { countIncrement } from "store/actions";
import {
	useDispatch,
	useSelector,
	useDebouncedCallback,
	useInterval
} from "hooks";

import Icon from "components/common/Icon";
import { Flex, Stack } from "components/common/layout";

import { css } from "@linaria/core";

// Write your styles in `css` tag
const header = css`
	text-transform: uppercase;
	font-size: 8rem;
	font-weight: thin;
	color: pink;
	text-align: center;
	// @include user-select(none);

	@for $i from 1 through 20 {
		.stack.stack-#{$i} {
			& > * {
				margin-top: #{$i}rem;
			}
		}
	}
`;

export const Home = () => {
	const dispatch = useDispatch();
	const count = useSelector((state) => state.count.current);

	// Debounce callback
	const debounce = useDebouncedCallback(
		() => dispatch(countIncrement(0.1)),
		1000,
		{ maxWait: 1000 }
	);

	useInterval(() => {
		debounce();
	}, 100);

	return (
		<div className="Home">
			<Flex spacing={5} center style={{ height: "100vh" }}>
				<h1
					className={header}
					// style={{ fontSize: "3rem", textAlign: "center" }}
				>
					{count}
				</h1>
				<h1 style={{ fontSize: "3rem", textAlign: "center" }}>
					<small>useInterval 100ms</small>
					<br />
					<small>useDebouncedCallback 1000ms</small>
				</h1>
				<p>hello</p>
				<Icon name="spinner" />
			</Flex>
		</div>
	);
};
