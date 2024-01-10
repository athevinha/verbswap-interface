import { BigNumber } from 'ethers';

export const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const ICONS_CDN = 'https://icons.llamao.fi/icons';

export function chainIconUrl(chain) {
	return `${ICONS_CDN}/chains/rsz_${chain.toLowerCase()}?w=48&h=48`;
}

export function protoclIconUrl(protocol) {
	return `${ICONS_CDN}/protocols/${protocol}?w=48&h=48`;
}

export function getSavedTokens() {
	return JSON.parse(localStorage.getItem('savedTokens') || '{}');
}

export const median = (arr: number[]): number => {
	const s = [...arr].sort((a, b) => a - b);
	const mid = Math.floor(s.length / 2);
	return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
};

export const formattedNum = (number, symbol = false, acceptNegatives = false) => {
	let currencySymbol;
	if (symbol === true) {
		currencySymbol = '$';
	} else if (symbol === false) {
		currencySymbol = '';
	} else {
		currencySymbol = symbol;
	}
	if (!number || number === '' || Number.isNaN(Number(number))) {
		return symbol ? `${currencySymbol}0` : 0;
	}
	let formattedNum = String();
	let num = parseFloat(number);
	const isNegative = num < 0;

	// const currencyMark = isNegative ? `${currencySymbol}-` : currencySymbol
	// const normalMark = isNegative ? '-' : ''

	// if (num > 10000000) {
	// 	return (symbol ? currencyMark : normalMark) + toK(num.toFixed(0), true)
	// }

	// if (num === 0) {
	// 	return symbol ? `${currencySymbol}0` : 0
	// }

	// if (num < 0.0001 && num > 0) {
	// 	return symbol ? `< ${currencySymbol}0.0001` : '< 0.0001'
	// }

	let maximumFractionDigits = num < 1 ? 8 : 4;
	maximumFractionDigits = num > 100000 ? 2 : maximumFractionDigits;
	formattedNum = num.toLocaleString('en-US', { maximumFractionDigits });

	return String(formattedNum);
};

export const normalizeTokens = (t0 = '0', t1 = '0') => {
	if (!t0 || !t1) return null;

	return Number(t0) < Number(t1) ? [t0.toLowerCase(), t1.toLowerCase()] : [t1.toLowerCase(), t0.toLowerCase()];
};
export const precisionize = (
	value: number,
	opts?: {
		maximumSignificantDigits?: number;
		minimumSignificantDigits?: number;
		maxExtraDigits?: number;
	}
): string => {
	const maxExtraDigits = opts?.maxExtraDigits ?? 0;
	const extraDigits = Math.min(maxExtraDigits, value >= 1 ? 2 : value >= 0.1 ? 1 : 0);
	const minimumSignificantDigits = extraDigits + (opts?.minimumSignificantDigits ?? 1);
	const maximumSignificantDigits = extraDigits + (opts?.maximumSignificantDigits ?? 4);
	const stringOpts = {
		minimumSignificantDigits,
		maximumSignificantDigits
	};
	return value.toLocaleString(['en-US', 'fullwide'], stringOpts);
};
export const NEG = (num: string): string => {
	if (num?.[0] == '-') {
		return num.substring(1);
	}
	return '-' + num;
};

export const zerofy = (
	value: number | string,
	opts?: {
		maxZeros?: number;
		maximumSignificantDigits?: number;
		minimumSignificantDigits?: number;
		maxExtraDigits?: number;
	}
): string => {
	let zeros = 0;
	if (typeof value === 'number') {
		if (value < 0) {
			return '-' + zerofy(-value, opts);
		}
		zeros = -Math.floor(Math.log10(value) + 1);
		if (!Number.isFinite(zeros)) {
			zeros = 0;
		}
		value = precisionize(value, opts);
	} else {
		value = String(value);
		if (IS_NEG(value)) {
			return '-' + zerofy(NEG(value), opts);
		}
		let [int, dec] = value.split('.');
		if (dec?.length > 0) {
			const fake = int.substring(Math.max(0, int.length - 2)) + '.' + dec;
			dec = precisionize(Number(fake), opts);
			dec = dec.split('.')[1];
			if (dec?.length > 0) {
				value = int + '.' + dec;
				zeros = dec.match(/^0+/)?.[0]?.length ?? 0;
			}
		}
	}
	const maxZeros = opts?.maxZeros ?? 3;
	if (zeros > maxZeros) {
		const zs = zeros.toString();
		let ucZeros = '';
		for (let i = 0; i < zs.length; ++i) {
			ucZeros += String.fromCharCode(parseInt(`+208${zs[i]}`, 16));
		}
		value = value.replace(/[.,]{1}0+/, `.0${ucZeros}`);
	}
	return value;
};

export const IS_NEG = (num: string | number | BigNumber): boolean => {
	switch (typeof num) {
		case 'string':
			return num?.[0] == '-';
		case 'number':
			return num < 0;
		default:
			return num.isNegative();
	}
};
export function formatNumberToKMB(num: number | string): string {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'b';
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
	}
	return num.toString();
}
