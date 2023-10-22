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
    HStack,
    VStack,
    FormLabel,
    Input,
    Select,
} from "@chakra-ui/react";
import { BookType } from "../Tables/BooksTable";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { StudentType } from "../Tables/StudentsTable";

type EditBookModalProps = {
    isOpen: boolean;
    onClose: () => void;
    studentData: StudentType;
    currentPage: number;
};

const EditStudentModal = ({
    isOpen,
    onClose,
    studentData,
    currentPage,
}: EditBookModalProps) => {
    const { reset, handleSubmit, register } = useForm<StudentType>();
    const queryClient = useQueryClient();

    const editBookMutation = useMutation({
        mutationFn: async (data: BookType) => {
            const response = await axios.put(
                `http://localhost:5050/books/update?bookId=${studentData._id}`,
                data
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["books", "list", currentPage],
            });
            toast.success("Book updated");
            handleClose();
        },
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit student details</ModalHeader>
                <ModalCloseButton />
                <form
                    onSubmit={handleSubmit((data) => {
                        // editBookMutation.mutate(data);
                    })}
                >
                    <ModalBody>
                        <div className="w-full flex flex-col items-center gap-2">
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Student ID:
                                </FormLabel>
                                <Input
                                    {...register("_id", { required: true })}
                                    defaultValue={studentData._id}
                                    isRequired
                                    isDisabled
                                />
                            </VStack>
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Stduent Name:
                                </FormLabel>
                                <Input
                                    {...register("studentName", {
                                        required: true,
                                    })}
                                    defaultValue={studentData.studentName}
                                    isRequired
                                />
                            </VStack>
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Course & Year Level:
                                </FormLabel>
                                <Input
                                    {...register("studentCourseAndYear", {
                                        required: true,
                                    })}
                                    defaultValue={
                                        studentData.studentCourseAndYear
                                    }
                                    isRequired
                                />
                            </VStack>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isLoading={editBookMutation.isPending}
                        >
                            Save Changes
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default EditStudentModal;
