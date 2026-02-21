import * as stylex from "@stylexjs/stylex";
import { useFixtureInput } from "react-cosmos/client";

import { Loader, type LoaderType } from "./index";

const Playground = () => {
	const [type] = useFixtureInput<LoaderType>("type", "dotgrid");
	const [size] = useFixtureInput("size", 28);
	const [speed] = useFixtureInput("speed", 1);
	const [color] = useFixtureInput("color", "rgb(236, 236, 236)");
	const [background] = useFixtureInput("background", "rgb(17, 17, 20)");

	return (
		<div {...stylex.props(styles.screen)} style={{ background }}>
			<div {...stylex.props(styles.card)}>
				<Loader type={type} size={size} speed={speed} color={color} />
			</div>
		</div>
	);
};

const Presets = () => {
	return (
		<div {...stylex.props(styles.screen, styles.presetsScreen)}>
			<div {...stylex.props(styles.row)}>
				<div {...stylex.props(styles.presetItem)}>
					<Loader
						type="dotgrid"
						size={16}
						speed={0.9}
						color="rgb(245, 245, 245)"
					/>
					<small {...stylex.props(styles.label)}>size 16 / speed 0.9x</small>
				</div>
				<div {...stylex.props(styles.presetItem)}>
					<Loader
						type="dotgrid"
						size={24}
						speed={1.2}
						color="rgb(126, 217, 255)"
					/>
					<small {...stylex.props(styles.label)}>size 24 / speed 1.2x</small>
				</div>
				<div {...stylex.props(styles.presetItem)}>
					<Loader
						type="dotgrid"
						size={36}
						speed={1.6}
						color="rgb(188, 255, 151)"
					/>
					<small {...stylex.props(styles.label)}>size 36 / speed 1.6x</small>
				</div>
			</div>
		</div>
	);
};

export default { Playground, Presets };

const styles = stylex.create({
	screen: {
		alignItems: "center",
		backgroundColor: "rgb(17, 17, 20)",
		display: "flex",
		height: "100vh",
		justifyContent: "center",
		width: "100%"
	},
	card: {
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.04)",
		borderRadius: "14px",
		display: "flex",
		height: "140px",
		justifyContent: "center",
		outlineColor: "rgba(255, 255, 255, 0.08)",
		outlineStyle: "solid",
		outlineWidth: "1px",
		width: "220px"
	},
	presetsScreen: {
		paddingInline: "1rem"
	},
	row: {
		display: "flex",
		flexWrap: "wrap",
		gap: "1rem",
		justifyContent: "center"
	},
	presetItem: {
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.04)",
		borderRadius: "12px",
		display: "flex",
		flexDirection: "column",
		gap: "0.6rem",
		minWidth: "180px",
		outlineColor: "rgba(255, 255, 255, 0.08)",
		outlineStyle: "solid",
		outlineWidth: "1px",
		padding: "1rem"
	},
	label: {
		color: "rgba(255, 255, 255, 0.72)",
		fontFamily: "monospace",
		fontSize: "0.72rem"
	}
});
