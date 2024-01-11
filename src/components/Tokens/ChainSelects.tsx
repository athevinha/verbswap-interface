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
const TextPercentChange = (value: number) => {
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
export default function TokensTable({ options, value, onChange }: { value: IGKQuery[]; title?: string }) {
	const { chainName } = useQueryParams();

	return <Wrapped></Wrapped>;
}
