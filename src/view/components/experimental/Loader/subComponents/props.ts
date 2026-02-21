import { type SxProp } from "lib/type-assertions";

export type LoaderVariantProps = React.JSX.IntrinsicElements["div"] &
	SxProp & {
		size: number | string;
		durationMs: number;
		color: string;
	};
