import { useQueries } from '@tanstack/react-query';
import { unionBy, uniqBy } from 'lodash';
import { getTokenList, getTokenListByChain } from '~/props/getTokenList';
import { IToken } from '~/types';

export function useTokenList(chainId: number) {
	const res = useQueries({
		queries: [
			{
				queryKey: ['getTokenList____'],
				queryFn: () => getTokenList(),
				refetchInterval: 100000,
				refetchOnWindowFocus: false,
				refetchIntervalInBackground: false
			},
			{
				queryKey: ['getTokenListByChain____', chainId],
				queryFn: () => getTokenListByChain(chainId),
				refetchInterval: 100000,
				refetchOnWindowFocus: true,
				refetchIntervalInBackground: false
			}
		]
	});

	const tokenList = res[0]?.data;
	if (res[1]?.data?.data?.tokens && tokenList)
		tokenList[chainId] = uniqBy([...tokenList[chainId], ...res[1]?.data?.data?.tokens], (token: IToken) =>
			token.address.toLowerCase()
		);
	return {
		tokenList: tokenList,
		tokenListByChain: res[1]?.data
	};
}
 