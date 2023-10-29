"use client";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react";

type AddManualAttendanceProps = {
    onClose: () => void;
    isOpen: boolean;
};

const AddVisitorManual = ({ onClose, isOpen }: AddManualAttendanceProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New visitor</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p>dsfd</p>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddVisitorManual;
