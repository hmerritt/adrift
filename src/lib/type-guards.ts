export const isObj = (v: unknown): v is Record<string, unknown> => {
	return !!v && typeof v === "object";
};

export const hasProp = <K extends PropertyKey>(
	data: object,
	prop: K
): data is Record<K, unknown> => {
	return prop in data;
};

/**
 * Helper to conditionally spread an item into an array.
 */
export const arraySpread = <TItem>(
	/** Conditional value. When truthy, `itemToSpread` is returned. */
	isTruthy: any,
	/** Item that gets returned when conditional is truthy */
	itemToSpread: TItem | TItem[],
	/** Option to spread multiple values when `itemToSpread` is an array */
	spreadMultiple = false
) => {
	if (isTruthy)
		return spreadMultiple && Array.isArray(itemToSpread)
			? (itemToSpread as TItem[])
			: [itemToSpread as TItem];
	return [] as TItem[];
};
