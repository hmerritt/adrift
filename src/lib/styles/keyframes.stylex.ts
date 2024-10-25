import * as stylex from "@stylexjs/stylex";

const backgroundSweep = stylex.keyframes({
	"0%": { backgroundPosition: "0% 50%" },
	"50%": { backgroundPosition: "100% 50%" },
	"100%": { backgroundPosition: "0% 50%" }
});

const dash = stylex.keyframes({
	"0%": { strokeDashoffset: "187" },
	"50%": { strokeDashoffset: "46.75", transform: "rotate(135deg)" },
	"100%": { strokeDashoffset: "187", transform: "rotate(450deg)" }
});

const rotator = stylex.keyframes({
	"0%": { transform: "rotate(0deg)" },
	"100%": { transform: "rotate(270deg)" }
});

const spin = stylex.keyframes({
	"0%": { transform: "rotate(0deg)" },
	"100%": { transform: "rotate(360deg)" }
});

export const keyframes = stylex.defineVars({
	backgroundSweep,
	dash,
	rotator,
	spin
});
