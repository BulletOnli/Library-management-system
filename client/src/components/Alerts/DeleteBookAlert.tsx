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
import { BookType } from "../BooksTable";

const DeleteBookAlert = ({
    isOpen,
    onClose,
    bookData,
    currentPage,
}: {
    isOpen: boolean;
    onClose: () => void;
    bookData: BookType;
    currentPage: number;
}) => {
    const queryClient = useQueryClient();
    const cancelRef = useRef(null);

    const deleteBookMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.delete(
                `http://localhost:5050/books/remove?bookId=${bookData._id}`
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["books", "list", currentPage],
            });
            toast.success("Book has been deleted!");
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
                            onClick={() => deleteBookMutation.mutate()}
                            ml={3}
                            isLoading={deleteBookMutation.isPending}
                        >
                            Remove
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default DeleteBookAlert;
