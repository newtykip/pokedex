export const capitaliseString = (str: string): string =>
	str
		.split(' ')
		.map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
		.join(' ');
