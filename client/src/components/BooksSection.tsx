"use client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    HStack,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    useDisclosure,
    Spacer,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { BsSearch } from "react-icons/bs";
import BooksTable from "./BooksTable";
import AddBookModal from "./Modals/AddBookModal";
import useSortBooks from "@/hooks/useSortBooks";

const BooksSection = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [currentPage, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("");

    const paginatedBooksQuery = useQuery({
        queryKey: ["books", "list", currentPage],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:5050/books/list/paginated?page=${currentPage}&limit=20`
            );

            return response.data;
        },
    });

    // SORTED RESULTS
    const { sortedArray } = useSortBooks(
        paginatedBooksQuery.data?.results,
        sortBy
    );

    const exportBooksData = async () => {
        const response = await axios.get("http://localhost:5050/books/export", {
            responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "exported_data.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <HStack>
                    <p>Sort by:</p>
                    <Select
                        w={"fit-content"}
                        size="sm"
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option className="text-black" value="Date">
                            Date added (Ascending)
                        </option>
                        <option className="text-black" value="Title">
                            Title (Ascending)
                        </option>
                    </Select>
                </HStack>

                <InputGroup w={400}>
                    <InputLeftElement pointerEvents="none">
                        <BsSearch color="gray.300" />
                    </InputLeftElement>
                    <Input
                        placeholder="Search a Book"
                        _placeholder={{ color: "gray.50" }}
                    />
                </InputGroup>

                <HStack>
                    <Button size="sm" colorScheme="blue" onClick={onOpen}>
                        Add Book
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="red"
                        onClick={exportBooksData}
                    >
                        Export Data
                    </Button>
                </HStack>
            </div>

            <Spacer />
            <BooksTable bookList={sortedArray} currentPage={currentPage} />
            <Spacer />

            {/* Pagination */}
            <div className="w-full mt-4 flex items-center justify-between">
                <p className="text-sm">
                    Page {currentPage} out of{" "}
                    {paginatedBooksQuery.data?.totalPage}
                </p>

                <HStack>
                    <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => setPage((state) => state - 1)}
                        isDisabled={currentPage == 1}
                    >
                        Prev
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => setPage((state) => state + 1)}
                        isDisabled={
                            paginatedBooksQuery.data?.totalPage == currentPage
                        }
                    >
                        Next
                    </Button>
                </HStack>
            </div>

            <AddBookModal
                isOpen={isOpen}
                onClose={onClose}
                currentPage={currentPage}
            />
        </>
    );
};

export default BooksSection;
