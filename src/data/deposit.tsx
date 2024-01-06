import * as React from 'react';
import { AggregatorContainer } from '~/components/Aggregator';
import ConnectButton from '~/components/Aggregator/ConnectButton';
import Header from '~/components/Aggregator/Header';
import Layout from '~/layout';
import { getSandwichList } from '~/props/getSandwichList';
import { getTokenList } from '~/props/getTokenList';
import { getTokensMaps } from '~/props/getTokensMaps';

export default function Deposit(props) {
	return (
		<Layout title={`DEX Aggregator - VerbSwap`} defaultSEO>
			<Header>
				<ConnectButton {...props} />
			</Header>
			{/* <AggregatorContainer {...props} /> */}
		</Layout>
	);
}
