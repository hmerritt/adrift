import colors from "./colors";
import mixins from "./mixins";
import shadows from "./shadows";
import variables from "./variables";

// Import this into @linaria css`${theme}...` to use colours, mixins & variables
const theme = `
    ${variables}
    ${colors}
    ${shadows}
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
