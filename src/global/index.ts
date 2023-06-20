/**
 * JS to execute before ANY react code or component is rendered.
 *
 * Used to setup global functions and variables to be used throughout the app.
 *
 * This file (and it's dependencies) are compiled separately to the rest of the app, then ran before the main bundle.
 *
 * @Warning - Do NOT import from any file in global from outside global. You can however import into global.
 * ✓ global <-- utils
 * ✗ global --> utils
 * ✗ import "globalInit" from "global";
 *
 * @Warning - Since the window object is exposed, don't put anything remotely sensitive in here.
 */

import { feature } from "./featureFlags";
import { injectGlobalLog } from "./log";
import { versionString } from "./version";

export const globalInit = () => {
	if (import.meta.env.MODE !== "test")
		console.log(`%c${versionString()}`, "font-size: 1.1em;");

	injectGlobalLog();
	window.feature = feature;
};

globalInit();
export default globalInit;
