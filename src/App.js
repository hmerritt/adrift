import { useState } from "react";
import { useInterval } from "hooks/useInterval";
import { useDispatch, useSelector } from "react-redux";

import { countIncrement } from "store/actions";

function App() {
	const dispatch = useDispatch();
	const count = useSelector((state) => state.count.count);

	useInterval(() => {
		dispatch(countIncrement(0.1));
	}, 100);

	return (
		<div className="App">
			<div className="flex-center" style={{ height: "100vh" }}>
				<h1 style={{ fontSize: "3rem", textAlign: "center" }}>
					{count}
					<br />
					<small>useInterval 100ms</small>
				</h1>
			</div>
		</div>
	);
}

export default App;
