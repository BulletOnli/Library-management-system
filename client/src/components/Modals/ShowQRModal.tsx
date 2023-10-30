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
    Image,
} from "@chakra-ui/react";
import { StudentType } from "../Tables/StudentsTable";

type ShowQRModalProps = {
    isOpen: boolean;
    onClose: () => void;
    studentData: StudentType;
};

const ShowQRModal = ({ isOpen, onClose, studentData }: ShowQRModalProps) => {
    const handleDownload = () => {
        const a = document.createElement("a");
        a.href = studentData.studentQR;
        a.download = `${studentData.studentFName}_QR.png`;
        a.click();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{studentData.studentFName}'s QR Code</ModalHeader>
                <ModalCloseButton />
                <ModalBody className="flex justify-center items-center">
                    <Image src={studentData.studentQR} />
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme="blue" onClick={handleDownload}>
                        Download QR
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ShowQRModal;
