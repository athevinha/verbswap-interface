import { BigNumber } from 'ethers';
import { zerofy } from '~/utils';

export const CHART_HEIGHT = 400;
export const YAXIS_WIDTH = 15;

export const CHART_OPTION = {
	'1-day': '1D',
	'1-hour': '1H',
	'4-hour': '4H'
};
export const GREEN = '#48BB78';
export const RED = '#F56565';
export const COLORS = [
	'#ee64b8',
	GREEN,
	'#ff8d00',
	'#00bfea',
	'#8884ff',
	'#ab6100',
	'#c90000',
	'#7b7b7b',
	'#6464ff',
	'purple',
	'darkgreen',
	RED,
	'#ffaf01'
];

export const COINCOLORS = [
	'#627EEA',
	'#FF9800',
	'#FF007A',
	'#2A5ADA',
	'#2775CA',
	'#26A17B',
	'#9895F3',
	'#8C8C8C',
	'#F4B731',
	'purple',
	'darkgreen',
	RED,
	'#F0B90B',
	'#FE88B1'
];

const levelColor = {
	debug: 'grey',
	error: 'red',
	warn: 'orange',
	info: 'greenBright'
};

const numberFmt0 = Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const numberFmt1 = Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
const numberFmt2 = Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
const currencyFmt0 = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});
const currencyFmt1 = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 1,
	maximumFractionDigits: 1
});
const currencyFmt2 = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

export function fillPeriods(arr, { period, from, to, interpolate = true, extrapolate = false }) {
	let i = 0;
	let prevTimestamp = from ? from - period : arr[0].timestamp;
	let prevPeriodStep = Math.floor(prevTimestamp / period);
	let prevItem;
	const ret = [];

	while (i < arr.length) {
		const item = arr[i];
		const periodStep = Math.floor(item.timestamp / period);

		if (periodStep - 1 > prevPeriodStep) {
			const diff = periodStep - prevPeriodStep;
			let j = 1;
			while (j < diff) {
				let newItem = { timestamp: (prevPeriodStep + j) * period };
				if (interpolate) {
					newItem = { ...prevItem, ...newItem };
				}
				ret.push(newItem);
				j++;
			}
		}

		ret.push(item);

		if (to && i === arr.length - 1) {
			const lastPeriodStep = Math.floor(to / period);
			if (lastPeriodStep > periodStep) {
				const diff = lastPeriodStep - periodStep;
				let j = 0;
				while (j < diff) {
					let newItem = { timestamp: (periodStep + j + 1) * period };
					if (extrapolate) {
						newItem = { ...item, ...newItem };
					}
					ret.push(newItem);
					j++;
				}
			}
		}

		prevItem = item;
		prevPeriodStep = periodStep;
		i++;
	}

	return ret;
}

function _getNumberFmt(value) {
	const absValue = Math.abs(value);
	if (absValue < 10) {
		return numberFmt2;
	} else if (absValue < 1000) {
		return numberFmt1;
	} else {
		return numberFmt0;
	}
}

function _getCurrencyFmt(value) {
	const absValue = Math.abs(value);
	if (absValue < 10) {
		return currencyFmt2;
	} else if (absValue < 1000) {
		return currencyFmt1;
	} else {
		return currencyFmt0;
	}
}

export const formatNumber = (value, opts: any = {}) => {
	const currency = !!opts?.currency;
	const compact = !!opts?.compact;

	if (currency && !compact) {
		return _getCurrencyFmt(value).format(value);
	}

	const display = compact ? compactNumber(value) : _getNumberFmt(value).format(value);
	if (currency) {
		return `$${display}`;
	}
	return display;
};

export const compactNumber = (value) => {
	const abs = Math.abs(value);
	if (abs >= 1e9) {
		return `${(value / 1e9).toFixed(abs < 1e10 ? 2 : 1)}B`;
	}
	if (abs >= 1e6) {
		return `${(value / 1e6).toFixed(abs < 1e7 ? 2 : 1)}M`;
	}
	if (abs >= 1e3) {
		return `${(value / 1e3).toFixed(abs < 1e4 ? 2 : 1)}K`;
	}
	return `${value.toFixed(1)}`;
};

export const tooltipLabelFormatter = (label, args) => {
	if (!label) {
		return;
	}

	const date = new Date(label * 1000); // Convert seconds to milliseconds
	const formattedDate =
		date.toISOString().split('T')[0].split('-')[1] + '/' + date.toISOString().split('T')[0].split('-')[2]; // Get the date in "YYYY-MM-DD" format
	const formattedTime = `${date.getHours()}.${date.getMinutes()}`; // Get the time in "hour.minute" format

	return `${formattedDate} `;
};
export const tooltipLabelFormatterYear = (label, args) => {
	if (!label) {
		return;
	}

	const date = new Date(label * 1000); // Convert seconds to milliseconds
	const formattedDate =
		date.toISOString().split('T')[0].split('-')[1] + '/' + date.toISOString().split('T')[0].split('-')[2]; // Get the date in "YYYY-MM-DD" format
	const formattedTime = `${date.getHours()}.${date.getMinutes()}`; // Get the time in "hour.minute" format

	return `${date.toISOString().split('T')[0]} `;
};

export const yaxisFormatterPercent = (value) => {
	return value.toFixed(2) + '%';
};

export const yaxisFormatterNumber = (value) => {
	return compactNumber(value);
};

export const yaxisFormatter = (value) => {
	return zerofy(value).slice(0, -2);
};

export const tooltipFormatterNumber = (value) => {
	return formatNumber(value);
};

export const tooltipFormatterPercent = (value) => {
	return value.toFixed(2) + '%';
};

export const tooltipFormatter = (value, name, item) => {
	if (item && item.unit === '%') {
		return value.toFixed(2);
	}
	return zerofy(value);
};

export const convertToPercents = (data, { ignoreKeys = [], totalKey = 'all' } = {}) => {
	// Not used in percentage evaluation
	const allIgnoredKeys = ignoreKeys.concat(totalKey);

	return data.map((item) => {
		const { timestamp, ...stats } = item;

		let total = item[totalKey];

		if (typeof total !== 'number') {
			// Calculate total from actual data if totalKey is not specified
			total = Object.entries(stats).reduce((acc: number, [key, value]) => {
				if (!allIgnoredKeys.includes(key)) {
					acc += value as number;
				}

				return acc;
			}, 0);
		}

		const formattedStats = Object.entries(stats).reduce((acc, [token, value]) => {
			if (!allIgnoredKeys.includes(token)) {
				acc[token] = ((value as number) / total) * 100;
			} else {
				acc[token] = value;
			}

			return acc;
		}, {});

		return {
			...formattedStats,
			[totalKey]: 100,
			timestamp
		};
	});
};

export const tooltipLabelFormatterUnits = (label, args) => {
	if (!label) {
		return label;
	}
	if (label.constructor !== Date) {
		label = new Date(label * 1000);
		if (!label.getDate()) {
			return label;
		}
	}
	const date = label;

	const item = args && args[0];
	if (item && item.unit === '%') {
		return date;
	}

	const all = item && item.payload.all;

	if (label.constructor !== Date) {
		return all ? `${label}, total: ${all}` : label;
	}

	return all ? `${date}, total: ${all}` : date;
};

export function tsToIso(ts) {
	return new Date(ts - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -5);
}

export function tsToIsoDate(ts) {
	return new Date(ts - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
