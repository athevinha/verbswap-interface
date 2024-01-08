import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Link, Text, Image } from '@chakra-ui/react';
import styled from 'styled-components';
import { AggIcons, LlamaIcon, SmolCheck } from '../Icons';
import VerbswapIcon from "~/public/favicon.png" 
import HeaderBackground from '~/assets/image/people.png';
import { useRouter } from 'next/router';
import { useRef } from 'react';
const IconsBody = styled.div`
	display: flex;
	width: fit-content;
	overflow: hidden;
	margin-top: 16px;
	padding-left: 48px;
	padding-right: 48px;
	padding-bottom: 16px;

	animation: slide infinite linear 10s;

	@keyframes slide {
		0% {
			transform: translate3d(-60px, 0, 0);
		}
		100% {
			transform: translate3d(-540px, 0, 0);
		}
	}
`;

const MainIcon = styled.div`
	z-index: 1;
	position: absolute;
	left: 50%;
	top: 50%;
	border-radius: 10px;
	border: 0.5px solid gray;
	transform: translate(-50%, -50%);
	box-shadow: 0px 16.4384px 92.0548px 13.1507px #121315;
`;

const IconElem = styled.div`
	box-shadow: 0px 2.63014px 15.7808px rgba(0, 0, 0, 0.45);
	width: 48px;
	height: 48px;
	margin-right: 48px;
`;

const Header = styled.div`
	position: relative;
`;

const CheckBody = styled.div`
	color: rgb(112, 160, 247);
	display: flex;
	gap: 16px;
	justify-content: center;
	margin-top: 16px;
`;

const CheckWithText = ({ text }: { text: string }) => {
	return (
		<div style={{ display: 'flex', lineHeight: '12px' }}>
			{SmolCheck} <div style={{ fontSize: 12, marginLeft: '4px', marginRight: '4px' }}>{text}</div>
		</div>
	);
};
const RoutesPreview = () => {
	const videoRef = useRef(null);
	const setPlayBack = () => {
		videoRef.current.playbackRate = 5.5;
	};
	return (
		<Flex pt="30px" flexDir="column" justifyContent="space-around">
			<Header>
				{/* <video width="auto" height="500px" loop autoPlay muted ref={videoRef} onCanPlay={() => setPlayBack()}>
					<source src={`${window.location.origin}/people.mp4`} type="video/mp4" />
					<source src={`${window.location.origin}/people.ogg`} type="video/ogg" />
					Your browser does not support the video tag.
				</video> */}
				<Image src={HeaderBackground.src} w="100%" borderRadius="10PX"></Image>
			</Header>
			<Box zIndex={1} mt={1}>
				<Heading size={'md'} textAlign="center">
					The Aggregator of Aggregators
				</Heading>
				<CheckBody>
					<CheckWithText text="Totally Free" />
					<CheckWithText text="Gas Estimation" />
					<CheckWithText text="Preserves Privacy" />
				</CheckBody>

				<Text color={'gray.300'} textAlign="center" mt={6}>
					VerbSwap looks for the best route for your trade <br /> among a variety of Dex Aggregators, guaranteeing you{' '}
					<br /> the best execution prices in DeFi.
					<br /> <br /> Try it now or{' '}
					<Link href="#" isExternal textDecoration={'underline'}>
						learn more
						<ExternalLinkIcon mx="4px" mb="3px" />
					</Link>
				</Text>
			</Box>
		</Flex>
	);
};

export default RoutesPreview;
