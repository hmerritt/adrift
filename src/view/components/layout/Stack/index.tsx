import * as stylex from "@stylexjs/stylex";
import { Children, cloneElement, isValidElement } from "react";

import { Flex, FlexProps } from "view/components";

interface StackProps extends FlexProps {
	spacing?:
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 13
		| 14
		| 15
		| 16
		| 17
		| 18
		| 19
		| 20;
}

export const Stack = ({
	sx,
	children,
	row = false,
	spacing = 1,
	...props
}: StackProps) => {
	return (
		<Flex
			row={row}
			{...props}
			sx={[row ? stackStyles.stackRow : stackStyles.stack, sx]}
		>
			{Children.map(children, (child, index) => {
				if (isValidElement(child)) {
					return cloneElement(child, {
						...stylex.props(
							// row == false
							row === false && spacing === 1 && stackStyles.stack1,
							row === false && spacing === 2 && stackStyles.stack2,
							row === false && spacing === 3 && stackStyles.stack3,
							row === false && spacing === 4 && stackStyles.stack4,
							row === false && spacing === 5 && stackStyles.stack5,
							row === false && spacing === 6 && stackStyles.stack6,
							row === false && spacing === 7 && stackStyles.stack7,
							row === false && spacing === 8 && stackStyles.stack8,
							row === false && spacing === 9 && stackStyles.stack9,
							row === false && spacing === 10 && stackStyles.stack10,
							// row == true
							row === true && spacing === 1 && stackStyles.stackRow1,
							row === true && spacing === 2 && stackStyles.stackRow2,
							row === true && spacing === 3 && stackStyles.stackRow3,
							row === true && spacing === 4 && stackStyles.stackRow4,
							row === true && spacing === 5 && stackStyles.stackRow5,
							row === true && spacing === 6 && stackStyles.stackRow6,
							row === true && spacing === 7 && stackStyles.stackRow7,
							row === true && spacing === 8 && stackStyles.stackRow8,
							row === true && spacing === 9 && stackStyles.stackRow9,
							row === true && spacing === 10 && stackStyles.stackRow10,
							index === 0 && row === false && stackStyles.stackFirst,
							index === 0 && row === true && stackStyles.stackRowFirst
						)
					});
				}
				return child;
			})}
		</Flex>
	);
};

export const stackStyles = stylex.create({
	stack: {
		display: "flex",
		flexDirection: "column"
	},
	stackRow: {
		display: "flex",
		flexDirection: "row"
	},
	stackFirst: {
		marginTop: "0rem"
	},
	stackRowFirst: {
		marginLeft: "0rem"
	},
	stack1: {
		marginTop: "0.1rem"
	},
	stack2: {
		marginTop: "0.5rem"
	},
	stack3: {
		marginTop: "1rem"
	},
	stack4: {
		marginTop: "1.5rem"
	},
	stack5: {
		marginTop: "2rem"
	},
	stack6: {
		marginTop: "2.5rem"
	},
	stack7: {
		marginTop: "3rem"
	},
	stack8: {
		marginTop: "3.5rem"
	},
	stack9: {
		marginTop: "4rem"
	},
	stack10: {
		marginTop: "4.5rem"
	},
	stackRow1: {
		marginLeft: "0.1rem"
	},
	stackRow2: {
		marginLeft: "0.5rem"
	},
	stackRow3: {
		marginLeft: "1rem"
	},
	stackRow4: {
		marginLeft: "1.5rem"
	},
	stackRow5: {
		marginLeft: "2rem"
	},
	stackRow6: {
		marginLeft: "2.5rem"
	},
	stackRow7: {
		marginLeft: "3rem"
	},
	stackRow8: {
		marginLeft: "3.5rem"
	},
	stackRow9: {
		marginLeft: "4rem"
	},
	stackRow10: {
		marginLeft: "4.5rem"
	}
});
