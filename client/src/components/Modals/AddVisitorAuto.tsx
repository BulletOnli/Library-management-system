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
import CameraComponent from "../CameraComponent";

type AddManualAttendanceProps = {
    onClose: () => void;
    isOpen: boolean;
};

const AddVisitorAuto = ({ onClose, isOpen }: AddManualAttendanceProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New visitor via QR</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <CameraComponent />
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

export default AddVisitorAuto;
