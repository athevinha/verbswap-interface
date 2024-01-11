import { useQueries } from '@tanstack/react-query';
import { IGKQuery } from '~/types';
import { ILMQuery } from '../type';
export const getDexsAnalytics = async (excludeTotalDataChartBreakdown = true, excludeTotalDataChart = true) => {
	let prevRes: ILMQuery = await fetch(
		`https://api.llama.fi/overview/dexs?excludeTotalDataChartBreakdown=${excludeTotalDataChartBreakdown}&excludeTotalDataChart=${excludeTotalDataChart}`
	).then((res) => res.json());
	console.log('#quey', prevRes);
	return prevRes;
};

export const useAnalytics = (excludeTotalDataChartBreakdown = true, excludeTotalDataChart = true) => {
	const res = useQueries({
		queries: [
			{
				queryKey: ['getDexsAnalytics', '___', excludeTotalDataChartBreakdown, excludeTotalDataChart],
				queryFn: () => getDexsAnalytics(excludeTotalDataChartBreakdown, excludeTotalDataChart),
				refetchInterval: 100000,
				refetchOnWindowFocus: false,
				refetchIntervalInBackground: false
			}
		]
	});
	console.log('#analytics', res);
	return {
		isLoading: res[0].isLoading,
		dexs: res[0].data,
		isLoaded: res[0].status === 'error' || res[0].status === 'success'
	};
};
