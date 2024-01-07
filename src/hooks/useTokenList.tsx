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

const chains = getAllChains();
const tokensToRemove = {
	1: {
		['0xB8c77482e45F1F44dE1745F52C74426C631bDD52'.toLowerCase()]: true
	}
};

const FANTOM_ID = 250;

const oneInchChains = {
	ethereum: 1,
	bsc: 56,
	polygon: 137,
	optimism: 10,
	arbitrum: 42161,
	avax: 43114,
	gnosis: 100,
	fantom: 250,
	klaytn: 8217
};

const fixTotkens = (tokenlist) => {
	if (!tokenlist[66]) return tokenlist;
	if (tokenlist[66])
		// OKX token logo
		tokenlist[66][0].logoURI = tokenlist[66][1]?.logoURI || '';
	// BTC -> BTC.b
	(
		tokenlist[43114]?.find(({ address }) => address.toLowerCase() === '0x152b9d0fdc40c096757f570a51e494bd4b943e50') || {
			symbol: 'BTC.b'
		}
	).symbol = 'BTC.b';
	//RSR address
	// tokenlist[1].find(({ address }) => address.toLowerCase() === '0x8762db106b2c2a0bccb3a80d1ed41273552616e8').address =
	// 	'0x320623b8e4ff03373931769a31fc52a4e78b5d70';
	// XDAI -> DAI
	(
		tokenlist[1]?.find(({ address }) => address.toLowerCase() === '0x6b175474e89094c44da98b954eedeac495271d0f') || {
			symbol: 'DAI'
		}
	).symbol = 'DAI';

	(
		tokenlist[1]?.find(
			({ address }) => address.toLowerCase() === '0x249cA82617eC3DfB2589c4c17ab7EC9765350a18'.toLowerCase()
		) || { logoURI: 'logoURI' }
	).logoURI = protoclIconUrl('verse');

	return tokenlist;
};

const markMultichain = (tokens) => {
	const multichainList = Object.values(multichainListRaw);
	if (!tokens[FANTOM_ID]) return tokens;
	tokens[FANTOM_ID] = tokens[FANTOM_ID].map((token) => {
		const isMultichain = !!multichainList.find(
			(multitoken: any) => multitoken.address?.toLowerCase() === token.address.toLowerCase()
		);

		return {
			...token,
			isMultichain
		};
	});

	return tokens;
};

const fetchsTokenList = [
	// fetch('https://defillama-datasets.llama.fi/tokenlist/all.json')
	// 	.then((res) => res.json())
	// 	.catch((e) => []),
	// fetch('https://defillama-datasets.llama.fi/tokenlist/logos.json')
	// 	.then((res) => res.json())
	// 	.catch((e) => []),
	...Object.values(oneInchChains).map(async (chainId, _) =>
		fetch(`https://tokens.1inch.io/v1.1/${chainId}`)
			.then((r) => r.json())
			.then((res) =>
				Object.values(res || {}).map((token: { address: string }) => ({
					...token,
					chainId
				}))
			)
			.catch((e) => [])
	),
	fetch('https://token-list.sushi.com/')
		.then((r) => r.json())
		.then((r) =>
			r.map((token) => ({
				...token,
				logoURI: `https://cdn.sushi.com/image/upload/f_auto,c_limit,w_40,q_auto/tokens/${token.chainId}/${token.address}.jpg`
			}))
		)
		.catch((e) => []),

	fetch('https://raw.githubusercontent.com/0xngmi/tokenlists/master/canto.json')
		.then((res) => res.json())
		.catch((e) => [])
		.then((r) => r.filter((t) => t.chainId === 7700)),
	fetch('https://raw.githubusercontent.com/muteio/token-directory/main/zksync.json')
		.then((res) => res.json())
		.catch((e) => [])
		.then((r) => r.filter((t) => t.chainId === 324)),
	fetch('https://unpkg.com/quickswap-default-token-list@latest/build/quickswap-default.tokenlist.json')
		.then((res) => res.json())
		.catch((e) => [])
		.then((r) => r.tokens.filter((t) => t.chainId === 1101)),
	fetch('https://ks-setting.kyberswap.com/api/v1/tokens?page=1&pageSize=100&isWhitelisted=true&chainIds=59144')
		.then((r) => r.json())
		.then((r) => r?.data?.tokens.filter((t) => t.chainId === 59144))
		.catch((e) => []),
	...DEFAULT_LIST_OF_LISTS.map((url) => {
		return fetch(url)
			.then((r) => r.json())
			.then((res) => res.tokens)
			.catch((e) => []);
	})
];
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
	// const tokensByChain = mapValues(
	// 	groupBy(
	// 		[
	// 			...res
	// 				.filter((r) => r.isSuccess)
	// 				.map((r) => r.data)
	// 				.flat()
	// 				.filter((t) => t && t?.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'),
	// 			...nativeTokens
	// 		],
	// 		'chainId'
	// 	),
	// 	(val) => uniqBy(val, (token: IToken) => (token?.address || '').toLowerCase())
	// );
	// // const resFilter = useQueries({
	// // 	queries: [
	// // 		{
	// // 			queryKey: ['filterTokensByChain__'],
	// // 			queryFn: () => filterTokensByChain(tokensByChain),
	// // 			refetchInterval: 100000,
	// // 			refetchOnWindowFocus: false,
	// // 			refetchIntervalInBackground: false
	// // 		}
	// // 	]
	// // });
	// let tokensFiltered = mapValues(tokensByChain, (val, key) => {
	// 	return val
	// 		.filter((token) => typeof token.address === 'string' && !tokensToRemove[key]?.[token.address.toLowerCase()])
	// 		.map((token) => ({ ...token, address: token.address.toLowerCase() }));
	// });

	// tokensFiltered = fixTotkens(tokensFiltered);
	// tokensFiltered = markMultichain(tokensFiltered);

	// let tokenlist = {};
	// const formatAndSortTokens = (tokens, chain) => {
	// 	return tokens
	// 		.map((t) => {
	// 			// const geckoId =
	// 			// 	geckoList && geckoList.length > 0
	// 			// 		? geckoList.find((geckoCoin) => geckoCoin.symbol === t.symbol?.toLowerCase())?.id ?? null
	// 			// 		: null;

	// 			// const token = Array.isArray(topTokensByVolume?.[chain])
	// 			// 	? topTokensByVolume[chain]?.find((item) => item?.token0?.address?.toLowerCase() === t.address?.toLowerCase())
	// 			// 	: null;

	// 			// const volume24h =
	// 			// 	Number(token?.attributes?.from_volume_in_usd ?? 0) + Number(token?.attributes?.to_volume_in_usd ?? 0);

	// 			return {
	// 				...t,
	// 				label: t.symbol,
	// 				value: t.address,
	// 				// geckoId,
	// 				logoURI: t.ownLogoURI || `https://token-icons.llamao.fi/icons/tokens/${t.chainId}/${t.address}?h=20&w=20`,
	// 				logoURI2:
	// 					t.logoURI ||
	// 					// || logos[geckoId]
	// 					null
	// 				// volume24h
	// 			};
	// 		})
	// 		.sort((a, b) => (b.address === ethers.constants.AddressZero ? 1 : b.volume24h - a.volume24h));
	// };
	// for (const chain in tokensFiltered) {
	// 	tokenlist[chain] = [...formatAndSortTokens(tokensFiltered[chain] || [], chain)];
	// }

	// console.log('#', tokensFiltered);
	// return tokenlist;
}
