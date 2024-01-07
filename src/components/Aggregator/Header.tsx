import { Button, Heading, Image, Box, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import styled from 'styled-components';
import { useWindowSize } from '~/hooks/useWindowSize';
import loaderImg from '~/public/loader.png';
import BuyCrypto from '~/assets/svg/buy_crypto.svg';
import CrossChainIcon from '~/assets/svg/cross_chain_icon.svg';
import LimitOrderIcon from '~/assets/svg/limit_order.svg';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
	cursor: pointer;
	color: gray;
	margin-left: 15px;
	font-size: 16px;
	font-weight: 600;
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
					onClick={() => window.open('https://app.verbswap.xyz/')}
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
				{!isPhone && (
					<Fragment>
						<HeaderOption
							onClick={() => {
								router.push('/');
							}}
						>
							Swap
						</HeaderOption>
						<HeaderOption></HeaderOption>
						<HeaderOption></HeaderOption>
						<Link href={'/deposit'}>Deposit</Link>
						<Link href={'/tokens'}>Tokens</Link>
						<HeaderOption>
							<Link href={'/analytics'}>Analytics</Link>
						</HeaderOption>
						<HeaderOption>
							<Link href={'/about'}>About</Link>
						</HeaderOption>
						<HeaderOption>Docs</HeaderOption>
					</Fragment>
				)}
			</Box>

			{/* */}

			{children}
		</Wrapper>
	);
};

export default Header;
