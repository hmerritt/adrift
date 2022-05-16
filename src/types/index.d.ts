export {};

type LogFunction = (logLevel: any, ...args: any[]) => void;

declare global {
	var log: LogFunction;
	var debug: LogFunction;

	interface Window {
		log: LogFunction;
		debug: LogFunction;
		lastDebugTimestamp: number;
	}
}
