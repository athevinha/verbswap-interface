import ConnectButton from '~/components/Aggregator/ConnectButton';
import Header from '~/components/Aggregator/Header';
import Layout from '~/layout';
// export async function getStaticProps() {
// 	const tokenList = await getTokenList();
// 	const sandwichList = await getSandwichList();
// 	const { tokensSymbolsMap, tokensUrlMap } = getTokensMaps(tokenList);
// 	return {
// 		props: {
// 			tokenList,
// 			sandwichList,
// 			tokensSymbolsMap,
// 			tokensUrlMap
// 		}
// 	};
// }
// export async function getStaticProps() {
// 	return {
// 		props: {
// 			tokenList: {},
// 			sandwichList: []
// 		}
// 	};
// }
export default function Deposit(props) {
	return (
		<Layout title={`Deposit - VerbSwap`} defaultSEO>
			<Header>
				<ConnectButton {...props} />
			</Header>
			deposit
		</Layout>
	);
}
