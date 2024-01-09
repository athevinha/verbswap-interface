import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
	Button,
	Checkbox,
	Heading,
	HStack,
	List,
	ListItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Switch,
	Tooltip,
	useDisclosure
} from '@chakra-ui/react';
import { chunk } from 'lodash';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import Deposit from '../Deposit/Deposit';

export const DepositModal = ({ onClose: onExternalClose }) => {
	const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
	const onCloseClick = () => {
		onExternalClose();
		onClose();
	};
	return (
		<>
			<Modal isOpen={isOpen} onClose={onCloseClick} size={'lg'}>
				<ModalOverlay />
				<ModalContent color={'white'} justifyContent={'center'} background={'black'} border={'0.5px solid gray'}>
					{/* <ModalHeader>Settings</ModalHeader> */}
					{/* <ModalCloseButton /> */}
					{/* <ModalBody> */}
					<Deposit />
					{/* </ModalBody> */}

					{/* <ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onCloseClick}>
							Close
						</Button>
					</ModalFooter> */}
				</ModalContent>
			</Modal>
		</>
	);
};
