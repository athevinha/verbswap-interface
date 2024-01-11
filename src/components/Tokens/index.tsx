import { Grid, GridItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useQueryParams } from '~/hooks/useQueryParams';
import { chainNameToId } from '../Aggregator/constants';
import { getAllChains } from '../Aggregator/router';
import ReactSelect from '../MultiSelect';
import { GK_POOL_QUERY, useAnalyticsTokens } from './hooks/useAnalyticsTokens';
import TokensTable from './TokensTable';
const chains = getAllChains();
const Wrapped = styled.div`
	width: 100%;
	overflow: hidden;
`;
const WrappedFlex = styled.div`
	width: 100%;
	display: flex;
	gap: 2rem;

	@media screen and (max-width: ${({ theme }) => theme.bpMed}) {
		display: block;
	}
`;
const Header = styled.div`
	width: 100%;
`;
const WrappedLeft = styled.div`
	width: 50%;
	@media screen and (max-width: ${({ theme }) => theme.bpMed}) {
		width: 100%;
	}
`;
const WrappedRight = styled.div`
	width: 50%;
	@media screen and (max-width: ${({ theme }) => theme.bpMed}) {
		width: 100%;
	}
`;
export default function PoolsContainer() {
	const { chainName } = useQueryParams();
	const { tokens: topTokens } = useAnalyticsTokens(chainNameToId(chainName), GK_POOL_QUERY.TOP_POOLS);
	const { tokens: trendingTokens } = useAnalyticsTokens(chainNameToId(chainName), GK_POOL_QUERY.TRENDING_POOLS);
	const { tokens: newTokens } = useAnalyticsTokens(chainNameToId(chainName), GK_POOL_QUERY.NEW_POOLS);
	const router = useRouter();
	const selectedChain = useMemo(() => {
		return chains.find((c) => c.value === chainName);
	}, [chainName]);
	const onChainChange = (chain) => {
		router.push({
			query: {
				chain: chain.value
			}
		});
		console.log('#chain', chain);
	};
	return (
		<Wrapped>
			<ReactSelect options={chains} value={selectedChain} onChange={onChainChange} />
			<WrappedFlex>
				<WrappedLeft>
					<TokensTable title={'New pools 🎉'} topTokens={newTokens} />
				</WrappedLeft>
				<WrappedRight>
					<TokensTable title={'Trending pools 🔥'} topTokens={trendingTokens} />
					<TokensTable title={'Top pools 📈'} topTokens={topTokens} />
				</WrappedRight>
			</WrappedFlex>
		</Wrapped>
	);
}
