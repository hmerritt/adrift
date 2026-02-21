import * as stylex from "@stylexjs/stylex";
import { type ReactNode } from "react";
import { useFixtureInput } from "react-cosmos/client";

import { Grid } from "view/components/layout";

import { Halo, HaloProvider } from "./index";

type HaloSide = "top" | "right" | "bottom" | "left";
type HaloSides = Partial<Record<HaloSide, boolean>>;
type HaloGradientInput = {
	size: string;
	halo: string;
};

type ExampleCardProps = {
	title: string;
	description: string;
	children: ReactNode;
};

type HaloFixtureProviderProps = {
	children: ReactNode;
	gradient?: {
		size?: string;
		halo?: string;
	};
	staticForMobile?: boolean;
};

const toOptionalGradient = (value: HaloGradientInput) => {
	const gradient: { size?: string; halo?: string } = {};
	const normalizedSize = value.size.trim();
	const normalizedHalo = value.halo.trim();

	if (normalizedSize) gradient.size = normalizedSize;
	if (normalizedHalo) gradient.halo = normalizedHalo;

	return gradient;
};

const FixtureScreen = ({ children }: { children: ReactNode }) => (
	<div {...stylex.props(styles.screen)}>
		<div {...stylex.props(styles.content)}>{children}</div>
	</div>
);

const HaloFixtureProvider = ({
	children,
	gradient,
	staticForMobile = false
}: HaloFixtureProviderProps) => (
	<HaloProvider gradient={gradient} staticForMobile={staticForMobile}>
		{children}
	</HaloProvider>
);

const ExampleCard = ({ title, description, children }: ExampleCardProps) => (
	<section {...stylex.props(styles.card)}>
		<header {...stylex.props(styles.cardHeader)}>
			<strong {...stylex.props(styles.cardTitle)}>{title}</strong>
			<small {...stylex.props(styles.cardDescription)}>{description}</small>
		</header>
		<div {...stylex.props(styles.demoArea)}>{children}</div>
	</section>
);

const HaloDemoItem = ({
	label,
	detail,
	className,
	style
}: {
	label: string;
	detail: string;
	className?: string;
	style?: React.CSSProperties;
}) => (
	<div className={className} style={style}>
		<div {...stylex.props(styles.demoItem)}>
			<strong {...stylex.props(styles.demoLabel)}>{label}</strong>
			<small {...stylex.props(styles.demoDetail)}>{detail}</small>
		</div>
	</div>
);

const Playground = () => {
	const [providerGradient] = useFixtureInput<HaloGradientInput>("providerGradient", {
		size: "24rem",
		halo: "rgb(120, 120, 120)"
	});
	const [lineSize] = useFixtureInput("lineSize", "1px");
	const [sides] = useFixtureInput<HaloSides>("sides", {
		top: true,
		right: true,
		bottom: true,
		left: true
	});
	const [itemGradient] = useFixtureInput<HaloGradientInput>("itemGradient", {
		size: "",
		halo: ""
	});
	const [staticForMobile] = useFixtureInput("staticForMobile", false);

	const providerGradientProps = toOptionalGradient(providerGradient);
	const itemGradientProps = toOptionalGradient(itemGradient);

	return (
		<HaloFixtureProvider
			staticForMobile={staticForMobile}
			gradient={providerGradientProps}
		>
			<FixtureScreen>
				<ExampleCard
					title="Playground"
					description="Interactive control for provider/item gradient, sides, and lineSize."
				>
					<Halo
						lineSize={lineSize}
						sides={sides}
						size={itemGradientProps.size}
						halo={itemGradientProps.halo}
						borderRadius="10px"
					>
						<HaloDemoItem
							label="Interactive Halo"
							detail="lineSize + sides + size + halo + provider gradient"
						/>
					</Halo>
				</ExampleCard>
			</FixtureScreen>
		</HaloFixtureProvider>
	);
};

const sideExamples: Array<{ label: string; sides?: HaloSides }> = [
	{ label: "All Sides (default)" },
	{ label: "Top", sides: { top: true } },
	{ label: "Right", sides: { right: true } },
	{ label: "Bottom", sides: { bottom: true } },
	{ label: "Left", sides: { left: true } }
];

