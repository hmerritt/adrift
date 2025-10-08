import { useFixtureInput } from "react-cosmos/client";

import { DotGrid } from "./index";

export default () => {
	const [reactToWindowResize] = useFixtureInput("reactToWindowResize", true);

	const [spacing] = useFixtureInput("spacing", 40);
	const [damping] = useFixtureInput("damping", 0.5);
	const [returnSpeed] = useFixtureInput("returnSpeed", 0.18);
	const [attractionBase] = useFixtureInput("attractionBase", 1.025);
	const [maxAttraction] = useFixtureInput("maxAttraction", 0.8);

	return (
		<DotGrid
			position="fixed"
			refForMousePosition="window"
			reactToWindowResize={reactToWindowResize}
			spacing={spacing}
			damping={damping}
			returnSpeed={returnSpeed}
			attractionBase={attractionBase}
			maxAttraction={maxAttraction}
		/>
	);
};
