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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BookType } from "../BooksTable";

type AddBookModalProps = {
    isOpen: boolean;
    onClose: () => void;
    currentPage: number;
};

const AddBookModal = ({ isOpen, onClose, currentPage }: AddBookModalProps) => {
    const { handleSubmit, register, reset } = useForm<BookType>();
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
                <ModalHeader>Add Book</ModalHeader>
                <ModalCloseButton />
                <form
                    onSubmit={handleSubmit((data) => {
                        addBookMutation.mutate(data);
                    })}
                >
                    <ModalBody>
                        <div className="w-full flex flex-col items-center gap-2">
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Book Title:
                                </FormLabel>
                                <Input {...register("title")} isRequired />
                            </VStack>
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Author:
                                </FormLabel>
                                <Input {...register("author")} isRequired />
                            </VStack>
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Publisher:
                                </FormLabel>
                                <Input {...register("publisher")} isRequired />
                            </VStack>
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Category:
                                </FormLabel>
                                <Select
                                    {...register("category")}
                                    isRequired
                                    placeholder="Select Category"
                                >
                                    <option value="Textbooks and Course Materials">
                                        Textbooks and Course Materials
                                    </option>
                                    <option value="Reference Materials">
                                        Reference Materials
                                    </option>
                                    <option value="Academic Journals and Periodicals">
                                        Academic Journals and Periodicals
                                    </option>
                                    <option value="Fiction and Literature">
                                        Fiction and Literature
                                    </option>
                                    <option value="Non-Fiction Books">
                                        Non-Fiction Books
                                    </option>
                                    <option value="Science and Mathematics">
                                        Science and Mathematics
                                    </option>
                                    <option value="Arts and Humanities">
                                        Arts and Humanities
                                    </option>
                                    <option value="Business and Economics">
                                        Business and Economics
                                    </option>
                                    <option value="Health and Wellness">
                                        Health and Wellness
                                    </option>
                                    <option value="Foreign Language and Linguistics">
                                        Foreign Language and Linguistics
                                    </option>
                                    <option value="Travel and Geography">
                                        Travel and Geography
                                    </option>
                                    <option value="Religious Studies">
                                        Religious Studies
                                    </option>
                                    <option value="Environmental Studies">
                                        Environmental Studies
                                    </option>
                                    <option value="Technology and Engineering">
                                        Technology and Engineering
                                    </option>
                                    <option value="Current Affairs and News">
                                        Current Affairs and News
                                    </option>
                                    <option value="Children's and Young Adult Literature">
                                        Children's and Young Adult Literature
                                    </option>
                                    <option value="Multicultural and Diversity Literature">
                                        Multicultural and Diversity Literature
                                    </option>
                                    <option value="Special Collections">
                                        Special Collections
                                    </option>
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

export default AddBookModal;
