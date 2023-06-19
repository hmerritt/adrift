/**
 * JS to execute before ANY react code or component is rendered.
 *
 * Used to setup global functions and variables to be used throughout the app.
 *
 * @Warning - Since the window object is exposed, don't put anything remotely sensitive in here.
 * @Idea - maybe namespace globals under `global` to avoid name collision? `global.log("hello")`
 */

import { feature } from "./featureFlags";
import { injectGlobalLog } from "./log";
import { versionString } from "./version";

injectGlobalLog();
log(versionString());

window.feature = feature;