const Sides = () => {
	const [lineSize] = useFixtureInput("lineSize", "3px");

	return (
		<HaloFixtureProvider>
			<FixtureScreen>
				<ExampleCard
					title="Sides"
					description="Each halo enables a different `sides` shape."
				>
					<Grid gutter={12} minWidth="180px" maxWidth="1fr">
						{sideExamples.map((side) => (
							<div key={side.label} {...stylex.props(styles.gridCell)}>
								<Halo
									lineSize={lineSize}
									sides={side.sides}
									borderRadius="10px"
								>
									<HaloDemoItem
										label={side.label}
										detail={`lineSize: ${lineSize}`}
									/>
								</Halo>
							</div>
						))}
					</Grid>
				</ExampleCard>
			</FixtureScreen>
		</HaloFixtureProvider>
	);
};

const ProviderGradient = () => {
	const [providerGradient] = useFixtureInput<HaloGradientInput>("providerGradient", {
		size: "32rem",
		halo: "rgb(33, 173, 255)"
	});
	const [overrideGradient] = useFixtureInput<HaloGradientInput>("overrideGradient", {
		size: "15rem",
		halo: "rgb(255, 113, 146)"
	});

	const providerGradientProps = toOptionalGradient(providerGradient);
	const overrideGradientProps = toOptionalGradient(overrideGradient);

	return (
		<HaloFixtureProvider gradient={providerGradientProps}>
			<FixtureScreen>
				<ExampleCard
					title="Provider Gradient"
					description="Left card uses provider fallback. Right card overrides with Halo size/halo."
				>
					<Grid gutter={12} minWidth="220px" maxWidth="1fr">
						<Halo>
							<HaloDemoItem
								label="Provider Fallback"
								detail={`size ${providerGradientProps.size ?? "24rem"} / halo ${providerGradientProps.halo ?? "rgb(120, 120, 120)"}`}
							/>
						</Halo>
						<Halo
							size={overrideGradientProps.size}
							halo={overrideGradientProps.halo}
						>
							<HaloDemoItem
								label="Halo Override"
								detail={`size ${overrideGradientProps.size ?? "(unset)"} / halo ${overrideGradientProps.halo ?? "(unset)"}`}
							/>
						</Halo>
					</Grid>
				</ExampleCard>
			</FixtureScreen>
		</HaloFixtureProvider>
	);
};

export default {
	Playground,
	Sides,
	ProviderGradient
};

const styles = stylex.create({
	screen: {
		alignItems: "center",
		backgroundColor: "rgb(10, 12, 16)",
		display: "flex",
		justifyContent: "center",
		minHeight: "100vh",
		padding: "1.5rem",
		width: "100%"
	},
	content: {
		display: "flex",
		flexDirection: "column",
		gap: "1.25rem",
		maxWidth: "1200px",
		width: "100%"
	},
	// halo: {
	// 	borderRadius: "10px",
	// 	overflow: "hidden"
	// },
	card: {
		backgroundColor: "rgba(255, 255, 255, 0.04)",
		borderRadius: "16px",
		display: "flex",
		flexDirection: "column",
		gap: "1.1rem",
		outlineColor: "rgba(255, 255, 255, 0.09)",
		outlineStyle: "solid",
		outlineWidth: "1px",
		padding: "1.2rem"
	},
	cardHeader: {
		display: "flex",
		flexDirection: "column",
		gap: "0.35rem"
	},
	cardTitle: {
		color: "rgb(242, 242, 246)",
		fontFamily: "monospace",
		fontSize: "1.75rem",
		letterSpacing: "0.02em"
	},
	cardDescription: {
		color: "rgba(240, 240, 245, 0.76)",
		fontFamily: "monospace",
		fontSize: "1.35rem",
		lineHeight: 1.4
	},
	demoArea: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem"
	},
	gridCell: {
		display: "flex",
		minHeight: "150px"
	},
	demoItem: {
		alignItems: "center",
		backgroundColor: "rgb(12, 13, 17)",
		display: "flex",
		flexDirection: "column",
		gap: "0.55rem",
		height: "150px",
		justifyContent: "center",
		paddingInline: "1rem",
		width: "100%"
		// borderRadius: "10px"
	},
	demoLabel: {
		color: "rgb(245, 246, 250)",
		fontFamily: "monospace",
		fontSize: "1.6rem",
		letterSpacing: "0.01em",
		textAlign: "center"
	},
	demoDetail: {
		color: "rgba(227, 230, 241, 0.72)",
		fontFamily: "monospace",
		fontSize: "1.25rem",
		lineHeight: 1.4,
		textAlign: "center"
	}
});
