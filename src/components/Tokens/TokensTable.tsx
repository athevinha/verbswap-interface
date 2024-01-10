import { ArrowDownIcon, ArrowForwardIcon, ExternalLinkIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
	Table,
	TableContainer,
	Tbody,
	Th,
	Thead,
	Tr,
	Td,
	Tfoot,
	Skeleton,
	Link,
	Text,
	Box,
	Button,
	Spacer
} from '@chakra-ui/react';
import { chain } from 'lodash';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import styled from 'styled-components';
import SwapIcon from '~/assets/svg/swap';
import { useQueryParams } from '~/hooks/useQueryParams';
import { IToken, IGKQuery } from '~/types';
import { formatNumberToKMB, zerofy } from '~/utils';
import { chainNameToId } from '../Aggregator/constants';
import { GREEN, RED } from '../Aggregator/utils/helpers';
import { allChains } from '../WalletProvider/chains';
const Header = styled.div`
	width: 100%;
	text-align: center;
	align-items: center;
	justify-content: space-around;
	display: flex;
	margin-top: 1rem;
`;
export const TIME_OPTIONS = {
	h1: '1H',
	h24: '24H'
};
const Wrapped = styled.div`
	display: block;
	overflow-x: auto;
	overflow-y: hidden;
`;
export default function TokensTable({ topTokens, title }: { topTokens: IGKQuery[]; title?: string }) {
	const { chainName } = useQueryParams();
	const [timeOption, setTimeOption] = useState<{ key: string; value: string }>({
		key: 'h24',
		value: '24H'
	});
	const chainInfor = allChains.filter((c) => c.id === chainNameToId(chainName))?.[0];
	const router = useRouter();
	return (
		<Wrapped>
			{title ? (
				<Header>
					<Text color={'gray.400'} ml={2} fontSize={'15px'}>
						{' '}
						{title}
					</Text>
					<Spacer />
					<Box mr={2}>
						{Object.keys(TIME_OPTIONS).map((key, _) => {
							return (
								<Button
									key={_}
									color={key === timeOption.key ? 'white' : 'gray'}
									colorScheme="blackAlpha"
									fontSize={12}
									onClick={() => {
										setTimeOption({
											key: key,
											value: TIME_OPTIONS[key]
										});
									}}
								>
									{TIME_OPTIONS[key]}
								</Button>
							);
						})}
					</Box>
				</Header>
			) : (
				''
			)}
			<TableContainer mt={2} mb={2}>
				<Table size="sm" overflowX={'hidden'} overflowY={'hidden'}>
					<Thead>
						<Tr>
							<Th>Pool</Th>
							<Th>Base</Th>
							<Th>Quote</Th>
							<Th>Price</Th>
							<Th>Volume </Th>
							<Th>Change </Th>
							<Th>FDV</Th>

							<Th>Tx </Th>
							<Th>Wallets </Th>
						</Tr>
					</Thead>
					<Tbody>
						{topTokens?.length > 0 ? (
							topTokens.map((t, _) => {
								console.log('#t', t);
								return (
									<Tr key={_}>
										<Td>
											<Box
												cursor="pointer"
												display="flex"
												alignItems={'center'}
												gap={1}
												onClick={() => {
													router.push(
														{
															pathname: '/',
															query: {
																chain: chainName,
																from: t.relationships.base_token.data.id.split('_')[1],
																to: t.relationships.quote_token.data.id.split('_')[1]
															}
														},
														undefined,
														{ shallow: true }
													);
												}}
											>
												<Box w={5} h={5}>
													<SwapIcon width="20px" height="20px" />
												</Box>
												<Text color={'blue.200'}>{t.attributes.name.split('0.')[0]}</Text>{' '}
											</Box>
										</Td>
										<Td>
											<Link
												isExternal
												color={'gray.500'}
												href={`${chainInfor?.blockExplorers.default.url}/address/${
													t.relationships.base_token.data.id.split('_')[1]
												}`}
											>
												{t.attributes.name.split(' ')[0]}
												<ExternalLinkIcon mx="2px" />
											</Link>
										</Td>
										<Td>
											<Link
												isExternal
												color={'gray.500'}
												href={`${chainInfor?.blockExplorers.default.url}/address/${
													t.relationships.quote_token.data.id.split('_')[1]
												}`}
											>
												{t.attributes.name.split(' / ')[1].split(' ')[0]}
												<ExternalLinkIcon mx="2px" />
											</Link>
										</Td>
										<Td color={'gray.300'}>${zerofy(Number(t.attributes.base_token_price_usd))}</Td>
										<Td color={'gray.300'}>
											{t.attributes.volume_usd && '$'}
											{Number(t.attributes.volume_usd[timeOption.key]) < 1000
												? zerofy(t.attributes.volume_usd[timeOption.key])
												: formatNumberToKMB(t.attributes.volume_usd[timeOption.key])}
										</Td>
										<Td>
											{Number(t.attributes.price_change_percentage[timeOption.key]) < 0 ? (
												<Text color={RED}>
													{t.attributes.price_change_percentage[timeOption.key]}% <TriangleDownIcon />
												</Text>
											) : (
												<Text color={GREEN}>
													{t.attributes.price_change_percentage[timeOption.key]}% <TriangleUpIcon />
												</Text>
											)}
										</Td>
										<Td color={'gray.300'}>
											{t.attributes.fdv_usd && '$'}
											{formatNumberToKMB(Number(Number(t.attributes.fdv_usd).toFixed(2)) || '')}
										</Td>

										<Td color={'gray.300'}>
											{(
												t.attributes.transactions[timeOption.key].buys + t.attributes.transactions[timeOption.key].sells
											).toLocaleString()}
										</Td>
										<Td color={'gray.300'}>
											{(
												t.attributes.transactions[timeOption.key].buyers +
												t.attributes.transactions[timeOption.key].sellers
											).toLocaleString()}
										</Td>
									</Tr>
								);
							})
						) : (
							<Fragment>
								{Array(10)
									.fill(0)
									.map((a, _) => {
										<Skeleton h={5} key={_} />;
									})}
							</Fragment>
						)}
						{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((a, _) => {
							<Skeleton h={5} key={_} />;
						})}
						{/* <Tr>
						<Td>{p}</Td>
						<Td>millimetres (mm)</Td>
						<Td>millimetres (mm)</Td>
						<Td>millimetres (mm)</Td>
						<Td>millimetres (mm)</Td>
						<Td>millimetres (mm)</Td>
						<Td isNumeric>25.4</Td>
					</Tr>
					<Tr>
						<Td>feet</Td>
						<Td>centimetres (cm)</Td>
						<Td isNumeric>30.48</Td>
					</Tr>
					<Tr>
						<Td>yards</Td>
						<Td>metres (m)</Td>
						<Td isNumeric>0.91444</Td>
					</Tr> */}
					</Tbody>
					{/* <Tfoot>
					<Tr>
						<Th>To convert</Th>
						<Th>into</Th>
						<Th isNumeric>multiply by</Th>
						<Th>Name</Th>
						<Th>Price</Th>
						<Th>Market Cap</Th>
						<Th>Volume (24H)</Th>
						<Th>Price Change (24H)</Th>
						<Th>Tx (24H)</Th>
						<Th>Wallets</Th>
					</Tr>
				</Tfoot> */}
				</Table>
			</TableContainer>
		</Wrapped>
	);
}
