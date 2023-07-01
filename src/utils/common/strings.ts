/**
 * Tests whether the string `s` begins with `prefix`.
 *
 * Ported from Go-lang `strings.HasPrefix`
 */
export const hasPrefix = (s: string, prefix: string) => {
	return s.length >= prefix.length && s.substring(0, prefix.length) === prefix;
};

/**
 * Tests whether the string `s` ends with `suffix`.
 *
 * Ported from Go-lang `strings.HasSuffix`
 */
export const hasSuffix = (s: string, suffix: string) => {
	return s.length >= suffix.length && s.slice(-suffix.length) === suffix;
};

/**
 * Use char(s) to pad an input string/number to a certain length.
 */
export const padChar = (
	str: string | number,
	size = 5,
	char = " ",
	append = false
): string => {
	str = String(str);
	while (str.length < size) str = append ? str + char : char + str;
	return str;
};

/**
 * Pad an input number with `0`s to maintain a desired length.
 *
 * Alias of `padChar`.
 */
export const padZeros = (num: string | number, size: number): string => {
	return padChar(num, size, "0", false);
};

/**
 * A wrapper for `JSON.parse()` to support `undefined` value
 */
export const parseJSON = (value: string | null): any | undefined => {
	try {
		return value === "undefined" ? undefined : JSON.parse(value ?? "");
	} catch {
		log("warn", value);
		return undefined;
	}
};

/**
 * Returns `s` without the provided leading `prefix` string.
 *
 * If `s` doesn't start with `prefix`, `s` is returned unchanged.
 *
 * Ported from Go-lang `strings.TrimPrefix`
 */
export const trimPrefix = (s: string, prefix: string) => {
	if (hasPrefix(s, prefix)) return s.slice(prefix.length);
	return s;
};

/**
 * Returns `s` without the provided trailing `suffix` string.
 *
 * If `s` doesn't start with `suffix`, `s` is returned unchanged.
 *
 * Ported from Go-lang `strings.TrimSuffix`
 */
export const trimSuffix = (s: string, suffix: string) => {
	if (hasSuffix(s, suffix)) return s.slice(0, s.length - suffix.length);
	return s;
};
