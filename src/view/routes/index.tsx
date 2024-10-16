import * as stylex from "@stylexjs/stylex";
import { createFileRoute } from "@tanstack/react-router";

import { DotGrid, FrostedGlass, Stack, Waves } from "view/components";

export const Route = createFileRoute("/")({
	component: IndexRoute
});

function IndexRoute() {
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
						<div {...stylex.props(styles.pictureFrame)}>
							<h1 {...stylex.props(styles.header)}>Adrift</h1>
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

			<DotGrid position="fixed" refForMousePosition="window" spacing={40} />
		</>
	);
}

const styles = stylex.create({
	pictureFrame: {
		position: "relative",
		width: "700px",
		height: "350px",
		margin: "auto",
		display: "flex",
		overflow: "hidden",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "center",
		boxShadow: `0.25px 0.25px 0 #4299e1, 0.5px 0.5px 0 #4299e1, 0.75px 0.75px 0 #4299e1,
			1px 1px 0 #4299e1, 1.25px 1.25px 0 #4299e1, 1.5px 1.5px 0 #4299e1,
			1.75px 1.75px 0 #4299e1, 2px 2px 0 #4299e1, 2.25px 2.25px 0 #4299e1,
			2.5px 2.5px 0 #4299e1, 2.75px 2.75px 0 #4299e1, 3px 3px 0 #4299e1,
			3.25px 3.25px 0 #4299e1, 3.5px 3.5px 0 #4299e1, 3.75px 3.75px 0 #4299e1,
			4px 4px 0 #4299e1, 4.25px 4.25px 0 #4299e1, 4.5px 4.5px 0 #4299e1, 4.75px 4.75px 0 #4299e1,
			5px 5px 0 #4299e1, 5.25px 5.25px 0 #4299e1, 5.5px 5.5px 0 #4299e1, 5.75px 5.75px 0 #4299e1,
			6px 6px 0 #4299e1`
	},
	header: {
		textTransform: "lowercase",
		fontStyle: "italic",
		fontSize: "10rem",
		fontWeight: "thin",
		color: "#bee3f8",
		textShadow: `0.25px 0.25px 0 #4299e1, 0.5px 0.5px 0 #4299e1, 0.75px 0.75px 0 #4299e1,
			1px 1px 0 #4299e1, 1.25px 1.25px 0 #4299e1, 1.5px 1.5px 0 #4299e1,
			1.75px 1.75px 0 #4299e1, 2px 2px 0 #4299e1, 2.25px 2.25px 0 #4299e1,
			2.5px 2.5px 0 #4299e1, 2.75px 2.75px 0 #4299e1, 3px 3px 0 #4299e1,
			3.25px 3.25px 0 #4299e1, 3.5px 3.5px 0 #4299e1, 3.75px 3.75px 0 #4299e1,
			4px 4px 0 #4299e1, 4.25px 4.25px 0 #4299e1, 4.5px 4.5px 0 #4299e1, 4.75px 4.75px 0 #4299e1,
			5px 5px 0 #4299e1, 5.25px 5.25px 0 #4299e1, 5.5px 5.5px 0 #4299e1, 5.75px 5.75px 0 #4299e1,
			6px 6px 0 #4299e1`
	},
	subtitle: {
		opacity: 0.8,
		padding: "1rem",
		fontSize: "1.5rem",
		fontStyle: "italic"
	}
});
