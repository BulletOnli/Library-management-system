"use client";
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
import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import BooksTable from "./Tables/BooksTable";
import AddBookModal from "./Modals/AddBookModal";
import useSortBooks from "@/hooks/useSortBooks";
import { useRouter, useSearchParams } from "next/navigation";
import throttle from "lodash.throttle";

const BooksSection = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { isOpen, onClose, onOpen } = useDisclosure();

    const currentPage = Number(searchParams.get("page"));
    const sortBy = searchParams.get("sortBy") || "title";
    const searchQuery = searchParams.get("search");

    const paginatedBooksQuery = useQuery({
        queryKey: ["books", "list", currentPage],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:5050/books/list/paginated`,
                {
                    params: {
                        page: currentPage,
                        limit: 20,
                        search: searchQuery,
                    },
                }
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

    useEffect(() => {
        const refreshPaginatedBooks = throttle(
            async () => await paginatedBooksQuery.refetch(),
            500
        );

        refreshPaginatedBooks();
    }, [searchQuery]);

    return (
        <>
            <section className="w-full flex items-center justify-between">
                <HStack>
                    <p>Sort by:</p>
                    <Select
                        w={"fit-content"}
                        size="sm"
                        onChange={(e) =>
                            router.push(
                                `/books/manage?page=${currentPage}&sortBy=${e.target.value}`
                            )
                        }
                    >
                        <option className="text-black" value="title">
                            Title
                        </option>
                        <option className="text-black" value="date">
                            Date added
                        </option>
                    </Select>
                </HStack>

                <InputGroup w={400}>
                    <InputLeftElement pointerEvents="none">
                        <BsSearch color="gray.300" />
                    </InputLeftElement>
                    <Input
                        placeholder="Search a title or author"
                        _placeholder={{ color: "gray.50" }}
                        onChange={(e) =>
                            router.push(
                                `/books/manage?page=${currentPage}&sortBy=${sortBy}&search=${e.target.value}`
                            )
                        }
                        className="placeholder:text-center"
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
            </section>

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
                        onClick={() => {
                            const hasSearchQuery =
                                searchQuery !== null
                                    ? `&search=${searchQuery}`
                                    : "";

                            router.push(
                                `/books/manage?page=${
                                    currentPage - 1
                                }&sortBy=${sortBy}${hasSearchQuery}`
                            );
                        }}
                        isDisabled={currentPage == 1}
                    >
                        Prev
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => {
                            const hasSearchQuery =
                                searchQuery !== null
                                    ? `$search=${searchQuery}`
                                    : "";

                            router.push(
                                `/books/manage?page=${
                                    currentPage + 1
                                }&sortBy=${sortBy}${hasSearchQuery}`
                            );
                        }}
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
