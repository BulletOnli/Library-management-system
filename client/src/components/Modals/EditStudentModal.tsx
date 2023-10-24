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

type EditStudentModalProps = {
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
}: EditStudentModalProps) => {
    const { reset, handleSubmit, register } = useForm<StudentType>();
    const queryClient = useQueryClient();

    const editStudentMutation = useMutation({
        mutationFn: async (data: StudentType) => {
            const response = await axios.put(
                `http://localhost:5050/students/update?studentId=${studentData._id}`,
                data
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["students", "list", currentPage],
            });
            toast.success("Student details updated");
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
                        editStudentMutation.mutate(data);
                    })}
                >
                    <ModalBody>
                        <div className="w-full flex flex-col items-center gap-2">
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Student ID:
                                </FormLabel>
                                <Input
                                    {...register("_id")}
                                    defaultValue={studentData._id}
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
                                    Course:
                                </FormLabel>
                                <Select
                                    {...register("studentCourse")}
                                    isRequired
                                    placeholder="Select course"
                                    defaultValue={studentData.studentCourse}
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
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isLoading={editStudentMutation.isPending}
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
