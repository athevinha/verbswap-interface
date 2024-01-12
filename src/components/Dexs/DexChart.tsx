import { Box } from '@chakra-ui/react';
import { Fragment, useMemo } from 'react';
import {
	Area,
	Bar,
	BarChart,
	CartesianAxis,
	CartesianGrid,
	ComposedChart,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';
import styled from 'styled-components';
import { formatNumberToKMB } from '~/utils';
import { LoadingChart } from '../Aggregator/loadingChart';
import {
	CHART_HEIGHT,
	GREEN,
	RED,
	tooltipFormatter,
	tooltipLabelFormatter,
	tooltipLabelFormatterYear,
	yaxisFormatter
} from '../Aggregator/utils/helpers';
import { ILMQuery } from './type';
interface I {
	dexs: ILMQuery;
	title: string;
}
const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const DexChart = ({ dexs, title }: I) => {
	// const data = (dexs?.totalDataChartBreakdown || []).map((breakChart, _) => {
	// 	return {
	// 		ts: Number(breakChart[0]),
	// 		c: 12,
	// 		...breakChart[1]
	// 	};
	// });
	const data = useMemo(() => {
		return (dexs?.totalDataChart || []).map((breakChart, _) => {
			return {
				ts: Number(breakChart[0]),
				c: Number(breakChart[1])
				// ...breakChart[1]
			};
		});
	}, [dexs]);
	console.log('#data', data);
	return (
		<Box>
			<Fragment>
				{/* <Header>
					<Text color={'gray.300'} fontSize={16}>
						{pool?.attributes?.name || ''}{' '}
						{pool && <span style={{ color: 'gray' }}>(${formatNumber(pool.attributes.base_token_price_usd)})</span>}
					</Text>
					<Box>
						{Object.keys(CHART_OPTION).map((key, _) => {
							return (
								<Button
									key={_}
									color={key === resolution ? 'white' : 'gray'}
									colorScheme="blackAlpha"
									fontSize={15}
									onClick={() => {
										setResolution(key);
									}}
								>
									{CHART_OPTION[key]}
								</Button>
							);
						})}
					</Box>
				</Header> */}
				{data.length > 0 ? (
					<ResponsiveContainer width="100%" height={CHART_HEIGHT} style={{ background: 'black' }}>
						<ComposedChart
							data={data}
							syncId={'syncA'}
							margin={{
								top: 50
							}}
						>
							<XAxis axisLine={false} dataKey="ts" tickFormatter={tooltipLabelFormatterYear} minTickGap={30} />
							<YAxis
								domain={[(dataMin) => dataMin, (dataMax) => dataMax]}
								axisLine={false}
								dataKey="c"
								orientation="left"
								yAxisId="right"
								tickFormatter={(value) => {
									return '$' + formatNumberToKMB(value);
								}}
							/>
							<defs>
								<linearGradient id="upppp" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={GREEN} stopOpacity={0.8} />
									<stop offset="95%" stopColor="#000000" stopOpacity={0} />
								</linearGradient>
							</defs>

							<Tooltip
								formatter={(value) => {
									return '$' + formatNumberToKMB(String(value));
								}}
								labelFormatter={tooltipLabelFormatterYear}
								contentStyle={{
									border: '1px solid gray',
									borderRadius: '10px',
									background: 'black',
									textAlign: 'left'
								}}
							/>
							{/* <Bar dataKey="c" stackId="a" fill="#8884d8" />
							<Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
							{data[0]?.c && (
								<Area
									isAnimationActive={true}
									dot={false}
									fill={'url(#upppp)'}
									strokeWidth={2}
									stroke={'#9F7AEA'}
									dataKey="c"
									yAxisId="right"
									name="Dexs volume"
								/>
							)}
						</ComposedChart>
					</ResponsiveContainer>
				) : (
					<LoadingChart />
				)}
			</Fragment>
		</Box>
	);
};

export default DexChart;
