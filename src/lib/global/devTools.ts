/**
 * Injects react-scan during development.
 *
 * https://github.com/aidenybai/react-scan
 */
export const injectReactScan = async () => {
	if (
		!feature("showDevTools", { alwaysShowOnDev: false }) ||
		typeof window === "undefined"
	)
		return;

	const [scan, error] = await go(async () => {
		const { scan } = await import("react-scan");
		return scan;
	});

	if (error) {
		log("error", "injectReactScan", error);
		return;
	}

	scan({
		enabled: true,
		log: false
	});
};

export const injectDevTools = () => {
	injectReactScan();
};
