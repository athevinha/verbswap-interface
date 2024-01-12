import {
	ArrowDownIcon,
	ArrowForwardIcon,
	ExternalLinkIcon,
	InfoIcon,
	InfoOutlineIcon,
	TriangleDownIcon,
	TriangleUpIcon
} from '@chakra-ui/icons';
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
	Spacer,
	Image,
	Flex,
	Tooltip
} from '@chakra-ui/react';
import { chain } from 'lodash';
import { useRouter } from 'next/router';
import { Fragment, useMemo, useState } from 'react';
import styled from 'styled-components';
import SwapIcon from '~/assets/svg/swap';
import { useQueryParams } from '~/hooks/useQueryParams';
import { IToken, IGKQuery } from '~/types';
import { formatNumberToKMB, zerofy } from '~/utils';
import { chainNameToId } from '../Aggregator/constants';
import { GREEN, RED } from '../Aggregator/utils/helpers';
import { allChains } from '../WalletProvider/chains';
import { ILMQuery } from './type';
const Header = styled.div`
	width: 100%;
	text-align: center;
	align-items: center;
	margin-top: 1rem;
`;

const Wrapped = styled.div`
	display: block;
	overflow-x: auto;
	overflow-y: hidden;
`;
const TextPercentChange = (value: number) => {
	if (!value) return;
	return Number(value) < 0 ? (
		<Text color={RED}>
			{value}% <TriangleDownIcon />
		</Text>
	) : (
		<Text color={GREEN}>
			{value}% <TriangleUpIcon />
		</Text>
	);
};
export default function DexsTable({
	dexs,
	title,
	sortBy = 'dailyVolume',
	limit
}: // 'change_1d']
{
	dexs: ILMQuery;
	title?: string;
	sortBy?: string;
	limit?: number;
}) {
	const dexsProtocolFilter = useMemo(() => {
		return (dexs?.protocols || [])?.filter((d) => !!d.dailyVolume).sort((a, b) => b[sortBy] - a[sortBy]);
	}, [dexs?.protocols, sortBy]);
	return (
		<Wrapped>
			{title ? (
				<Header>
					<Text color={'gray.400'} ml={2} mb={4} fontSize={'15px'}>
						{' '}
						{title}
					</Text>
					<Spacer />
				</Header>
			) : (
				''
			)}
			<TableContainer mt={2} mb={2}>
				<Table size="sm" overflowX={'hidden'} overflowY={'hidden'}>
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th>Chain</Th>

							<Th>Volume (24H)</Th>
							<Th>Change (24H)</Th>
							<Th>Volume (1M)</Th>
							<Th>Change (1M)</Th>
							<Th>Type</Th>
							<Th>Cumulative</Th>
						</Tr>
					</Thead>
					<Tbody>
						{dexsProtocolFilter.length > 0 ? (
							(limit ? dexsProtocolFilter.slice(0, limit) : dexsProtocolFilter).map((d, _) => {
								if (d.disabled) return;
								return (
									<Tr key={_}>
										<Td maxWidth={'150px'}>
											<Flex alignItems={'center'}>
												<Image
													background={'gray'}
													loading="lazy"
													borderRadius={'50%'}
													src={d.logo}
													w={5}
													h={5}
													mr={1}
												/>
												<Text color={'gray.400'}>{d.name}</Text>
											</Flex>
										</Td>
										<Td>
											<Flex alignItems={'center'} gap={1}>
												<Text>{d.chains.length}</Text>{' '}
												<Tooltip
													opacity={'0.6'}
													background={'black'}
													border={'0.5px solid gray'}
													color={'gray.400'}
													borderRadius={'10px'}
													label={d.chains.map((c, _) => {
														return (
															<Text fontSize={12} key={_} mt={0.5} mb={0.5}>
																{c}
															</Text>
														);
													})}
													fontSize="md"
												>
													<InfoOutlineIcon />
												</Tooltip>
											</Flex>
										</Td>

										<Td>
											<Text>
												{d.dailyVolume && '$'}
												{Number(d.dailyVolume) < 1000
													? zerofy(d.dailyVolume || '')
													: formatNumberToKMB(d.dailyVolume || '')}
											</Text>
										</Td>
										<Td>{TextPercentChange(d.change_1d)}</Td>
										<Td>
											<Text>
												{d.totalVolume30d && '$'}
												{Number(d.totalVolume30d) < 1000
													? zerofy(d.totalVolume30d || '')
													: formatNumberToKMB(d.totalVolume30d || '')}
											</Text>
										</Td>
										<Td>{TextPercentChange(d.change_1m)}</Td>
										<Td>
											<Text>{d.category}</Text>
										</Td>
										<Td>
											<Text>
												{d.totalAllTime && '$'}
												{Number(d.totalAllTime) < 1000
													? zerofy(d.totalAllTime || '')
													: formatNumberToKMB(d.totalAllTime || '')}
											</Text>
										</Td>
									</Tr>
								);
							})
						) : (
							<Tr>
								{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((a, _) => {
									return (
										<Td key={_}>
											<Skeleton h={5} key={_} />
										</Td>
									);
								})}
							</Tr>
						)}

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
