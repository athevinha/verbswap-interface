import { Box, Heading, Image, TagRightIcon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import styled from 'styled-components';
import { useWindowSize } from '~/hooks/useWindowSize';
import loaderImg from '~/public/loader.png';
import { CrossIcon } from '../Icons';
import ForumIcon from '../Icons/ForumIcon';
import LaunchIcon from '../Icons/LaunchIcon';
import PoolClassic from '../Icons/PoolClassicIcon';
import PoolElastic from '../Icons/PoolElasticIcon';
import Swap from '../Icons/Swap';
import TransferIcon from '../Icons/TransferIcon';
const Wrapper = styled.div`
	position: absolute;
	z-index: 100;
	display: flex;
	justify-content: space-between;
	width: calc(100% - 32px);
	gap: 8px;
	@media screen and (min-width: ${({ theme }) => theme.bpMed}) {
		position: relative;
		width: 100%;
	}
`;
export const IconWrapper = styled.div`
	flex: 0 0 16px;
	display: flex;
	width: 16px;
	height: 16px;
	align-items: center;
`;

// const StyledBridgeIcon = styled(BridgeIcon)`
//   path {
//     fill: currentColor;
//   }
// `

const Name = styled(Heading)`
	font-size: 26px;

	@media screen and (min-width: ${({ theme }) => theme.bpLg}) {
		margin: 0 auto;
	}
`;

const HeaderOption = styled.div`
	:hover {
		color: #9ae6b4;
	}
	display: flex;
	align-items: center;
	gap: 6px;
	transition: 0.2s;
	cursor: pointer;
	color: gray;
	margin-left: 15px;
	font-size: 16px;
	font-weight: 600;

	@media screen and (max-width: ${({ theme }) => theme.bpMed}) {
		display: inline-grid;
		text-align: center;
		gap: 10px;
		justify-items: center;
	}
`;
const HeaderWrapped = styled.div`
	display: flex;
	margin-top: 0;
	@media screen and (max-width: ${({ theme }) => theme.bpMed}) {
		position: fixed;
		text-align: center;
		justify-content: center;
		align-items: center;
		margin-right: 16px;
		left: -16px;
		background: black;
		opacity: 0.9;
		gap: 20px;
		width: calc(100vw + 16px);
		height: 80px;
		top: calc(100% - 80px);
	}
`;
const Header = ({ children }) => {
	const { isPhone } = useWindowSize();
	const router = useRouter();
	return (
		<Wrapper>
			<Box style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
				<Name
					fontSize={['26px', '26px', '32px', '32px']}
					display="flex"
					alignItems="center"
					onClick={() => window.open('/')}
					cursor="pointer"
				>
					<Image
						src={loaderImg.src}
						w={['28px', '28px', '36px', '36px']}
						h={['28px', '28px', '36px', '36px']}
						mr="8px"
						alt="logo"
					/>
					<Text fontFamily={'mono'} fontSize={24}>
						VerbSwap
					</Text>
				</Name>
				<HeaderWrapped>
					<HeaderOption
						onClick={() => {
							router.push('/');
						}}
					>
						<Swap size={20} rotate={90} /> Swap
					</HeaderOption>
					{/* <HeaderOption
							onClick={() => {
								router.push('/deposit');
							}}
						>
							Deposit
						</HeaderOption> */}
					<HeaderOption
						onClick={() => {
							router.push('/pools');
						}}
					>
						<PoolClassic size={15} color="gray" /> Pools
					</HeaderOption>
					<HeaderOption
						onClick={() => {
							router.push('/dexs');
						}}
					>
						<PoolElastic size={15} /> Dexs
					</HeaderOption>
					{/* <HeaderOption
							onClick={() => {
								router.push('/about');
							}}
						>
							About
						</HeaderOption> */}
					{/* <HeaderOption
						onClick={() => {
							router.push('/airdrop');
						}}
					>
						<TransferIcon /> Airdrop
					</HeaderOption> */}
					<HeaderOption
						onClick={() => {
							router.push('/privatesale');
						}}
					>
						<TransferIcon /> ICO
					</HeaderOption>
					<HeaderOption
						onClick={() => {
							router.push('/');
						}}
					>
						<TagRightIcon ml={0} mr={0} /> Docs
					</HeaderOption>
				</HeaderWrapped>
			</Box>

			{/* */}

			{children}
		</Wrapper>
	);
};

export default Header;
