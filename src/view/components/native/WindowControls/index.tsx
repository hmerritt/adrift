import * as stylex from "@stylexjs/stylex";
import { FC } from "react";

import { Ripple } from "view/components/experimental";

import { WindowIcon } from "./icons";

export type WindowControlsProps = {
	type?: "default" | "mac";
	onClose?: () => void;
	onMinimize?: () => void;
	onMaximize?: () => void;
};

/**
 * Controls to handle window minimisation, maximisation and closing.
 *
 * Used for frameless windows.
 */
export const WindowControls: FC<WindowControlsProps> = ({
	onClose,
	onMinimize,
	onMaximize
}) => {
	return (
		// @TODO Icons - separate icons for mac and windows?
		<div {...stylex.props(styles.controls)}>
			{onClose && (
				<Ripple
					sx={[styles.controlMac, styles.controlMacClose]}
					onClick={onClose}
				>
					<WindowIcon name="MacClose" sx={styles.controlMacSvg} />
				</Ripple>
			)}
			{onMinimize && (
				<Ripple
					sx={[styles.controlMac, styles.controlMacMinimize]}
					onClick={onMinimize}
				>
					<WindowIcon name="MacMinimize" sx={styles.controlMacSvg} />
				</Ripple>
			)}
			{onMaximize && (
				<Ripple
					sx={[styles.controlMac, styles.controlMacMaximize]}
					onClick={onMaximize}
				>
					<WindowIcon name="MacMaximize" sx={styles.controlMacSvg} />
				</Ripple>
			)}
		</div>
	);
};

const styles = stylex.create({
	controls: {
		position: "relative",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: "1rem",
		// eslint-disable-next-line @stylexjs/valid-styles
		"--runtime-draggable": "drag"
	},
	controlMac: {
		cursor: "pointer",
		width: "1.4rem",
		height: "1.4rem",
		borderRadius: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	controlMacSvg: {
		opacity: {
			default: 0,
			":hover": 1
		},
		width: "1.1rem",
		height: "1.1rem",
		transition: "opacity 150ms ease-in-out"
	},
	controlMacClose: {
		backgroundColor: "#fc5753",
		borderWidth: "0.1rem",
		borderStyle: "solid",
		borderColor: "#df4744"
	},
	controlMacMinimize: {
		backgroundColor: "#fdbc40",
		borderWidth: "0.1rem",
		borderStyle: "solid",
		borderColor: "#de9f34"
	},
	controlMacMaximize: {
		backgroundColor: "#33c748",
		borderWidth: "0.1rem",
		borderStyle: "solid",
		borderColor: "#27aa35"
		// This button is sometimes gray ??!!
		// backgroundColor: "#ded8dc",
		// border: "0.1rem solid #cac4c8"
	}
});
