import * as Icons from "./subComponents";

const IconMappings = {
	refresh: Icons.Refresh,
	spinner: Icons.Spinner
};

// Infer the type of IconMappings, then extract the keys from the type it infers
export type IconMappingsType = keyof typeof IconMappings;

type IconProps = {
	name: IconMappingsType;
};

export const Icon = ({ name, ...rest }: IconProps) => {
	const IconComponent = IconMappings?.[name];
	return <IconComponent {...rest} />;
};
