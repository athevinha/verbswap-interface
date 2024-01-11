import { useQueries } from '@tanstack/react-query';
import { IGKQuery } from '~/types';
import { ILMQuery } from '../type';
export const getDexsAnalytics = async () => {
	let prevRes: ILMQuery = await fetch(
		`https://api.llama.fi/overview/dexs?excludeTotalDataChartBreakdown=true&excludeTotalDataChart=true`
	).then((res) => res.json());
	console.log('#quey', prevRes);
	return prevRes;
};

export const useAnalytics = () => {
	const res = useQueries({
		queries: [
			{
				queryKey: ['getDexsAnalytics', '___'],
				queryFn: () => getDexsAnalytics(),
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
