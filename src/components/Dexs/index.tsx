import styled from 'styled-components';
import { getAllChains } from '../Aggregator/router';
import DexsChart from './DexChart';
import DexsOverview from './DexsOverview';
import DexsTable from './DexsTable';
import { useAnalytics } from './hooks/useAnalytics';
const chains = getAllChains();
const Wrapped = styled.div`
	width: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	margin: 10px auto 40px;
	position: relative;
	top: 36px;
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
export default function AnalyticsContainer() {
	const { dexs } = useAnalytics(true, false);
	// const { dexs: dexsWidthChart } = useAnalytics(true, false);
	return (
		<Wrapped>
			<WrappedFlex>
				<WrappedLeft>
					<DexsChart title={'Dexs Volume 🔥'} dexs={dexs} />
				</WrappedLeft>
				<WrappedRight>
					<DexsOverview dexs={dexs} />
				</WrappedRight>
			</WrappedFlex>
			<WrappedFlex>
				<WrappedLeft width="50%">
					<DexsTable title={'Gainer Dexs 🚀'} limit={80} sortBy={'change_1d'} dexs={dexs} />
				</WrappedLeft>
				<WrappedRight width="50%">
					<DexsTable title={'Top Dexs 📈'} dexs={dexs} sortBy={'dailyVolume'} limit={80} />
				</WrappedRight>
			</WrappedFlex>
		</Wrapped>
	);
}
