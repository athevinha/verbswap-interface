import { ConnectButton } from '@rainbow-me/rainbowkit';
import styled from 'styled-components';
import { Button, Stack, Text } from '@chakra-ui/react';
import { HistoryModal } from '../HistoryModal';
import Web3AptosButton from '../Auth/Web3AptosModalButton';
import { WalletConnector as AptosWalletConnector } from '@aptos-labs/wallet-adapter-mui-design';
import Wallet from '../Icons/Wallet';

const Wrapper = styled.div`
	position: absolute;
	right: 0px;
	z-index: 100;
	display: flex;
	gap: 8px;
`;

const Connect = ({ tokenList = null, tokensUrlMap = {}, tokensSymbolsMap = {} }) => {
	return (
		<Wrapper>
			<ConnectButton chainStatus={'none'} />
			{/* {tokenList ? <HistoryModal tokensUrlMap={tokensUrlMap} tokensSymbolsMap={tokensSymbolsMap} /> : null} */}
			<Stack>
				<Button >
					<Wallet />
					<Text marginLeft="8px">Connect Aptos</Text>
				</Button>
				<Stack style={{ opacity: '0', position: 'absolute' }}>
					<AptosWalletConnector />
				</Stack>
			</Stack>
		</Wrapper>
	);
};

export default Connect;
