import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
	__testing,
	applyServiceWorkerUpdate,
	checkForServiceWorkerUpdate
} from "./serviceWorkerRegistration";

const setNavigatorServiceWorker = (value: unknown) => {
	Object.defineProperty(navigator, "serviceWorker", {
		value,
		configurable: true,
		writable: true
	});
};

const clearNavigatorServiceWorker = () => {
	delete (navigator as any).serviceWorker;
};

const originalHasServiceWorker = "serviceWorker" in navigator;
const originalServiceWorker = (navigator as any).serviceWorker;

describe("serviceWorkerRegistration", () => {
	beforeEach(() => {
		__testing.resetUpdateState();
	});

	afterEach(() => {
		__testing.resetUpdateState();
		if (originalHasServiceWorker) {
			setNavigatorServiceWorker(originalServiceWorker);
		} else {
			clearNavigatorServiceWorker();
		}
	});

	describe("applyServiceWorkerUpdate", () => {
		it("returns false when no registration exists", () => {
			expect(applyServiceWorkerUpdate()).toBe(false);
		});

		it("returns false when no waiting worker exists", () => {
			const registration = {} as ServiceWorkerRegistration;
			__testing.setUpdateState({ registration });
			expect(applyServiceWorkerUpdate()).toBe(false);
		});

		it("posts SKIP_WAITING when a waiting worker exists", () => {
			const postMessage = vi.fn();
			const registration = {
				waiting: { postMessage }
			} as unknown as ServiceWorkerRegistration;

			__testing.setUpdateState({ registration });

			expect(applyServiceWorkerUpdate()).toBe(true);
			expect(postMessage).toHaveBeenCalledWith({ type: "SKIP_WAITING" });
		});
	});

	describe("checkForServiceWorkerUpdate", () => {
		it("returns false when service worker is not available", async () => {
			clearNavigatorServiceWorker();
			await expect(checkForServiceWorkerUpdate()).resolves.toBe(false);
		});

		it("returns false when no registration exists", async () => {
			const getRegistration = vi.fn().mockResolvedValue(null);
			setNavigatorServiceWorker({ getRegistration });

			await expect(checkForServiceWorkerUpdate()).resolves.toBe(false);
			expect(getRegistration).toHaveBeenCalledTimes(1);
		});

		it("updates when a registration exists", async () => {
			const update = vi.fn().mockResolvedValue(undefined);
			const registration = { update } as unknown as ServiceWorkerRegistration;
			const getRegistration = vi.fn().mockResolvedValue(registration);
			setNavigatorServiceWorker({ getRegistration });

			await expect(checkForServiceWorkerUpdate()).resolves.toBe(true);
			expect(update).toHaveBeenCalledTimes(1);
		});

		it("uses existing registration before querying navigator", async () => {
			const update = vi.fn().mockResolvedValue(undefined);
			const registration = { update } as unknown as ServiceWorkerRegistration;
			const getRegistration = vi.fn();
			setNavigatorServiceWorker({ getRegistration });

			__testing.setUpdateState({ registration });

			await expect(checkForServiceWorkerUpdate()).resolves.toBe(true);
			expect(update).toHaveBeenCalledTimes(1);
			expect(getRegistration).not.toHaveBeenCalled();
		});
	});
});
