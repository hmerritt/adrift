import Refresh from "./subComponents/Refresh";
import Spinner from "./subComponents/Spinner";

const IconMappings = {
	refresh: Refresh,
	spinner: Spinner
};

// Infer the type of IconMappings, then extract the keys from the type it infers
export type IconMappingsType = keyof typeof IconMappings;

type IconProps = {
	name: IconMappingsType;
};

const Icon = ({ name, ...rest }: IconProps) => {
	const IconComponent = IconMappings?.[name];
	return <IconComponent {...rest} />;
};

export default Icon;
