import { useQueries } from '@tanstack/react-query';
import { geckoTerminalChainsMap } from '~/components/Aggregator/constants';
import { IGKQuery } from '~/types';

export const useWhiteList = () => {
	const res = useQueries({
		queries: [
			{
				queryKey: ['getTopTokensByChain', GKPoolQueryKey, chainId],
				queryFn: () => getTokensByChain(chainId, GKPoolQueryKey),
				refetchInterval: 100000,
				refetchOnWindowFocus: false,
				refetchIntervalInBackground: false
			}
		]
	});
	console.log('#res', res);
	return {
		isLoading: res[0].isLoading,
		tokens: res[0].data,
		isLoaded: res[0].status === 'error' || res[0].status === 'success'
	};
};
