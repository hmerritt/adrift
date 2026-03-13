import * as stylex from "@stylexjs/stylex";
import { useFixtureInput } from "react-cosmos/client";

import { Icon } from "view/components/Icon";

import { ActionFeedbackProvider, triggerActionFeedback } from "./index";

type FeedbackChipProps = {
	label: string;
	accent?: boolean;
};

const normalizeNumber = (value: unknown, fallback: number, min = 1): number => {
	const numberValue =
		typeof value === "number" ? value : Number.parseFloat(String(value));
	if (!Number.isFinite(numberValue)) return fallback;
	return Math.max(min, Math.floor(numberValue));
};

const FeedbackChip = ({ label, accent = false }: FeedbackChipProps) => (
	<div {...stylex.props(styles.chip, accent && styles.chipAccent)}>
		<strong {...stylex.props(styles.chipLabel)}>{label}</strong>
	</div>
);

const Playground = () => {
	const [duration] = useFixtureInput("duration", 900);
	const [label] = useFixtureInput("label", "Saved");
	const [background] = useFixtureInput("background", "rgb(17, 17, 20)");
	const [stepDelay] = useFixtureInput("stepDelay", 80);

	const normalizedDuration = normalizeNumber(duration, 900);
	const normalizedStepDelay = normalizeNumber(stepDelay, 80, 0);

	return (
		<ActionFeedbackProvider>
			<div {...stylex.props(styles.screen(background))}>
				<section {...stylex.props(styles.card)}>
					<h2 {...stylex.props(styles.title)}>ActionFeedback Playground</h2>
					<p {...stylex.props(styles.subtitle)}>
						Move the cursor and click trigger to preview feedback near the
						pointer.
					</p>
					<button
						{...stylex.props(styles.button)}
						type="button"
						onClick={() => {
							triggerActionFeedback({
								duration: normalizedDuration,
								element: <FeedbackChip label={label} />
							});
						}}
					>
						Trigger feedback
					</button>

					<button
						{...stylex.props(styles.button)}
						type="button"
						onClick={() => {
							triggerActionFeedback({
								duration: normalizedDuration,
								cursorOffset: 20,
								element: (
									<Icon
										name="Spinner"
										color="white"
										sx={styles.iconSize}
									/>
								)
							});
						}}
					>
						Trigger loading spinner
					</button>

					<button
						{...stylex.props(styles.button)}
						type="button"
						onClick={() => {
							["Queued 1", "Queued 2", "Queued 3"].forEach((msg, index) => {
								window.setTimeout(() => {
									triggerActionFeedback({
										duration: normalizedDuration,
										element: <FeedbackChip label={msg} accent />
									});
								}, index * normalizedStepDelay);
							});
						}}
					>
						Trigger burst
					</button>
				</section>
			</div>
		</ActionFeedbackProvider>
	);
};

export default {
	Playground
};

const styles = stylex.create({
	screen: (backgroundColor: string) => ({
		alignItems: "center",
		backgroundColor,
		display: "flex",
		height: "100vh",
		justifyContent: "center",
		paddingInline: "1rem",
		width: "100%"
	}),
	card: {
		backgroundColor: "rgba(255, 255, 255, 0.05)",
		borderRadius: "16px",
		display: "flex",
		flexDirection: "column",
		gap: "0.9rem",
		maxWidth: "420px",
		outlineColor: "rgba(255, 255, 255, 0.09)",
		outlineStyle: "solid",
		outlineWidth: "1px",
		padding: "1.1rem",
		width: "100%"
	},
	title: {
		color: "rgb(246, 247, 252)",
		fontFamily: "monospace",
		fontSize: "1.4rem",
		fontWeight: 700,
		lineHeight: 1,
		margin: 0
	},
	subtitle: {
		color: "rgba(235, 237, 244, 0.78)",
		fontFamily: "monospace",
		fontSize: "1rem",
		lineHeight: 1.5,
		margin: 0
	},
	button: {
		backgroundColor: "rgb(241, 244, 251)",
		borderRadius: "10px",
		borderWidth: 0,
		color: "rgb(12, 14, 20)",
		cursor: "pointer",
		fontFamily: "monospace",
		fontSize: "0.85rem",
		fontWeight: 700,
		paddingBlock: "0.6rem",
		paddingInline: "0.9rem"
	},
	chip: {
		backgroundColor: "rgba(20, 27, 38, 0.94)",
		borderRadius: "999px",
		outlineColor: "rgba(173, 209, 255, 0.45)",
		outlineStyle: "solid",
		outlineWidth: "1px",
		paddingBlock: "0.45rem",
		paddingInline: "0.8rem"
	},
	chipAccent: {
		backgroundColor: "rgba(23, 36, 21, 0.94)",
		outlineColor: "rgba(154, 238, 130, 0.5)"
	},
	chipLabel: {
		color: "rgb(245, 249, 255)",
		fontFamily: "monospace",
		fontSize: "1rem",
		lineHeight: 1
	},
	iconSize: {
		width: "1.5rem",
		height: "1.5rem"
	}
});
