import ConnectButton from '~/components/Aggregator/ConnectButton';
import Header from '~/components/Aggregator/Header';
import DexsContainer from '~/components/Dexs';
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
export default function Dexs() {
	return (
		<Layout title={`Dexs - VerbSwap`} defaultSEO>
			<Header>
				<ConnectButton />
			</Header>
			<DexsContainer />
		</Layout>
	);
}
