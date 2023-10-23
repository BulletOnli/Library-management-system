"use client";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { StudentType } from "../Tables/StudentsTable";

const DeleteStudentAlert = ({
    isOpen,
    onClose,
    studentData,
    currentPage,
}: {
    isOpen: boolean;
    onClose: () => void;
    studentData: StudentType;
    currentPage: number;
}) => {
    const queryClient = useQueryClient();
    const cancelRef = useRef(null);

    const deleteStudentMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.delete(
                `http://localhost:5050/students/remove?studentId=${studentData._id}`
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["students", "list", currentPage],
            });
            toast.success("Student has been deleted!");
            onClose();
        },
    });

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Book
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={() => deleteStudentMutation.mutate()}
                            ml={3}
                            isLoading={deleteStudentMutation.isPending}
                        >
                            Remove
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default DeleteStudentAlert;
