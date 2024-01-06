import ConnectButton from '~/components/Aggregator/ConnectButton';
import Header from '~/components/Aggregator/Header';
import Layout from '~/layout';

export default function About(props) {
	return (
		<Layout title={`DEX Aggregator - VerbSwap`} defaultSEO>
			<Header>
				<ConnectButton {...props} />
			</Header>
			{/* <AggregatorContainer {...props} /> */}
		</Layout>
	);
}
