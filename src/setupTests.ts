// @ts-nocheck
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { jestPreviewConfigure } from "jest-preview";
import "@testing-library/jest-dom";
import "./styles/index.scss";

jestPreviewConfigure({
	// Automatically preview the UI in the external browser when the test fails. You don't need to invoke preview.debug() by yourself anymore.
	// Set to false if you experience any error or just want to opt-out.
	autoPreview: true
});
