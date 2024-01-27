import type { EnvObj } from "./env";
import type { FeatureFlags, FeatureOptions } from "./featureFlags";
import type { LogStoreType } from "./log";

type LogFunction = (logLevel: any, ...args: any[]) => void;
type FeatureFunction = (mode: FeatureFlags, options?: FeatureOptions) => boolean;

declare global {
	var log: LogFunction;
	var debug: LogFunction;
	var logStore: LogStoreType;
	var env: EnvObj;
	var feature: FeatureFunction;
	var getNumberOfEventListeners: () => number;
	var getObjectOfEventListeners: () => Record<string, number>;

	interface Window {
		log: LogFunction;
		debug: LogFunction;
		logStore: LogStoreType;
		env: EnvObj;
		feature: FeatureFunction;
		getNumberOfEventListeners: () => number;
		getObjectOfEventListeners: () => Record<string, number>;
	}
}
