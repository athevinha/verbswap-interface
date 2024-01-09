import { Skeleton, SkeletonText } from '@chakra-ui/react';
import { useState } from 'react';
import styled from 'styled-components';
import ConnectButton from '~/components/Aggregator/ConnectButton';
import Header from '~/components/Aggregator/Header';
import Layout from '~/layout';
// const VITE_TRANSAK_URL = 'https://global.transak.com';
// const VITE_TRANSAK_API_KEY = '48949c0b-2d20-4e3a-a311-51ca91ae8c0d';

// const supportedNetworks: { [chain in ChainId]?: string | null } = {
// 	[ChainId.MAINNET]: 'ethereum',
// 	[ChainId.MATIC]: 'polygon',
// 	[ChainId.ARBITRUM]: 'arbitrum',
// 	[ChainId.OPTIMISM]: 'optimism',
// 	[ChainId.BSCMAINNET]: 'bsc',
// 	[ChainId.AVAXMAINNET]: 'avaxcchain',
// 	[ChainId.FANTOM]: 'fantom',
// 	[ChainId.SOLANA]: 'solana',

// 	[ChainId.ZKSYNC]: null,
// 	[ChainId.CRONOS]: null,
// 	[ChainId.GÖRLI]: null,
// 	[ChainId.MUMBAI]: null,
// 	[ChainId.BSCTESTNET]: null,
// 	[ChainId.AVAXTESTNET]: null,
// 	[ChainId.BTTC]: null,
// 	[ChainId.AURORA]: null
// };
// const supportedCurrencies = [
// 	'AVAX',
// 	'USDC',
// 	'ETH',
// 	'USDS',
// 	'BNB',
// 	'BUSD',
// 	'DAI',
// 	'USDT',
// 	'WBTC',
// 	'FTM',
// 	'MATIC',
// 	'WETH',
// 	'VLX',
// 	'SOL'
// ];

// const transakUrl = `${VITE_TRANSAK_URL}?apiKey=${VITE_TRANSAK_API_KEY}&cryptoCurrencyList=${supportedCurrencies.join(
// 	','
// )}&networks=${Object.values(supportedNetworks).filter(Boolean).join(',')}${
// 	account ? `&walletAddress=${account}` : ''
// }&defaultNetwork=${
// 	supportedNetworks[chainId] || supportedNetworks[ChainId.MAINNET]
// }&excludeFiatCurrencies=SGD&redirectURL=${redirectURL}`;

const Iframe = styled.iframe`
	width: 100%;
	height: 100%;
	border-radius: 10px;
	border: 2px solid gray;
`;
const IframeWrapped = styled.div`
	width: 100%;
	height: 600px;
	text-align: center;
	align-items: center;
`;
export default function Deposit(props) {
	const [loading, setLoading] = useState(true);
	const redirectURL = window.location.hostname.includes('localhost')
		? 'https://verb.com/'
		: window.location.origin + '/';
	const transakUrl = `https://global.transak.com/?apiKey=48949c0b-2d20-4e3a-a311-51ca91ae8c0d&cryptoCurrencyList=AVAX,USDC,ETH,USDS,BNB,BUSD,DAI,USDT,WBTC,FTM,MATIC,WETH,VLX,SOL&networks=ethereum,optimism,bsc,polygon,fantom,arbitrum,avaxcchain&walletAddress=0x5555a222c465b1873421d844e5d89ed8eb3E5555&defaultNetwork=arbitrum&excludeFiatCurrencies=SGD&redirectURL=${redirectURL}`;
	return (
		<IframeWrapped>
			<Iframe
				onLoad={() => {
					setLoading(false);
				}}
				style={
					loading
						? {
								position: 'absolute',
								display: 'none'
						  }
						: {}
				}
				src={transakUrl}
			/>
			{loading ? <Skeleton width={'100%'} height={'100%'} /> : ''}
		</IframeWrapped>
	);
}
