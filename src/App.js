import { useState } from "react";
import { useInterval } from "hooks/useInterval";

function App() {
	const [count, setCount] = useState("0");

	useInterval(() => {
		setCount((parseFloat(count) + parseFloat(0.1)).toFixed(2));
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
