import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

import { injectLog } from "lib/global/log";
import { injectGo } from "lib/global/utils";

injectGo();
injectLog();
global.envGet = vi.fn();
global.feature = vi.fn();

afterEach(() => {
	cleanup();
});
