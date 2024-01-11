import { chunk } from 'lodash';
import { getTokensByChain } from '~/components/Tokens/hooks/useAnalyticsTokens';
import { normalizeTokens } from '~/utils';

const LIQUDITY_THRESHOLD_USD = 1_500_000;
const PERCENT_SANDWICHED_TRADES = 5;

export const getSandwichList = async () => {
	try {
		const { data: sandwichData } = await fetch(
			`https://public.api.eigenphi.io/?path=/ethereum/30d/sandwiched_pool&apikey=${process.env.EIGEN_API_KEY}`
		).then((res) => res.json());

		const topTokens = await getTokensByChain(1);

		const topPairs =
			topTokens
				?.filter((pair) => Number(pair?.attributes?.reserve_in_usd) > LIQUDITY_THRESHOLD_USD)
				.reduce(
					(acc, pair) => ({
						...acc,
						[normalizeTokens(
							pair.relationships.base_token.data.id.split('_')[1],
							pair.relationships.quote_token.data.id.split('_')[1]
						).join('')]: true
					}),
					{}
				) ?? {};

		const poolAddresses = chunk(
			sandwichData?.map(({ address }) => address),
			30
		);
		const pairsData = (
			await Promise.allSettled(
				poolAddresses.map(
					async (pools) =>
						await fetch(`https://api.dexscreener.com/latest/dex/pairs/ethereum/${pools.join(',')}`).then((r) =>
							r.json()
						)
				)
			)
		)
			.filter(({ status }) => status === 'fulfilled')
			.map(({ value }: any) => value.pairs)
			.flat()
			.sort((a, b) => b.liquidity?.usd - a?.liquidity?.usd);

		const highLiqPairs = pairsData
			.filter((pair) => pair?.liquidity?.usd > LIQUDITY_THRESHOLD_USD)
			.map((pair) => ({ ...pair, id: normalizeTokens(pair?.baseToken?.address, pair?.quoteToken?.address).join('') }));

		const sandwichList = {
			ethereum: pairsData.reduce((acc, pair) => {
				const pairData = sandwichData.find(({ address }) => address.toLowerCase() === pair?.pairAddress?.toLowerCase());
				const pairId = normalizeTokens(pairData?.tokens[0]?.address, pairData?.tokens[1]?.address).join('');
				if (
					!pairData ||
					(pairData.sandwiched / pairData.trades) * 100 < PERCENT_SANDWICHED_TRADES ||
					topPairs[pairId] ||
					highLiqPairs.find(({ id }) => id === pairId)
				)
					return acc;

				return { ...acc, [pairId]: pairData };
			}, {})
		};

		return sandwichList;
	} catch (e) {
		console.log(e);
		return [];
	}
};
