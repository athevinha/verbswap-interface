import { Button, Flex, Link, List, ListIcon, ListItem, Skeleton, Text, ToastId, useToast } from '@chakra-ui/react';
import { useAddRecentTransaction, useConnectModal } from '@rainbow-me/rainbowkit';
import { useQueries } from '@tanstack/react-query';
import { ethers, utils } from 'ethers';
import { useRouter } from 'next/router';
import { Fragment, useMemo, useRef, useState } from 'react';
import Logo from '~/public/favicon.png';
import styled from 'styled-components';
import {
	useAccount,
	useBlockNumber,
	useContractRead,
	useFeeData,
	useNetwork,
	useSigner,
	useSwitchNetwork
} from 'wagmi';
import { allChains } from '~/components/WalletProvider/chains';
import { useDebounce } from '~/hooks/useDebounce';
import PrivateSale from '~/pages/privatesale';
import { useBalance } from '~/queries/useBalance';
import { PrivateSale__factory } from '~/typechain-types';
import { formatAmount } from '~/utils/formatAmount';
import { IconImage } from '../Aggregator/Search';
import { InputAmountAndTokenSelect } from '../InputAmountAndTokenSelect';
import { TransactionModal } from '../TransactionModal';
import Telegram from '../Icons/Telegram';
import Swap from '../Icons/Swap';
import MoneyBagOutline from '../Icons/MoneyBagOutline';
import Wallet from '../Icons/Wallet';
import Swap2 from '../Icons/Swap_2';
import { providers } from '../Aggregator/rpcs';
import BigNumber from 'bignumber.js';
import { AddIcon } from '@chakra-ui/icons';
import TwitterIcon from '../Icons/TwitterIcon';

const Body = styled.div<{ showRoutes: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 16px;
	width: 100%;
	max-width: 30rem;
	border: 1px solid #2f333c;
	align-self: flex-start;

	z-index: 1;

	@media screen and (min-width: ${({ theme }) => theme.bpLg}) {
		position: sticky;
		top: 24px;
	}
	@media screen and (max-width: ${({ theme }) => theme.bpMed}) {
		margin-top: 1rem !important;
	}

	box-shadow: ${({ theme }) =>
		theme.mode === 'dark'
			? '10px 0px 50px 10px rgba(26, 26, 26, 0.9);'
			: '10px 0px 50px 10px rgba(211, 211, 211, 0.9);;'};

	border-radius: 16px;
	text-align: left;
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	min-height: 100%;
	text-align: center;
	display: flex;
	flex-direction: column;
	grid-row-gap: 24px;
	margin: 60px auto;

	h1 {
		font-weight: 500;
	}

	#gib-img-l,
	#gib-img-r {
		display: none;
	}

	@media screen and (min-width: 768px) {
		#gib-img-l,
		#gib-img-r {
			display: initial;
		}
	}

	@media screen and (min-width: ${({ theme }) => theme.bpMed}) {
		top: 0px;
	}

	@media screen and (max-width: ${({ theme }) => theme.bpMed}) {
		flex-direction: column;
		margin-bottom: 100px;
		display: flex;
	}
`;

const BodyWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50vvw;
	z-index: 1;
	position: relative;
	justify-content: center;

	& > * {
		margin: 0 auto;
	}

	@media screen and (min-width: ${({ theme }) => theme.bpLg}) {
		flex-direction: row;
		align-items: flex-start;
		justify-content: center;
		gap: 24px;

		& > * {
			flex: 1;
			margin: 0;
		}
	}
`;

const SwapWrapper = styled.div`
	margin-top: auto;
	min-height: 40px;
	width: 100%;
	display: flex;
	gap: 4px;
	flex-wrap: wrap;

	& > button {
		flex: 1;
	}
`;

const icons = {
	bnb: 'https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970',
	verb: Logo.src
};

const VERB = {
	name: 'Verb',
	label: 'Verb',
	symbol: 'VERB',
	address: '0xDa4346FD3345b485FF6d2ebeE236aF565eB11065'.toLowerCase(),
	value: '0xDa4346FD3345b485FF6d2ebeE236aF565eB11065'.toLowerCase(),
	decimals: 18,
	logoURI: icons.verb,
	chainId: 56,
	geckoId: null
};

const BNB = {
	name: 'Binance Coin',
	label: 'BNB',
	symbol: 'BNB',
	address: ethers.constants.AddressZero,
	value: ethers.constants.AddressZero,
	decimals: 18,
	logoURI: icons.bnb,
	chainId: 56,
	geckoId: null
};

