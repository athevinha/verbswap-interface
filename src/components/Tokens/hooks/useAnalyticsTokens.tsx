import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import { chainNameToId, geckoTerminalChainsMap } from '~/components/Aggregator/constants';
import { useQueryParams } from '~/hooks/useQueryParams';
import { IToken, IGKQuery } from '~/types';
export const GK_POOL_QUERY = {
	TOP_POOLS: 'pools',
	TRENDING_POOLS: 'trending_pools',
	NEW_POOLS: 'new_pools'
};
export const getTokensByChain = async (chainId, GKPoolQueryKey: string = GK_POOL_QUERY.TOP_POOLS) => {
	if (!geckoTerminalChainsMap[chainId]) {
		return [];
	}

	let prevRes: { data: IGKQuery[] } = await fetch(
		`https://api.geckoterminal.com/api/v2/networks/${geckoTerminalChainsMap[chainId]}/${GKPoolQueryKey}?include=base_token%2Cquote_token%2Cdex&page=1`
	).then((res) => res.json());
	console.log('#preRes', prevRes.data);
	return prevRes.data;
};

export const useAnalyticsTokens = (chainId: number, GKPoolQueryKey: string = GK_POOL_QUERY.TOP_POOLS) => {
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
