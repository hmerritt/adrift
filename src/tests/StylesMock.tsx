import * as stylex from "@stylexjs/stylex";

/**
 * Mini mock component to test StyleX.
 *
 * Test in `styles/index.test.tsx`.
 */

export const StylesMock = () => (
	<div
		data-testid="StylesMock"
		{...stylex.props(styles.container, styles.shadow, styles.variable)}
	>
		<h1 {...stylex.props(styles.title)}>Title</h1>
		<h2 {...stylex.props(styles.subTitle)}>Sub Title</h2>
	</div>
);

const styles = stylex.create({
	container: {
		maxWidth: "567px"
	},
	shadow: {
		boxShadow: `0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)`
	},
	variable: {
		width: "5678px"
	},
	title: {
		color: "#38a169"
	},
	subTitle: {
		color: "#dd6b20"
	}
});

export default StylesMock;
