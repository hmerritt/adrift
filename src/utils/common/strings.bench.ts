import { bench } from "vitest";

import { hasPrefix, hasSuffix } from "./strings";

// Random string 60 characters
// prettier-ignore
const strRand = "a12xDfLrRiyOK0/Wp6wDCf1PldYl9ZvGpbGRxDWOMsay5a8XnH/v1x+nxrfkrtfIDoQMny6+WqK0uOmk";

bench("hasPrefix", () => {
	hasPrefix(strRand, strRand); // true O(n)
});

bench("hasSuffix", () => {
	hasSuffix(strRand, strRand); // true O(n)
});
