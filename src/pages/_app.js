import * as React from 'react';
import { ChakraProvider, DarkMode } from '@chakra-ui/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '~/Theme/globals.css';
import { WalletWrapper } from '~/components/WalletProvider';
import { Web3AptosWalletProvider } from '~/components/Auth/Web3AptosModal';

function App({ Component, pageProps }) {
	const [queryClient] = React.useState(() => new QueryClient());

	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ChakraProvider>
					<Web3AptosWalletProvider>
						<DarkMode>
							{isMounted && (
								<WalletWrapper>
									<Component {...pageProps} />
								</WalletWrapper>
							)}
						</DarkMode>
					</Web3AptosWalletProvider>
				</ChakraProvider>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default App;
