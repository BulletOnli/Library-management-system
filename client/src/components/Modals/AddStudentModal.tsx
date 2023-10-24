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
    Image,
    Select,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { StudentType } from "../Tables/StudentsTable";
import { useState } from "react";

type AddStudentModalProps = {
    isOpen: boolean;
    onClose: () => void;
    currentPage: number;
};

const AddStudentModal = ({
    isOpen,
    onClose,
    currentPage,
}: AddStudentModalProps) => {
    const [qrSrc, setQrSrc] = useState("");
    const { handleSubmit, register, reset, getValues } = useForm<StudentType>();
    const queryClient = useQueryClient();

    const addStudentMutation = useMutation({
        mutationFn: async (data: StudentType) => {
            const response = await axios.post(
                "http://localhost:5050/students/add",
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
                queryKey: ["students", "list", currentPage],
            });
            toast.success("New Student added!");
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
                        addStudentMutation.mutate(data);
                    })}
                >
                    <ModalBody>
                        <div className="w-full flex flex-col items-center gap-2">
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Student name:
                                </FormLabel>
                                <Input
                                    {...register("studentName")}
                                    isRequired
                                />
                            </VStack>
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Course:
                                </FormLabel>
                                <Select
                                    {...register("studentCourse")}
                                    isRequired
                                    placeholder="Select course"
                                >
                                    <option value="BSIT">BSIT</option>
                                    <option value="BSA">BSA</option>
                                    <option value="BSED">BSED</option>
                                    <option value="BSBA">BSBA</option>
                                    <option value="BSHM">BSHM</option>
                                </Select>
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
                            isLoading={addStudentMutation.isPending}
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
