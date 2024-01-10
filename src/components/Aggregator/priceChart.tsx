import { Box, Button, Text } from '@chakra-ui/react';
import { Area, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { IOHLCV, IGKQuery } from '~/types';
import {
	CHART_HEIGHT,
	CHART_OPTION,
	GREEN,
	RED,
	formatNumber,
	tooltipFormatter,
	tooltipLabelFormatter,
	yaxisFormatter
} from './utils/helpers';
import { LoadingChart } from './loadingChart';
import { Fragment } from 'react';
interface I {
	loadingPools: any[];
	ohlcvs: IOHLCV[];
	pool: IGKQuery;
	resolution: string;
	setResolution: (a: string) => void;
}
const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const PriceChart = ({ loadingPools, pool, ohlcvs, resolution, setResolution }: I) => {
	console.log('#lo', loadingPools);
	return (
		<Box>
			<Fragment>
				<Header>
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
				</Header>
				{ohlcvs.length > 0 ? (
					<ResponsiveContainer width="100%" height={CHART_HEIGHT} style={{ background: 'black' }}>
						<ComposedChart
							data={ohlcvs}
							syncId={'syncA'}
							margin={{
								top: 50
							}}
						>
							{/* <CartesianGrid color="grey" strokeDasharray="2 5" /> */}
							<XAxis axisLine={false} dataKey="ts" tickFormatter={tooltipLabelFormatter} minTickGap={30} />
							<YAxis
								domain={[(dataMin) => dataMin, (dataMax) => dataMax]}
								axisLine={false}
								dataKey="c"
								orientation="left"
								yAxisId="right"
								tickFormatter={yaxisFormatter}
							/>
							<defs>
								<linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={GREEN} stopOpacity={0.8} />
									<stop offset="95%" stopColor="#000000" stopOpacity={0} />
								</linearGradient>
								<linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={RED} stopOpacity={0.8} />
									<stop offset="95%" stopColor="#000000" stopOpacity={0} />
								</linearGradient>
							</defs>

							<Tooltip
								formatter={tooltipFormatter}
								labelFormatter={tooltipLabelFormatter}
								contentStyle={{
									border: '1px solid gray',
									borderRadius: '10px',
									background: 'black',
									textAlign: 'left'
								}}
							/>
							{ohlcvs[0]?.c && (
								<Area
									isAnimationActive={true}
									dot={false}
									fill={ohlcvs[0].c > ohlcvs[ohlcvs.length - 1].c ? 'url(#colorDown)' : 'url(#colorUp)'}
									strokeWidth={2}
									stroke={ohlcvs[0].c > ohlcvs[ohlcvs.length - 1].c ? RED : GREEN}
									dataKey="c"
									yAxisId="right"
									name="Price"
								/>
							)}
						</ComposedChart>
					</ResponsiveContainer>
				) : loadingPools.length > 0 ? (
					<LoadingChart />
				) : (
					<div></div>
				)}
			</Fragment>
		</Box>
	);
};

export default PriceChart;
