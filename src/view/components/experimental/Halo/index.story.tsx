import * as stylex from "@stylexjs/stylex";
import { useFixtureInput } from "react-cosmos/client";

import { mixins } from "lib/styles/mixins.stylex";
import { Grid } from "view/components/layout";

import { Halo, HaloProvider, HaloSide } from "./index";

export default () => {
	const [gradient] = useFixtureInput("gradient", {
		size: "24rem",
		halo: "rgb(120, 120, 120)",
		background: "rgb(0, 0, 0)"
	});
	const [haloProps] = useFixtureInput("haloProps", {
		sides: ["top", "right", "bottom", "left"] as HaloSide[],
		size: "24rem",
		halo: "rgb(120, 120, 120)",
		background: "rgb(0, 0, 0)"
	});
	const [staticForMobile] = useFixtureInput("staticForMobile", true);

	return (
		<HaloProvider staticForMobile={staticForMobile} gradient={gradient}>
			<div
				{...stylex.props(
					styles.center,
					styles.fullHeight,
					styles.canvas,
					mixins.container("800px")
				)}
			>
				<div {...stylex.props(styles.headerHalo)}>
					<Halo sides={["bottom"]}>
						<div {...stylex.props(styles.headerItem)}>Header Bottom Halo</div>
					</Halo>
				</div>
				<div {...stylex.props(styles.roundedHalo)}>
					<Halo sides={["top", "right"]} sx={styles.roundedHaloFrame}>
						<div {...stylex.props(styles.roundedHaloItem)}>
							Rounded Top + Right (continuous corner)
						</div>
					</Halo>
				</div>
				<Grid gutter={20} minWidth={"50%"} maxWidth={"2fr"}>
					{["Top Left", "Top Right", "Bottom Left", "Bottom Right"].map(
						(position, index) => (
							<Halo
								key={position}
								size={index === 0 ? haloProps.size : undefined}
								halo={index === 0 ? haloProps.halo : undefined}
								background={index === 0 ? haloProps.background : undefined}
							>
								<div {...stylex.props(styles.center, styles.box)}>
									<div {...stylex.props(styles.center, styles.item)}>
										{position}
									</div>
								</div>
							</Halo>
						)
					)}
				</Grid>
			</div>
		</HaloProvider>
	);
};

const styles = stylex.create({
	fullHeight: {
		height: "100vh"
	},
	canvas: {
		flexDirection: "column",
		gap: "2rem"
	},
	center: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	headerHalo: {
		width: "min(900px, 96vw)",
		marginBottom: "2rem"
	},
	headerItem: {
		fontSize: 20,
		fontWeight: 600,
		paddingBlock: "18px",
		paddingInline: "20px",
	},
	roundedHalo: {
		width: "min(900px, 96vw)"
	},
	roundedHaloFrame: {
		borderRadius: "28px",
		overflow: "hidden"
	},
	roundedHaloItem: {
		borderRadius: "27px",
		paddingBlock: "20px",
		paddingInline: "24px",
		fontSize: 18
	},
	box: {
		position: "relative",
		display: "flex",
		width: 250,
		height: 250
	},
	item: {
		position: "relative",
		fontSize: 28,
		paddingBlock: "20px",
		paddingInline: "40px",
		borderWidth: 0,
		height: 150
	}
});
