import { useRef } from 'react';
import {
	Bar,
	CartesianGrid,
	ComposedChart,
	Legend,
	Line,
	Area,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';
import { IOHLCV, ITopPoolGK } from '~/types';
import {
	CHART_HEIGHT,
	CHART_OPTION,
	COLORS,
	GREEN,
	RED,
	YAXIS_WIDTH,
	formatNumber,
	tooltipFormatter,
	tooltipLabelFormatter,
	yaxisFormatter,
	yaxisFormatterPercent
} from './utils/helpers';
import { Box, Text, Button, Skeleton } from '@chakra-ui/react';
import styled from 'styled-components';
interface I {
	ohlcvs: IOHLCV[];
	pool: ITopPoolGK;
	resolution: string;
	setResolution: (a: string) => void;
}
const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const PriceChart = ({ pool, ohlcvs, resolution, setResolution }: I) => {
	return (
		<Box>
			<Header>
				<Text color={'gray.300'}>
					{pool?.attributes?.name || 'Select Token'}{' '}
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
							contentStyle={{ border: '1px solid gray', borderRadius: '10px', background: 'black', textAlign: 'left' }}
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
			) : (
				<div></div>
			)}
		</Box>
	);
};

export default PriceChart;
