import * as stylex from "@stylexjs/stylex";
import { useFixtureInput } from "react-cosmos/client";

import { Grid } from "view/components/layout";

import { Halo, HaloProvider } from "./index";

export default () => {
	const [gradient] = useFixtureInput("gradient", {
		size: "24rem",
		halo: "rgb(120, 120, 120)",
	});
	const [lineSize] = useFixtureInput("lineSize", "1px");
	const [sides] = useFixtureInput("sides", {
		top: true,
		right: true,
		bottom: true,
		left: true
	});
	const [itemGradient] = useFixtureInput("itemGradient", {
		size: "",
		halo: ""
	});
	const [staticForMobile] = useFixtureInput("staticForMobile", true);

	return (
		<HaloProvider staticForMobile={staticForMobile} gradient={gradient}>
			<div {...stylex.props(styles.center, styles.fullHeight)}>
				<div style={{ width: '80%' }}>
					<div {...stylex.props(styles.center, styles.box)} style={{ width: '100%' }}>
						<Halo
							lineSize={lineSize}
							size={itemGradient.size || undefined}
							halo={itemGradient.halo || undefined}
						>
							<div {...stylex.props(styles.center, styles.box)}>
								<div {...stylex.props(styles.center, styles.item)}>
									Single Halo
								</div>
							</div>
						</Halo>
					</div>

					<Grid gutter={20} minWidth={"50%"} maxWidth={"2fr"}>
						{["Left", "Right", "Bottom", "Top"].map(
							(position) => (
								<Halo
									key={position}
									lineSize={lineSize}
									sides={{
										[position.toLowerCase()]: true
									}}
									size={itemGradient.size || undefined}
									halo={itemGradient.halo || undefined}
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
			</div>
		</HaloProvider>
	);
};

const styles = stylex.create({
	fullHeight: {
		height: "100vh"
	},
	center: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
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
