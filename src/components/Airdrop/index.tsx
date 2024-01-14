import styled from 'styled-components';
import { getAllChains } from '../Aggregator/router';
const chains = getAllChains();
const Wrapped = styled.div`
	width: 100%;
	overflow-x: hidden;
	overflow-y: auto;
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
export default function AirdropContainer() {
	// const { dexs: dexsWidthChart } = useAnalytics(true, false);
	return <Wrapped>AirdropContainer</Wrapped>;
}
