const fs = require("fs");

// Check if jest-preview is installed
const jestPreviewExists = () => fs.existsSync("./node_modules/jest-preview/transforms/css.js");

const transforms = {
	default: {
		"^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/config/jest/babelTransform.js",
		"^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
		"^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
	},
	jestPreview: {
		"^.+\\.(css|scss|sass)$": "jest-preview/transforms/css",
		"^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/file"
	}
}

// Choose which transforms to use.
// Use the default transforms if CI is set. Otherwise, if jest-preview is installed, use it.
const transformStyles = () => process?.env?.CI || !jestPreviewExists() ? transforms.default : transforms.jestPreview;

module.exports = transformStyles;
