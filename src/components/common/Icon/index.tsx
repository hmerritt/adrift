import { Ref, SVGProps } from "react";
import * as Icons from "./subComponents";

const IconMappings = {
	refresh: Icons.Refresh,
	spinner: Icons.Spinner
};

// Infer the type of IconMappings, then extract the keys from the type it infers
export type IconMappingsType = keyof typeof IconMappings;

type IconProps = SVGProps<SVGSVGElement> & {
	name: IconMappingsType;
	ref?: Ref<SVGSVGElement>;
};

export const Icon = ({ name, ...svgProps }: IconProps) => {
	const IconComponent = IconMappings?.[name];
	return <IconComponent {...svgProps} />;
};
