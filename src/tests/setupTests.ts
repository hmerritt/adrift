import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

import globalInit from "lib/global/index";
import "lib/styles/global/index.scss";
import "lib/styles/stylex.css";

globalInit();

afterEach(() => {
	cleanup();
});
