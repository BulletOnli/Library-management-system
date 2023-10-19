"use client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Button,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export type BookType = {
    _id: string;
    title: string;
    author: string;
    publisher: string;
    category: string;
};

const TableComponent = () => {
    const [page, setPage] = useState(1);

    const booksQuery = useQuery({
        queryKey: ["books", "list", { page }],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:5050/books/list?page=${page}&limit=20`
            );

            return response.data;
        },
    });

    if (booksQuery.isLoading) {
        return <div className="w-full h-screen">Loading</div>;
    }

    return (
        <>
            <SortSearchComponent />
            <TableContainer w="full" h="80vh" mt={4} overflowY="scroll">
                <Table variant="unstyled">
                    <Thead>
                        <Tr>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Title
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Author
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Publiser
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Category
                            </Th>
                            <Th className="w-fit border text-center p-2 text-base bg-[#008948]">
                                Action
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {booksQuery.data?.results.map((data: BookType) => (
                            <Tr key={data._id}>
                                <Td className="border text-center p-2 text-sm">
                                    {data.title}
                                </Td>
                                <Td className="border text-center p-2 text-sm">
                                    {data.author}
                                </Td>
                                <Td className="border text-center p-2 text-sm">
                                    {data.publisher}
                                </Td>
                                <Td className="border text-center p-2 text-sm">
                                    {data.category}
                                </Td>
                                <Td className=" border text-center p-2 text-sm">
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        colorScheme="blue"
                                        mr={2}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        colorScheme="red"
                                    >
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <div className="w-full mt-4 flex items-center justify-between">
                <p className="text-sm">
                    Page {page} out of {booksQuery.data?.totalPage}
                </p>

                <HStack>
                    <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => setPage((state) => state - 1)}
                        isDisabled={page == 1}
                    >
                        Prev
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => setPage((state) => state + 1)}
                        isDisabled={booksQuery.data?.totalPage == page}
                    >
                        Next
                    </Button>
                </HStack>
            </div>
        </>
    );
};

const SortSearchComponent = () => {
    return (
        <div className="w-full flex items-center justify-between">
            <Menu isLazy size="">
                <MenuButton
                    size="sm"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    colorScheme="green"
                    bg={"#008948"}
                >
                    Sort By
                </MenuButton>
                <MenuList bg={"#008948"}>
                    <MenuItem
                        bg={"#008948"}
                        _hover={{ bg: "#28A86C" }}
                        fontSize={14}
                        color="white"
                    >
                        Date
                    </MenuItem>
                    <MenuItem
                        bg={"#008948"}
                        _hover={{ bg: "#28A86C" }}
                        fontSize={14}
                        color="white"
                    >
                        Name
                    </MenuItem>
                </MenuList>
            </Menu>

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
                <Button size="sm" colorScheme="blue">
                    Add Book
                </Button>
                <Button size="sm" colorScheme="red">
                    Export Data
                </Button>
            </HStack>
        </div>
    );
};

export default TableComponent;
