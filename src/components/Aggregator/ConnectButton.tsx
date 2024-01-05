import { ConnectButton } from '@rainbow-me/rainbowkit';
import styled from 'styled-components';
import { Button } from '@chakra-ui/react';
import { HistoryModal } from '../HistoryModal';

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
			{tokenList ? <HistoryModal tokensUrlMap={tokensUrlMap} tokensSymbolsMap={tokensSymbolsMap} /> : null}
		</Wrapper>
	);
};

export default Connect;
