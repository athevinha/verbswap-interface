import styled from 'styled-components';

function Wave({ width, height }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			style={{ margin: 'auto', background: 'black', display: 'block', shapeRendering: 'auto' }}
			width={width || '200px'}
			height={height || '200px'}
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
		>
			<rect x="17.5" y="30" width="15" height="40" fill="#e15b64">
				<animate
					attributeName="y"
					repeatCount="indefinite"
					dur="1s"
					calcMode="spline"
					keyTimes="0;0.5;1"
					values="18;30;30"
					keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
					begin="-0.2s"
				></animate>
				<animate
					attributeName="height"
					repeatCount="indefinite"
					dur="1s"
					calcMode="spline"
					keyTimes="0;0.5;1"
					values="64;40;40"
					keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
					begin="-0.2s"
				></animate>
			</rect>
			<rect x="42.5" y="30" width="15" height="40" fill="#f8b26a">
				<animate
					attributeName="y"
					repeatCount="indefinite"
					dur="1s"
					calcMode="spline"
					keyTimes="0;0.5;1"
					values="20.999999999999996;30;30"
					keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
					begin="-0.1s"
				></animate>
				<animate
					attributeName="height"
					repeatCount="indefinite"
					dur="1s"
					calcMode="spline"
					keyTimes="0;0.5;1"
					values="58.00000000000001;40;40"
					keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
					begin="-0.1s"
				></animate>
			</rect>
			<rect x="67.5" y="30" width="15" height="40" fill="#abbd81">
				<animate
					attributeName="y"
					repeatCount="indefinite"
					dur="1s"
					calcMode="spline"
					keyTimes="0;0.5;1"
					values="20.999999999999996;30;30"
					keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
				></animate>
				<animate
					attributeName="height"
					repeatCount="indefinite"
					dur="1s"
					calcMode="spline"
					keyTimes="0;0.5;1"
					values="58.00000000000001;40;40"
					keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
				></animate>
			</rect>
		</svg>
	);
}
function LineChart({ width, height }) {
	return (
		<svg height="" viewBox="0 0 2000 1000" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M0 990.14c21-8.56 63-27.55 105-42.804 42-15.255 63-27.873 105-33.467 42-5.594 63 22.406 105 5.497 42-16.91 63-54.294 105-90.043 42-35.748 63-69.076 105-88.7 42-19.622 63 1.069 105-9.416s63-12.86 105-43.007 63-77.703 105-107.73 63-62.02 105-42.404c42 19.615 63 125.143 105 140.483 42 15.34 63-49.662 105-63.786 42-14.123 63-12.658 105-6.832 42 5.825 63 60.123 105 35.96 42-24.162 63-136.755 105-156.772 42-20.016 63 75.889 105 56.69 42-19.199 63-71.014 105-152.683 42-81.67 63-217.262 105-255.664 42-38.401 63 49.351 105 63.655 42 14.305 84 6.293 105 7.866l5 793.017H0Z"
				fill="#444cf71a"
			/>
			<path
				d="M0 990.14c21-8.56 63-27.55 105-42.804 42-15.255 63-27.873 105-33.467 42-5.594 63 22.406 105 5.497 42-16.91 63-54.294 105-90.043 42-35.748 63-69.076 105-88.7 42-19.622 63 1.069 105-9.416s63-12.86 105-43.007 63-77.703 105-107.73 63-62.02 105-42.404c42 19.615 63 125.143 105 140.483 42 15.34 63-49.662 105-63.786 42-14.123 63-12.658 105-6.832 42 5.825 63 60.123 105 35.96 42-24.162 63-136.755 105-156.772 42-20.016 63 75.889 105 56.69 42-19.199 63-71.014 105-152.683 42-81.67 63-217.262 105-255.664 42-38.401 63 49.351 105 63.655 42 14.305 84 6.293 105 7.866"
				fill="none"
				stroke="#444cf7"
				stroke-width="4"
			/>
			<g fill="#444cf7">
				<circle cy="990.14" r="8" />
				<circle cx="105" cy="947.336" r="8" />
				<circle cx="210" cy="913.869" r="8" />
				<circle cx="315" cy="919.366" r="8" />
				<circle cx="420" cy="829.323" r="8" />
				<circle cx="525" cy="740.624" r="8" />
				<circle cx="630" cy="731.207" r="8" />
				<circle cx="735" cy="688.2" r="8" />
				<circle cx="840" cy="580.47" r="8" />
				<circle cx="945" cy="538.066" r="8" />
				<circle cx="1050" cy="678.549" r="8" />
				<circle cx="1155" cy="614.763" r="8" />
				<circle cx="1260" cy="607.931" r="8" />
				<circle cx="1365" cy="643.891" r="8" />
				<circle cx="1470" cy="487.119" r="8" />
				<circle cx="1575" cy="543.809" r="8" />
				<circle cx="1680" cy="391.126" r="8" />
				<circle cx="1785" cy="135.462" r="8" />
				<circle cx="1890" cy="199.117" r="8" />
				<circle cx="1995" cy="206.983" r="8" />
			</g>
		</svg>
	);
}
export const ChartContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 320px;
	margin-bottom: 20px;
	align-items: flex-start;
	width: 100%;
`;

const ChartAnimation = styled.div`
	animation: wave 8s cubic-bezier(0.5, 0, 0, 0.53) infinite;
	display: flex;
	overflow: hidden;
	margin-top: 90px;

	@keyframes wave {
		0% {
			margin-left: 0;
		}
		100% {
			margin-left: -800px;
		}
	}
`;
const Space = styled.div<{ heightSize: number }>`
	height: ${({ heightSize }) => `${heightSize}px`};
`;
const LoadingChartContainer = styled.div`
	display: flex;
`;
const Ani = styled.div`
	display: flex;
	width: 100%;
	overflow: hidden;
	margin-top: 16px;
	padding-left: 48px;
	padding-right: 48px;
	padding-bottom: 16px;

	animation: slide infinite linear 5s;

	@keyframes slide {
		0% {
			transform: translate3d(0, 0, 0);
		}
		100% {
			transform: translate3d(-100%, 0, 0);
		}
	}
`;
export function LoadingChart() {
	return (
		<ChartContainer>
			<Space heightSize={6} />
			<Wave width="100%" height={'600px'} />
		</ChartContainer>
	);
}

export function UnvariableChart() {
	return (
		<ChartContainer>
			<LineChart width={'500px'} height={'400px'} />
		</ChartContainer>
	);
}
