import { Button, Image, Text } from '@chakra-ui/react';
import styled from 'styled-components';
import { getAllChains } from '../Aggregator/router';
import VerbSwapGeneralIntro from './VerbSwapGeneralIntro';
import bgimg from '~/assets/image/bg.png';
import PrivateSaleContribute from './PrivateSaleContribute';
const chains = getAllChains();
export const Wrap = styled.div`
	width: 100%;
	@media screen and (max-width: 720px) {
		margin-top: 60px;
	}
`;

export const SupportedChain = styled.div`
	display: flex;
	flex-wrap: wrap;

	justify-content: center;
	width: 60%;
	gap: 20px;
	margin: auto;
	margin-top: 32px;
	@media screen and (max-width: ${({ theme }) => theme.bpMed}) {
		width: 100%;
	}
`;
const Wrapped = styled.div`
	width: 100%;
	overflow: hidden;
	margin: 10px auto 40px;
	position: relative;
	top: 36px;
`;
const WrappedLeft = styled.div<{ width?: string }>`
	width: ${(props) => props.width || '80%'};
	@media screen and (max-width: ${({ theme }) => theme.bpMed}) {
		width: 100%;
	}
`;
const WrappedRight = styled.div<{ width?: string }>`
	width: ${(props) => props.width || '20%'};
	@media screen and (max-width: ${({ theme }) => theme.bpMed}) {
		width: 100%;
	}
`;
export default function PrivateContainer() {
	// const { dexs: dexsWidthChart } = useAnalytics(true, false);
	return (
		<Wrap>
			<Text fontSize={['28px', '48px']} textAlign="center" lineHeight={['32px', '60px']} fontWeight="300">
				<Text color="blue.400" as="span" fontWeight="500">
					Seed Round{' '}
					<Text color="green.400" as="span" fontWeight="500">
						A
					</Text>
				</Text>{' '}
				Community{' '}
				<Text fontWeight="500" color="blue.400" as="span">
					Raise
				</Text>{' '}
				Now Open!{' '}
			</Text>

			<SupportedChain>
				{chains.map(({ logoURI, label }, _) => (
					<Image borderRadius={'50%'} src={logoURI} alt={label} key={_} width="36px" height="36px" />
				))}
			</SupportedChain>
			<VerbSwapGeneralIntro />
			<PrivateSaleContribute />
		</Wrap>
	);
}
