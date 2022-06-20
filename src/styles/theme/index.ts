import colors from "./colors";
import mixins from "./mixins";
import variables from "./variables";

// Import this into @linaria css`` to use colours, mixins & variables
const theme = `
    ${variables}
    ${colors}
    ${mixins}
`;

export default theme;

// @TODO

// Chakra theme for reference
//
// const theme = extendTheme({
// 	styles,
// 	colors,
// 	shadows,
// 	borders,
// 	sizes: {
// 		container: {
// 			xl: "86.25rem"
// 		}
// 	}
// });
