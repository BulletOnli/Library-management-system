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
    VStack,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { StudentType } from "../Tables/StudentsTable";

type AddBookModalProps = {
    isOpen: boolean;
    onClose: () => void;
    currentPage: number;
};

const AddStudentModal = ({
    isOpen,
    onClose,
    currentPage,
}: AddBookModalProps) => {
    const { handleSubmit, register, reset } = useForm<StudentType>();
    const queryClient = useQueryClient();

    const addBookMutation = useMutation({
        mutationFn: async (data: any) => {
            const response = await axios.post(
                "http://localhost:5050/books/add",
                data,
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhODhlMjFjNTJkZTUwMTIxNDFhOGMiLCJpYXQiOjE2OTc4MTEyMzcsImV4cCI6MTY5NzgyMjAzN30.w8AKLrC1VPhdAAPYHsUoY77JgD-L6rNryaLKcaB7fio`,
                    },
                }
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["books", "list", currentPage],
            });
            toast.success("Added new book!");
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
                <ModalHeader>Add Student</ModalHeader>
                <ModalCloseButton />
                <form
                    onSubmit={handleSubmit((data) => {
                        addBookMutation.mutate(data);
                    })}
                >
                    <ModalBody>
                        <div className="w-full flex flex-col items-center gap-2">
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">Name:</FormLabel>
                                <Input
                                    {...register("studentName")}
                                    isRequired
                                />
                            </VStack>
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Course & Year:
                                </FormLabel>
                                <Input
                                    {...register("studentCourseAndYear")}
                                    isRequired
                                />
                            </VStack>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isLoading={addBookMutation.isPending}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default AddStudentModal;