const selectedChain = allChains.find(({ id }) => id === 56);
const fromTokensList = [];
const toTokensList = [];
export const PRIVATE_SALE_ADDRESS = '0x1d305113917d98adb5bbcc948e823bd6d8f4464d';
export const PRIVATE_SALE_CHAIN_ID = 56;
export const TELEGRAM_GROUP = 'https://t.me/verbgroup';
export const TWITTER_LINK = 'https://twitter.com/verb_network';
export const TELEGRAM_CHANNEL = 'https://t.me/verbchannel';
export const WALLET_SUBMIT_FORM = 'https://fey8a7u9qc2.typeform.com/to/vwEZ1Z5r';
export const decodeLog = (log: any) => {
	const iface = new ethers.utils.Interface(PrivateSale__factory.abi);
	return iface.parseLog(log).args;
};
export default function PrivateSaleContribute() {
	// wallet stuff
	const { data: signer } = useSigner();
	const { address, isConnected } = useAccount();
	const { chain: chainOnWallet } = useNetwork();
	const { openConnectModal } = useConnectModal();
	const { switchNetwork } = useSwitchNetwork();
	const addRecentTransaction = useAddRecentTransaction();
	const { data: isInWhiteList, isFetching: isFetchingInWhiteList } = useContractRead({
		abi: PrivateSale__factory.abi,
		chainId: PRIVATE_SALE_CHAIN_ID,
		address: PRIVATE_SALE_ADDRESS,
		args: [address],
		functionName: 'whitelist'
	});
	const { data: isICOActive, isFetching: isFetchingICOActive } = useContractRead({
		abi: PrivateSale__factory.abi,
		chainId: PRIVATE_SALE_CHAIN_ID,
		address: PRIVATE_SALE_ADDRESS,
		functionName: 'icoActive'
	});
	const { data: isContributed, isFetching: isFetchingIsContributed } = useContractRead({
		abi: PrivateSale__factory.abi,
		chainId: PRIVATE_SALE_CHAIN_ID,
		address: PRIVATE_SALE_ADDRESS,
		args: [address],
		functionName: '	contribute'
	});
	const { data: isClaimedTokens, isFetching: isFetchingClaimedTokens } = useContractRead({
		abi: PrivateSale__factory.abi,
		chainId: PRIVATE_SALE_CHAIN_ID,
		address: PRIVATE_SALE_ADDRESS,
		args: [address],
		functionName: 'claimedTokens'
	});
	const useICOInformation = () => {
		const ca = PrivateSale__factory.connect(PRIVATE_SALE_ADDRESS, providers.bsc);
		const _res = useQueries({
			queries: [
				{
					queryKey: ['currentRate'],
					queryFn: () => ca.currentRate(),
					refetchInterval: 10000,
					refetchOnWindowFocus: true,
					refetchIntervalInBackground: true
				},
				{
					queryKey: ['totalContributions'],
					queryFn: () => ca.totalContributions(),
					refetchInterval: 10000,
					refetchOnWindowFocus: true,
					refetchIntervalInBackground: false
				},
				{
					queryKey: ['totalParticipations'],
					queryFn: () => ca.totalParticipations(),
					refetchInterval: 10000,
					refetchOnWindowFocus: true,
					refetchIntervalInBackground: false
				}
			]
		});
		return {
			currentRate: {
				value: Number(_res[0].data || 0),
				isLoading: _res[0].isLoading
			},
			totalContributions: {
				value: utils.formatEther(_res[1].data || 0),
				isLoading: _res[1].isLoading
			},
			totalParticipations: {
				value: Number(_res[2].data || 0),
				isLoading: _res[2].isLoading
			}
		};
	};
	const { currentRate, totalContributions, totalParticipations } = useICOInformation();
	// const { data: currentRate, isFetching: isFetchingCurrentRate } = useContractRead({
	// 	abi: PrivateSale__factory.abi,
	// 	chainId: PRIVATE_SALE_CHAIN_ID,
	// 	address: PRIVATE_SALE_ADDRESS,
	// 	functionName: 'currentRate'
	// });
	// const { data: maxContribution, isFetching: isFetchingMaxContribution } = useContractRead({
	// 	abi: PrivateSale__factory.abi,
	// 	chainId: PRIVATE_SALE_CHAIN_ID,
	// 	address: PRIVATE_SALE_ADDRESS,
	// 	args: [address],
	// 	functionName: 'maxContribution'
	// });
	const { data: blockNumber } = useBlockNumber({
		chainId: 56,
		watch: true
	});

	const [[amount, amountOut], setAmount] = useState<[number | string, number | string]>(['10', '']);

	// post swap states
	const [txModalOpen, setTxModalOpen] = useState(false);
	const [txUrl, setTxUrl] = useState('');
	const confirmingTxToastRef = useRef<ToastId>();
	const toast = useToast();

	// debounce input amount and limit no of queries made to aggregators api, to avoid CORS errors
	const [debouncedAmount, debouncedAmountOut] = useDebounce([formatAmount(amount), formatAmount(amountOut)], 300);

	// get selected chain and tokens from URL query params
	const router = useRouter();

	const [{ fromTokenAddress, toTokenAddress }, setTokens] = useState({
		fromTokenAddress: BNB.address,
		toTokenAddress: VERB.address
	});

	// final tokens data
	const { finalSelectedFromToken, finalSelectedToToken } = {
		finalSelectedFromToken: fromTokenAddress === BNB.address ? BNB : VERB,
		finalSelectedToToken: toTokenAddress === BNB.address ? BNB : VERB
	};

	// format input amount of selected from token
	// const amountWithDecimals = BigNumber(debouncedAmount && debouncedAmount !== '' ? debouncedAmount : '0')
	// 	.times(BigNumber(10).pow(finalSelectedFromToken?.decimals || 18))
	// 	.toFixed(0);
	// const amountOutWithDecimals = BigNumber(debouncedAmountOut && debouncedAmountOut !== '' ? debouncedAmountOut : '0')
	// 	.times(BigNumber(10).pow(finalSelectedToToken?.decimals || 18))
	// 	.toFixed(0);

	// selected from token's balances
	const balance = useBalance({ address, token: finalSelectedFromToken?.address, chainId: selectedChain.id });
	// selected from token's balances
	const toTokenBalance = useBalance({ address, token: finalSelectedToToken?.address, chainId: selectedChain.id });

	const { data: gasPriceData } = useFeeData({
		chainId: selectedChain.id,
		enabled: true
	});

	const onFromTokenChange = (token) => {
		router.push({ pathname: router.pathname, query: { ...router.query, from: token.address } }, undefined, {
			shallow: true
		});
	};
	const onToTokenChange = (token) => {
		router.push({ pathname: router.pathname, query: { ...router.query, to: token?.address || undefined } }, undefined, {
			shallow: true
		});
	};
	const onMaxClick = () => {
		if (balance.data && balance.data.formatted && !Number.isNaN(Number(balance.data.formatted))) {
			if (gasPriceData?.formatted?.gasPrice && finalSelectedFromToken?.address === ethers.constants.AddressZero) {
				const gas = (+100 * +gasPriceData?.formatted?.gasPrice * 2) / 1e18;

				const amountWithoutGas = +balance.data.formatted - gas;

				setAmount([amountWithoutGas, '']);
			} else {
				setAmount([balance.data.formatted === '0.0' ? 0 : balance.data.formatted, '']);
			}
		}
	};
	const [isContributeCall, setIsContributeCall] = useState<boolean>(false);
	const [isClaimCall, setIsClaimCall] = useState<boolean>(false);
	const [txHash, setTxHash] = useState<string>('');
	const CallContribute = async () => {
		try {
			const ca = PrivateSale__factory.connect(PRIVATE_SALE_ADDRESS, signer);
			setIsContributeCall(true);
			const a = await ca.callStatic.contribute({
				value: utils.parseEther(amount.toString())
			});
			console.log('#aa', a);
			const tx = await ca.contribute({
				value: utils.parseEther(amount.toString())
			});
			const res = await tx.wait();
			setTxHash(res.transactionHash);
			toast({
				title: 'Contribute success',
				description: `Contribute value: ${decodeLog(res.logs[2]).amount} ${BNB.symbol}`,
				status: 'success',
				duration: 2000,
				isClosable: true
			});
			setIsContributeCall(false);
			return res;
		} catch (error) {
			setIsContributeCall(false);
			toast({
				title: 'Contribute error',
				description: JSON.stringify(error?.reason || error.message || error),
				status: 'error',
				duration: 2000,
				isClosable: true
			});
		}
	};

	const CallClaim = async () => {
		try {
			const ca = PrivateSale__factory.connect(PRIVATE_SALE_ADDRESS, signer);
			setIsClaimCall(true);
			const a = await ca.callStatic.claimTokens();
			console.log('#aa', a);
			const tx = await ca.claimTokens();
			const res = await tx.wait();
			setTxHash(res.transactionHash);
			toast({
				title: 'Claim success',
				description: `Claim value: ${amount} ${VERB.symbol}`,
				status: 'success',
				duration: 2000,
				isClosable: true
			});
			setIsClaimCall(false);
			return res;
		} catch (error) {
			setIsClaimCall(false);
			console.log(error);
			toast({
				title: 'Claim error',
				description: JSON.stringify(error?.reason || error.message || error),
				status: 'error',
				duration: 2000,
				isClosable: true
			});
		}
	};
	return (
		<Wrapper>
			{/* <Heading>Arbitrum Airdrop X DefiLlama</Heading>

			<Text color={'orange.400'} fontSize="16px" mb={'8px'}>
				To get your txs accepted you need to increase priority fee and max fee in metamask.
			</Text> */}
			<BodyWrapper>
				<Body showRoutes={false}>
					<Flex flexDir="column" gap="4px" pos="relative">
						<InputAmountAndTokenSelect
							placeholder={'0.0'}
							setAmount={setAmount}
							type="amountIn"
							amount={amount}
							tokens={fromTokensList}
							token={finalSelectedFromToken}
							onSelectTokenChange={onFromTokenChange}
							selectedChain={selectedChain as any}
							balance={balance.data?.formatted}
							onMaxClick={onMaxClick}
							// tokenPrice={fromTokenPrice}
							customSelect={
								<Button
									display="flex"
									gap="6px"
									flexWrap="nowrap"
									alignItems="center"
									w="150px"
									borderRadius="8px"
									bg="#222429"
									maxW={{ base: '100%', md: '9rem' }}
									p="12px"
								>
									<IconImage
										src={finalSelectedFromToken.logoURI}
										onError={(e) => (e.currentTarget.src = '/placeholder.png')}
									/>

									<Text
										as="span"
										color="white"
										overflow="hidden"
										whiteSpace="nowrap"
										textOverflow="ellipsis"
										fontWeight={400}
									>
										{finalSelectedFromToken.symbol}
									</Text>
								</Button>
							}
						/>

						<InputAmountAndTokenSelect
							placeholder={'0.0'}
							setAmount={setAmount}
							type="amountOut"
							amount={Number(String(amount).replaceAll(' ', '')) * currentRate?.value}
							tokens={toTokensList}
							token={finalSelectedToToken}
							onSelectTokenChange={onToTokenChange}
							selectedChain={selectedChain as any}
							balance={toTokenBalance.data?.formatted}
							label="Receive"
							// tokenPrice={toTokenPrice}
							disabled
							// priceImpact={selectedRoutesPriceImpact}
							customSelect={
								<Button
									display="flex"
									gap="6px"
									flexWrap="nowrap"
									alignItems="center"
									w="150px"
									borderRadius="8px"
									bg="#222429"
									maxW={{ base: '100%', md: '9rem' }}
									p="12px"
								>
									<IconImage
										src={finalSelectedToToken.logoURI}
										onError={(e) => (e.currentTarget.src = '/placeholder.png')}
									/>

									<Text
										as="span"
										color="white"
										overflow="hidden"
										whiteSpace="nowrap"
										textOverflow="ellipsis"
										fontWeight={400}
									>
										{finalSelectedToToken.symbol}
									</Text>
								</Button>
							}
						/>
					</Flex>
					{/* {isICOActive ? ( */}

					{/* ) : (
						''
					)} */}

					<SwapWrapper>
						{!isConnected ? (
							<Button variant="outline" onClick={openConnectModal} borderRadius="32px">
								<Wallet />
								<Text marginLeft="8px">Connect Wallet</Text>
							</Button>
						) : chainOnWallet.id !== PRIVATE_SALE_CHAIN_ID ? (
							<Button variant="outline" borderRadius="32px" onClick={() => switchNetwork(PRIVATE_SALE_CHAIN_ID)}>
								<Swap2 />
								<Text marginLeft="8px">Switch Network</Text>
							</Button>
						) : !isInWhiteList ? (
							isFetchingInWhiteList ? (
								// <Button disabled>
								<Skeleton h={10} colorScheme={'green'} w={'100%'} />
							) : (
								// </Button>
								<Button
									onClick={() => {
										window.open(TELEGRAM_GROUP, '_blank');
									}}
									padding="10px 12px"
									variant="outline"
									borderRadius="32px"
								>
									<Telegram color="white" size={15} />
									<Text marginLeft="8px">John whitelist now!</Text>
								</Button>
							)
						) : !isICOActive ? (
							<Button disabled variant="outline" padding="10px 12px" borderRadius="32px">
								Private sale starts soon!
							</Button>
						) : !isContributed ? (
							<Button
								onClick={CallContribute}
								disabled={isContributeCall}
								variant="outline"
								padding="10px 12px"
								borderRadius="32px"
							>
								<MoneyBagOutline size={15} />{' '}
								<Text ml={'8px'}>{isContributeCall ? 'Pending...' : 'Contribute now!'}</Text>
							</Button>
						) : isICOActive ? (
							<Button disabled variant="outline" padding="10px 12px" borderRadius="32px">
								Claim after private sale close!
							</Button>
						) : !isClaimedTokens ? (
							<Button
								disabled={isClaimCall}
								onClick={CallClaim}
								colorScheme="green"
								variant="outline"
								padding="10px 12px"
								borderRadius="32px"
							>
								<MoneyBagOutline size={15} />{' '}
								<Text ml={'8px'}>{isClaimCall ? 'Pending...' : `Claim $${VERB.symbol}!`} </Text>
							</Button>
						) : (
							<Button disabled variant="outline" padding="10px 12px" borderRadius="32px">
								<MoneyBagOutline size={15} /> <Text ml={'8px'}>You've claimed ${VERB.symbol}</Text>
							</Button>
						)}
					</SwapWrapper>
				</Body>
				<Body showRoutes={false}>
					<Fragment>
						<Text display="flex" justifyContent="space-between" gap="8px" alignItems="center">
							<span>ICO status</span>
							<Text color={isICOActive ? 'orange.400' : 'gray'}>{isICOActive ? 'In Progress' : 'Not started yet'}</Text>
						</Text>
						<Text display="flex" justifyContent="space-between" gap="8px" alignItems="center">
							<span>Current Rate</span>
							{isICOActive ? (
								<span>
									{totalParticipations.isLoading ? (
										<Skeleton w={20} h={5} />
									) : (
										`${currentRate?.value.toLocaleString()} ${VERB.symbol} = 1 ${BNB.symbol}`
									)}
								</span>
							) : (
								''
							)}
						</Text>
						<Text display="flex" justifyContent="space-between" gap="8px" alignItems="center">
							<span>Total Participations</span>
							<span>
								{totalParticipations.isLoading ? <Skeleton w={20} h={5} /> : totalParticipations?.value + ' Walles'}
							</span>
						</Text>
						<Text
							display="flex"
							justifyContent="space-between"
							gap="8px"
							alignItems="center"
							borderBottom="1px solid #373944"
							paddingBottom={5}
						>
							<span>Total Contributions Value</span>
							<span>
								{totalContributions.isLoading ? <Skeleton w={20} h={5} /> : totalContributions?.value + ' BNB'}
							</span>
						</Text>
					</Fragment>
					<Text fontSize={'16px'} textAlign="left" fontWeight="300">
						<Text color="green.500" as="span" fontWeight="500">
							$VERB{' '}
						</Text>{' '}
						Private Sale Participate Rules
					</Text>
					<List spacing={3}>
						<ListItem>
							{' '}
							<ListIcon color="green.500" />
							Follow on Twitter:{' '}
							<Link color={'blue.400'} href={TWITTER_LINK} isExternal>
								@VERB_network
							</Link>
						</ListItem>
						<ListItem>
							{' '}
							<ListIcon color="green.500" />
							Subscribe to Telegram:{' '}
							<Link color={'blue.400'} href={TELEGRAM_CHANNEL} isExternal>
								VERB Official Channel
							</Link>
						</ListItem>
						<ListItem>
							{' '}
							<ListIcon color="green.500" />
							Join Private Sale Chat:{' '}
							<Link color={'blue.400'} href={TELEGRAM_GROUP} isExternal>
								VERB Official Private Sale Chat
							</Link>
						</ListItem>
						<ListItem>
							{' '}
							<ListIcon color="green.500" />
							Submit Wallet:{' '}
							<Link color={'blue.400'} href={WALLET_SUBMIT_FORM} isExternal>
								Participate Now
							</Link>{' '}
							to join <b>whitelist</b>
						</ListItem>
					</List>
				</Body>
			</BodyWrapper>

			<TransactionModal open={txModalOpen} setOpen={setTxModalOpen} link={txUrl} />
		</Wrapper>
	);
}
