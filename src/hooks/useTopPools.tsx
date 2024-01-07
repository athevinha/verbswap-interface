import { useMemo } from 'react';
import { chainNameToId, chainsMap, geckoTerminalChainsMap } from '~/components/Aggregator/constants';
import { getAllChains } from '~/components/Aggregator/router';
import { IOHLCV, IToken, ITopPoolGK } from '~/types';
import { useQueryParams } from './useQueryParams';
import { useQueries } from '@tanstack/react-query';
import { candleDexValid } from '~/components/Aggregator/list';
const chains = getAllChains();
export async function getTopPools(tokenAddress: string, gtChain: string) {
	const res: { data: ITopPoolGK[] } = await fetch(
		`https://api.geckoterminal.com/api/v2/networks/${gtChain}/tokens/${tokenAddress}/pools?page=1'`
	).then((r) => r.json());
	return res.data;
}
export async function getOHLCVPool(
	poolAddress: string,
	gtChain: string,
	resolution: string = 'day',
	aggregate: string = '1'
) {
	if (!poolAddress || !gtChain || poolAddress === '0x0000000000000000000000000000000000000000') return [];
	const url = `https://api.geckoterminal.com/api/v2/networks/${gtChain}/pools/${poolAddress.toLowerCase()}/ohlcv/${resolution}?aggregate=${aggregate}&before_timestamp=${Date.now()}&limit=100`;
	const res = await fetch(url).then((r) => r.json());
	return res.data?.attributes?.ohlcv_list || [];
}
export function stringIncludeString(a: string, b: string) {
	if (!a || !b) return false;
	return a.toLowerCase().includes(b.toLowerCase()) || b.toLowerCase().includes(a.toLowerCase());
}
export function validDexCheck(dexID: string) {
	let isValid = false;
	candleDexValid.map((dex) => {
		if (stringIncludeString(dex, dexID)) {
			isValid = true;
		}
	});
	return isValid;
}
export function filterPoolAllowCandleChart(pools: ITopPoolGK[]) {
	const poolsValid = pools?.filter((pool) => validDexCheck(pool.relationships.dex.data.id)) || [];
	return poolsValid.length > 0 ? poolsValid : pools;
}
export function useTopPools() {
	const { chainName, fromTokenAddress, toTokenAddress } = useQueryParams();
	const chainID = chainNameToId(chainName.toLowerCase());
	const gtChainId = geckoTerminalChainsMap[chainID];
	console.log('#gtChainId', gtChainId, chainID);
	const res = useQueries({
		queries: [
			{
				queryKey: ['topPools', toTokenAddress, gtChainId],
				queryFn: () => getTopPools(toTokenAddress, gtChainId),
				refetchInterval: 100000
				// refetchOnWindowFocus: false,
				// refetchIntervalInBackground: false
			},
			{
				queryKey: ['topPools', fromTokenAddress, gtChainId],
				queryFn: () => getTopPools(fromTokenAddress, gtChainId),
				refetchInterval: 100000
				// refetchOnWindowFocus: false,
				// refetchIntervalInBackground: false
			}
		]
	});
	const data = res?.filter((r) => r.status === 'success') ?? [];
	const susscessPools =
		(res?.filter((r) => r.status === 'success' && !!r.data && r.data) ?? []).map((r) => r.data) ?? [];
	const loadingPools = res?.filter((r) => r.status === 'loading') ?? [];

	return {
		isLoaded: loadingPools.length === 0,
		isLoading: data.length >= 1 ? false : true,
		topPoolsOfToken: susscessPools ?? [],
		refetch: () => res?.forEach((r) => r.refetch()),
		gtChainId,
		loadingPools
	};
}
export function useOHLCVpool(gtChain, pool: ITopPoolGK, resolution: string) {
	const res = useQueries({
		queries: [
			pool
				? {
						queryKey: ['ohlcv', resolution.split('-')[1], resolution.split('-')[0], pool.id, gtChain],
						queryFn: () =>
							getOHLCVPool(pool.id.split('_')[1], gtChain, resolution.split('-')[1], resolution.split('-')[0]),
						refetchInterval: 100000
				  }
				: null
		]
	});
	const data = res?.filter((r) => r.status === 'success') ?? [];
	const susscessOHLCVs: any[][] =
		(res?.filter((r) => r.status === 'success' && !!r.data && r.data) ?? []).map((r) => r.data) ?? [];
	const loadingPools = res?.filter((r) => r.status === 'loading') ?? [];

	return {
		isLoaded: loadingPools.length === 0,
		isLoading: data.length >= 1 ? false : true,
		susscessOHLCVs: ((susscessOHLCVs[0] || [])
			.sort((a, b) => a[0] - b[0])
			.map((c) => {
				return {
					ts: c[0],
					o: c[1],
					h: c[2],
					l: c[3],
					c: c[4],
					v: c[5]
				};
			}) || []) as IOHLCV[],
		refetch: () => res?.forEach((r) => r.refetch()),
		dtChainID: gtChain,
		loadingPools
	};
}
