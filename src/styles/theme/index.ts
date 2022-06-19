import colors from "./colors";
import mixins from "./mixins";

// Import this into @linaria css`` to use colours, mixins & variables
const theme = `
    ${colors}
    ${mixins}
`;
export default theme;

// @TODO

// Colors

// Mixins

// Chakra theme for reference
//
// const theme = extendTheme({
// 	styles,
// 	colors,
// 	shadows,
// 	// borders,
// 	// Other foundational style overrides go here
// 	components: {
// 		Badge,
// 		Button,
// 		Heading,
// 		Text,
// 		Label,
// 		Link,
// 		Modal: {
// 			baseStyle: {
// 				dialogContainer: {
// 					"@supports(height: -webkit-fill-available)": {}
// 				}
// 			}
// 		}
// 	},
// 	sizes: {
// 		container: {
// 			xl: "86.25rem"
// 		}
// 	}
// });
