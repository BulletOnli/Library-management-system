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

type EditBookModalProps = {
    isOpen: boolean;
    onClose: () => void;
    bookData: BookType;
    currentPage: number;
};

const EditBookModal = ({
    isOpen,
    onClose,
    bookData,
    currentPage,
}: EditBookModalProps) => {
    const { reset, handleSubmit, register } = useForm<BookType>();
    const queryClient = useQueryClient();

    const editBookMutation = useMutation({
        mutationFn: async (data: BookType) => {
            const response = await axios.put(
                `http://localhost:5050/books/update?bookId=${bookData._id}`,
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
                <ModalHeader>Edit book details</ModalHeader>
                <ModalCloseButton />
                <form
                    onSubmit={handleSubmit((data) => {
                        editBookMutation.mutate(data);
                    })}
                >
                    <ModalBody>
                        <div className="w-full flex flex-col items-center gap-2">
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Book Title:
                                </FormLabel>
                                <Input
                                    {...register("title", { required: true })}
                                    defaultValue={bookData.title}
                                    isRequired
                                />
                            </VStack>
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Author:
                                </FormLabel>
                                <Input
                                    {...register("author", { required: true })}
                                    defaultValue={bookData.author}
                                    isRequired
                                />
                            </VStack>
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Publisher:
                                </FormLabel>
                                <Input
                                    {...register("publisher", {
                                        required: true,
                                    })}
                                    defaultValue={bookData.publisher}
                                    isRequired
                                />
                            </VStack>
                            <VStack w={"full"} spacing={0}>
                                <FormLabel className="w-full">
                                    Category:
                                </FormLabel>
                                <Select
                                    {...register("category", {
                                        required: true,
                                    })}
                                    isRequired
                                    placeholder="Select Category"
                                    defaultValue={bookData.category}
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

export default EditBookModal;
