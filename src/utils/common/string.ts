export function appendChar(str: string | number, size: number, char: string) {
	str = String(str);
	while (str.length < size) str = str + char;
	return str;
}

export function padChar(str: string | number, size: number, char: string) {
	str = String(str);
	while (str.length < size) str = char + str;
	return str;
}

export function padZeros(num, size) {
	return padChar(num, size, "0");
}
