import { vi } from "vitest";

/**
 * Mock part of a module.
 *
 * https://vitest.dev/guide/mocking.html#cheat-sheet
 */
export const mockPartial = (filePath: string, obj: object) => {
	return async () => {
		const actual = await vi.importActual<any>(filePath);
		//             await vi.importActual<typeof import('some-path')>('some-path')

		return {
			...actual,
			...obj
		};
	};
};
