import type { FeatureOptions } from "global/featureFlags";
import type { LogStoreType } from "global/log";

export {};

type LogFunction = (logLevel: any, ...args: any[]) => void;
type FeatureFunction = (mode: string, options?: FeatureOptions) => boolean;

declare global {
	const log: LogFunction;
	const debug: LogFunction;
	const logStore: LogStoreType;
	const feature: FeatureFunction;

	interface Window {
		log: LogFunction;
		debug: LogFunction;
		logStore: LogStoreType;
		feature: FeatureFunction;
	}
}
