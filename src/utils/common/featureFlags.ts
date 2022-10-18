/**
 * Feature flags
 */
export const featureFlags = {
	myExperimentalFeature: import.meta.env.VITE_FEATURE_MY_EXPERIMENTAL_FEATURE,
	someOtherFeature: false
};

type FeatureOptions = {
	alwaysShowOnDev?: boolean;
};

/**
 * Returns `true` if the feature is enabled in `featureFlags` object.
 */
export const feature = (
	mode: string,
	options: FeatureOptions = {}
): boolean => {
	const { alwaysShowOnDev } = {
		alwaysShowOnDev: true,
		...options
	};

	// Bypass feature flag in dev mode if `alwaysShowOnDev` is true
	if (alwaysShowOnDev && import.meta.env.MODE === "development") {
		return true;
	}

	let match = false;

	if (featureFlags[mode] || mode === import.meta.env.MODE) {
		match = true;
	}

	return match;
};
