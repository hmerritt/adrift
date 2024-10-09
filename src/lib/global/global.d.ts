import type { EnvKeys, EnvObj } from "./env";
import type { FeatureFlags, FeatureOptions } from "./featureFlags";
import type { LogStoreType } from "./log";
import type { GoFn, GoSyncFn } from "./utils";

type LogFn = (logLevel: any, ...args: any[]) => void;
type LognFn = (namespace: string, logLevel: any, ...args: any[]) => void;
type FeatureFn = (mode: FeatureFlags, options?: FeatureOptions) => boolean;

declare global {
	var log: LogFn;
	var logn: LognFn;
	var debug: LogFn;
	var debugn: LognFn;
	var logStore: LogStoreType;
	var env: EnvObj;
	var go: GoFn;
	var goSync: GoSyncFn;
	var envGet: (key: EnvKeys) => any;
	var feature: FeatureFn;
	var getNumberOfEventListeners: () => number;
	var getObjectOfEventListeners: () => Record<string, number>;

	interface Window {
		log: LogFn;
		logn: LognFn;
		debug: LogFn;
		debugn: LognFn;
		logStore: LogStoreType;
		env: EnvObj;
		go: GoFn;
		goSync: GoSyncFn;
		envGet: (key: EnvKeys) => any;
		feature: FeatureFn;
		getNumberOfEventListeners: () => number;
		getObjectOfEventListeners: () => Record<string, number>;
	}
}
