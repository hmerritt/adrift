import { useDispatch, useSelector } from "react-redux";

import { countIncrement } from "store/actions";
import { useDebouncedCallback, useInterval } from "hooks";

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
			<div className="flex-center" style={{ height: "100vh" }}>
				<h1 style={{ fontSize: "3rem", textAlign: "center" }}>
					{count}
					<br />
					<br />
					<small>useInterval 100ms</small>
					<br />
					<small>useDebouncedCallback 1000ms</small>
				</h1>
			</div>
		</div>
	);
};