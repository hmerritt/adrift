import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { useFixtureInput } from "react-cosmos/client";

import { SplitScreen, useSplitScreenHandle } from "./index";

const BIG_BUCK_BUNNY_URL =
	"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const DemoPane = ({
	paneId,
	title,
	accent
}: {
	paneId: string;
	title: string;
	accent: string;
}) => {
	const [count, setCount] = useState(0);
	const [value, setValue] = useState("");
	const handleProps = useSplitScreenHandle(paneId);

	return (
		<div {...stylex.props(styles.demoPane, styles.demoPaneAccent(accent))}>
			<div {...stylex.props(styles.demoHeader)}>
				<strong {...stylex.props(styles.demoTitle)}>{title}</strong>
				<button
					{...handleProps}
					{...stylex.props(styles.handleButton)}
					type="button"
				>
					Move
				</button>
				<button
					{...stylex.props(styles.countButton)}
					onClick={() => setCount((current) => current + 1)}
					type="button"
				>
					Count {count}
				</button>
			</div>
			<input
				{...stylex.props(styles.input)}
				placeholder="Type to test state persistence"
				value={value}
				onChange={(evt) => setValue(evt.currentTarget.value)}
			/>
			<small {...stylex.props(styles.helper)}>
				Drag the pane handle and switch layouts. Local state should stay intact
				when preserved.
			</small>
		</div>
	);
};

const VideoPane = ({ paneId, title }: { paneId: string; title: string }) => {
	const handleProps = useSplitScreenHandle(paneId);

	return (
		<div {...stylex.props(styles.videoPane)}>
			<div {...stylex.props(styles.demoHeader)}>
				<strong {...stylex.props(styles.demoTitle)}>{title}</strong>
				<button
					{...handleProps}
					{...stylex.props(styles.handleButton)}
					type="button"
				>
					Move
				</button>
			</div>
			<video
				{...stylex.props(styles.video)}
				controls
				playsInline
				preload="metadata"
				src={BIG_BUCK_BUNNY_URL}
			/>
		</div>
	);
};

const Playground = () => {
	const [hiddenPaneBehavior] = useFixtureInput<"preserve" | "unmount">(
		"hiddenPaneBehavior",
		"preserve"
	);
	const [showModeControls] = useFixtureInput("showModeControls", true);
	const [minPaneSizePx] = useFixtureInput("minPaneSizePx", 120);

	return (
		<div {...stylex.props(styles.screen)}>
			<div {...stylex.props(styles.frame)}>
				<SplitScreen
					defaultMode="quad"
					hiddenPaneBehavior={hiddenPaneBehavior}
					minPaneSizePx={minPaneSizePx}
					showModeControls={showModeControls}
					sx={styles.frame}
					panes={[
						{
							id: "alpha",
							label: "Alpha",
							node: (
								<DemoPane
									paneId="alpha"
									title="Alpha"
									accent="rgb(86, 169, 255)"
								/>
							)
						},
						{
							id: "beta",
							label: "Beta",
							node: (
								<DemoPane
									paneId="beta"
									title="Beta"
									accent="rgb(255, 144, 120)"
								/>
							)
						},
						{
							id: "gamma",
							label: "Gamma",
							node: (
								<DemoPane
									paneId="gamma"
									title="Gamma"
									accent="rgb(112, 223, 160)"
								/>
							)
						},
						{
							id: "delta",
							label: "Delta",
							node: <VideoPane paneId="delta" title="Delta Video" />
						}
					]}
				/>
			</div>
		</div>
	);
};

export default {
	Playground
};

const styles = stylex.create({
	screen: {
		alignItems: "center",
		backgroundColor: "rgb(6, 8, 12)",
		backgroundImage:
			"radial-gradient(circle at 20% 10%, rgba(62, 75, 110, 0.45), transparent 45%)",
		display: "flex",
		justifyContent: "center",
		minHeight: "100vh",
		padding: "20px"
	},
	frame: {
		maxWidth: "1200px",
		width: "100%",
		height: "800px"
	},
	demoPane: {
		backgroundColor: "rgba(255, 255, 255, 0.02)",
		borderRadius: "10px",
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		height: "100%",
		minHeight: "220px",
		padding: "10px"
	},
	videoPane: {
		backgroundColor: "rgba(255, 255, 255, 0.02)",
		borderRadius: "10px",
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		height: "100%",
		minHeight: "120px",
		padding: "10px"
	},
	demoPaneAccent: (accent: string) => ({
		boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${accent} 35%, transparent)`
	}),
	demoHeader: {
		alignItems: "center",
		display: "flex",
		justifyContent: "space-between",
		gap: "10px"
	},
	demoTitle: {
		color: "rgb(241, 245, 252)",
		fontFamily: "monospace"
	},
	countButton: {
		backgroundColor: "rgba(255, 255, 255, 0.06)",
		borderColor: "rgba(255, 255, 255, 0.15)",
		borderRadius: "8px",
		borderStyle: "solid",
		borderWidth: "1px",
		color: "rgb(229, 235, 244)",
		cursor: "pointer",
		fontFamily: "monospace",
		fontSize: "0.75rem",
		paddingBlock: "6px",
		paddingInline: "10px"
	},
	handleButton: {
		backgroundColor: "rgba(255, 255, 255, 0.06)",
		borderColor: "rgba(255, 255, 255, 0.15)",
		borderRadius: "8px",
		borderStyle: "solid",
		borderWidth: "1px",
		color: "rgb(229, 235, 244)",
		cursor: "grab",
		fontFamily: "monospace",
		fontSize: "0.75rem",
		paddingBlock: "6px",
		paddingInline: "10px"
	},
	input: {
		backgroundColor: "rgba(255, 255, 255, 0.04)",
		borderColor: "rgba(255, 255, 255, 0.12)",
		borderRadius: "8px",
		borderStyle: "solid",
		borderWidth: "1px",
		color: "rgb(240, 243, 248)",
		fontFamily: "monospace",
		fontSize: "0.8rem",
		outline: "none",
		paddingBlock: "8px",
		paddingInline: "10px"
	},
	video: {
		backgroundColor: "rgb(0, 0, 0)",
		borderRadius: "8px",
		flex: "1 1 auto",
		height: "100%",
		minHeight: "160px",
		objectFit: "cover",
		width: "100%"
	},
	helper: {
		color: "rgba(236, 242, 248, 0.62)",
		fontFamily: "monospace",
		fontSize: "0.72rem",
		lineHeight: 1.4
	}
});
