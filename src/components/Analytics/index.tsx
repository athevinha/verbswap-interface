import styled from 'styled-components';
import { getAllChains } from '../Aggregator/router';
import DexsTable from './DexsTable';
import { useAnalytics } from './hooks/useAnalytics';
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
export default function AnalyticsContainer() {
	const { dexs } = useAnalytics();
	return (
		<Wrapped>
			<DexsTable title={'Dexs Volume 📈'} dexs={dexs} />
		</Wrapped>
	);
}
