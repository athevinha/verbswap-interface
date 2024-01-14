import { Repeat } from 'react-feather';
import Link from 'next/link';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import MoneyBagOutline from '../Icons/MoneyBagOutline';
import { useWindowSize } from '~/hooks/useWindowSize';
import TokenomicsChart from './TokenomicsChart';
import AggregatorPrivateSaleContainer from '~/components/PrivateSale/PrivateSaleContribute';
import PrivateSaleContribute from '~/components/PrivateSale/PrivateSaleContribute';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
const VerbSwapGeneralIntro = () => {
	const { isPhone: above768 } = useWindowSize();
	const router = useRouter();
	const renderVerbSwapIntroDEX = () => {
		return (
			<Text fontWeight={400} fontSize="18px" lineHeight="28px" textAlign="center">
				VerbSwap, the <b>Meta Aggregators</b>. We provide our traders withsuperior token prices by analyzing rates
				across thousands of exchanges instantly!
			</Text>
		);
	};

	const renderVerbSwapIntroAMM = () => {
		return (
			<Text as="span" fontWeight={400} fontSize="18px" lineHeight="28px" textAlign="center">
				VerbSwap is also an automated market maker (AMM) with <b>concentrated liquidity</b>. Liquidity providers can add
				liquidity to our pools & <b>earn fees</b>!
			</Text>
		);
	};

	const renderSwapNowButton = () => {
		return (
			<Button
				border="1px solid gray"
				onClick={() => {
					router.push('/');
				}}
				style={{
					width: '216px',
					padding: '10px 12px',
					borderRadius: '32px'
				}}
			>
				<Repeat size={20} />
				<Text fontSize="14px" marginLeft="8px">
					Swap Now
				</Text>
			</Button>
		);
	};

	const renderStartEarningButton = () => {
		return (
			<Button
				border="1px solid gray"
				style={{
					width: '216px',
					padding: '10px 12px',
					borderRadius: '32px'
				}}
			>
				<ExternalLinkIcon color="white" size={20} />
				<Text fontSize="14px" marginLeft="8px">
					Learn more
				</Text>
			</Button>
		);
	};

	if (above768) {
		return (
			<Box
				style={{
					marginTop: '36px',
					display: 'flex',
					flexFlow: 'column',
					alignItems: 'center',
					gap: '36px',
					padding: '0px'
				}}
				textAlign="center"
			>
				<Text>
					VerbSwap, the <b>Meta Aggregators</b>. We provide our traders withsuperior token prices by analyzing rates
					across thousands of exchanges instantly!
				</Text>{' '}
				{renderStartEarningButton()}
				<Text>
					VerbSwap is also an automated market maker (AMM) with <b>concentrated liquidity</b>. Liquidity providers can
					add liquidity to our pools & <b>earn fees</b>!
				</Text>
				{renderSwapNowButton()}
			</Box>
		);
	}

	return (
		<Flex
			marginTop="32px"
			marginBottom={above768 ? '100px' : '0px'}
			width="60%"
			marginLeft="20%"
			paddingLeft="32px"
			paddingRight="32px"
			rowGap="48px"
		>
			<Flex maxWidth={'50%'} flexDirection={'column'} alignItems="center" rowGap="16px">
				{renderVerbSwapIntroDEX()}
				{renderSwapNowButton()}
			</Flex>
			<Flex maxWidth={'50%'} flexDirection={'column'} alignItems="center" rowGap="16px">
				{renderVerbSwapIntroAMM()}
				{renderStartEarningButton()}
			</Flex>
		</Flex>
	);
};

export default VerbSwapGeneralIntro;
