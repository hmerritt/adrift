import { expect, test } from "vitest";

import {
	hasPrefix,
	hasSuffix,
	padChar,
	padZeros,
	parseJSON,
	trimPrefix,
	trimSuffix
} from "./strings";

test("hasPrefix", () => {
	expect(hasPrefix("Hello, World!", "Hello")).toBe(true);
	expect(hasPrefix("ecdf0757-f748-4339-8200-6c09c", "ecdf0757-f748-43")).toBe(true);

	expect(hasPrefix("Hello, World!", "World")).toBe(false);
	expect(hasPrefix("ecdf0757-f748-4339-8200-6c09c", "cdf0757-f748-43")).toBe(false);
});

test("hasSuffix", () => {
	expect(hasSuffix("Hello, World!", "World!")).toBe(true);
	expect(hasSuffix("ecdf0757-f748-4339-8200-6c09c", "48-4339-8200-6c09c")).toBe(true);

	expect(hasSuffix("Hello, World!", "Hello,")).toBe(false);
	expect(hasSuffix("ecdf0757-f748-4339-8200-6c09c", "ecdf0757-f7")).toBe(false);
});

test("padChar", () => {
	expect(padChar("", 5, "!")).toBe("!!!!!");
	expect(padChar("hello", 5, "!", false)).toBe("hello");
	expect(padChar("hello", 10, " ", false)).toBe("     hello");
	expect(padChar(12345, 10, "!", false)).toBe("!!!!!12345");

	// append: true
	expect(padChar("", 5, "!", true)).toBe("!!!!!");
	expect(padChar("hello", 5, "!", true)).toBe("hello");
	expect(padChar("hello", 10, " ", true)).toBe("hello     ");
	expect(padChar(12345, 10, "!", true)).toBe("12345!!!!!");
});

test("padZeros", () => {
	expect(padZeros(123, -1)).toBe("123");
	expect(padZeros(123, 3)).toBe("123");
	expect(padZeros(123, 5)).toBe("00123");
	expect(padZeros(123456, 10)).toBe("0000123456");
});

test("parseJSON", () => {
	expect(parseJSON(`{"key":"some value"}`).key).toBe("some value");
	expect(parseJSON("[1]")).toStrictEqual([1]);

	expect(parseJSON(`{"key:not valid json"}`)).toBe(undefined);
	expect(parseJSON("[wow")).toBe(undefined);
});

test("trimPrefix", () => {
	expect(trimPrefix("Hello World", "Hello W")).toBe("orld");
	expect(trimPrefix("!@#wow#(*&#/", "!@#w")).toBe("ow#(*&#/");

	expect(trimPrefix("Hello World", " World")).toBe("Hello World");
	expect(trimPrefix("!@#wow#(*&#/", "@#wo")).toBe("!@#wow#(*&#/");
});

test("trimSuffix", () => {
	expect(trimSuffix("Hello World", "o World")).toBe("Hell");
	expect(trimSuffix("!@#wow#(*&#/", "w#(*&#/")).toBe("!@#wo");

	expect(trimSuffix("Hello World", " Hello ")).toBe("Hello World");
	expect(trimSuffix("!@#wow#(*&#/", "(*&#")).toBe("!@#wow#(*&#/");
});
