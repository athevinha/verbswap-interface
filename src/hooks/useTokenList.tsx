import { useQueries } from '@tanstack/react-query';
import { groupBy, mapValues, uniqBy } from 'lodash';
import { getAllChains } from '~/components/Aggregator/router';
import { DEFAULT_LIST_OF_LISTS } from '~/constants/listTokens';
import { IToken } from '~/types';
import multichainListRaw from '../data/multichain/250.json';
import { protoclIconUrl } from '~/utils';
import { ethers } from 'ethers';
import { nativeTokens } from '~/components/Aggregator/nativeTokens';
import { getTokenList } from '~/props/getTokenList';

export function useTokenList() {
	const res = useQueries({
		queries: [
			{
				queryKey: ['getTokenList____'],
				queryFn: () => getTokenList(),
				refetchInterval: 100000,
				refetchOnWindowFocus: false,
				refetchIntervalInBackground: false
			}
		]
	});
	return res[0].data;
}
