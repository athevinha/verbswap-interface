import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, Skeleton, Spacer, Text } from '@chakra-ui/react';
import { Fragment, useMemo } from 'react';
import styled from 'styled-components';
import { formatNumberToKMB } from '~/utils';
import { GREEN, RED } from '../Aggregator/utils/helpers';
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
export default function DexsOverview({ dexs, title }: { dexs: ILMQuery; title?: string }) {
	const dexsProtocolFilter = useMemo(() => {
		return (dexs?.protocols || [])
			?.filter((d) => !!d.dailyVolume)
			.sort((a, b) => b.dailyVolume - a.dailyVolume && b.change_1d - a.change_1d);
	}, [dexs]);
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
			) : dexs?.total24h ? (
				<Box w={'100%'}>
					<Box border={'1px solid gray'} borderRadius={'10px'} padding={2}>
						<Text fontSize={18}>Total volume (24h)</Text>
						<Text color="blue.400" fontSize={36} fontWeight={800}>
							{dexs?.total24h && '$'}
							{formatNumberToKMB(dexs?.total24h)}
						</Text>
					</Box>
					<Box border={'1px solid gray'} borderRadius={'10px'} padding={2}>
						<Text fontSize={18}>Total volume (24h)</Text>
						<Text color="green.400" fontSize={36} fontWeight={800}>
							{dexs?.total7d && '$'}
							{formatNumberToKMB(dexs?.total7d)}
						</Text>
					</Box>
					<Box border={'1px solid gray'} borderRadius={'10px'} padding={2}>
						<Text fontSize={18}>Total volume (24h)</Text>
						<Text color="purple.400" fontSize={36} fontWeight={800}>
							{dexs?.change_7dover7d}%
						</Text>
					</Box>
					<Box border={'1px solid gray'} borderRadius={'10px'} padding={2}>
						<Text fontSize={18}>Total volume (24h)</Text>
						<Text color="orange.400" fontSize={36} fontWeight={800}>
							{dexs?.change_30dover30d}%
						</Text>
					</Box>
				</Box>
			) : (
				<Box w={'100%'}>
					<Skeleton h={120} mt={2} mb={3} borderRadius={'10px'} />
					<Skeleton h={120} mt={2} mb={3} borderRadius={'10px'} />
					<Skeleton h={120} mt={2} mb={3} borderRadius={'10px'} />
					<Skeleton h={120} mt={2} mb={3} borderRadius={'10px'} />
				</Box>
			)}
		</Wrapped>
	);
}
