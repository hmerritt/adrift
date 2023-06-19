import type { FeatureOptions } from "global/featureFlags";

export {};

type LogFunction = (logLevel: any, ...args: any[]) => void;
type FeatureFunction = (mode: string, options?: FeatureOptions) => boolean;

declare global {
	const log: LogFunction;
	const debug: LogFunction;
	const debugTimestamps: any;
	const feature: FeatureFunction;

	interface Window {
		log: LogFunction;
		debug: LogFunction;
		debugTimestamps: any;
		feature: FeatureFunction;
	}
}
