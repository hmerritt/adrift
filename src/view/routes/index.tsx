import * as stylex from "@stylexjs/stylex";
import { createFileRoute } from "@tanstack/react-router";

import { colors } from "lib/styles/colors.stylex";
import { shadowFn } from "lib/styles/shadows.stylex";

import { DotGrid, FrostedGlass, Stack, Waves } from "view/components";

export const Route = createFileRoute("/")({
	component: IndexRoute
});

export function IndexRoute() {
	return (
		<>
			<Stack spacing={15}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						position: "relative",
						height: "70vh",
						padding: "1rem 2rem",
						zIndex: 1
					}}
				>
					<FrostedGlass>
						<div
							{...stylex.props(
								styles.pictureFrame,
								shadowFn.boxBlock(colors.primary)
							)}
						>
							<h1
								{...stylex.props(
									styles.header,
									shadowFn.textBlock(colors.primary)
								)}
							>
								Adrift
							</h1>
							<FrostedGlass>
								<h4 {...stylex.props(styles.subtitle)}>
									Template react app with batteries included 🔋
								</h4>
							</FrostedGlass>
							<Waves />
						</div>
					</FrostedGlass>
				</div>
			</Stack>

			<DotGrid
				position="fixed"
				refForMousePosition="window"
				reactToWindowResize
				spacing={40}
				damping={0.5}
				returnSpeed={0.18}
				attractionBase={1.025}
				maxAttraction={0.8}
			/>
		</>
	);
}

const styles = stylex.create({
	header: {
		color: "#bee3f8",
		fontSize: "10rem",
		fontStyle: "italic",
		fontWeight: "bold",
		textTransform: "lowercase"
	},
	pictureFrame: {
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
		height: "350px",
		justifyContent: "center",
		margin: "auto",
		overflow: "hidden",
		position: "relative",
		width: "700px"
	},
	subtitle: {
		fontSize: "1.5rem",
		fontStyle: "italic",
		opacity: 0.8,
		padding: "1rem"
	}
});
