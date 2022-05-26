import Flex, { FlexProps } from "components/common/layout/Flex";

interface StackProps extends FlexProps {
	spacing?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
}

const Stack = ({ spacing = 1, row = false, ...props }: StackProps) => {
	const whichStack = row ? "stack-row" : "stack";
	props.className = props?.className ? props.className += ` ${whichStack} stack-${spacing}` : `${whichStack} stack-${spacing}`;
	return <Flex row={row} {...props} />;
};

export default Stack;
