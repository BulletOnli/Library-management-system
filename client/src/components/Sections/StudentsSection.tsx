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
import StudentsTable from "../Tables/StudentsTable";
import AddStudentModal from "../Modals/AddStudentModal";
import useSortStudents from "@/hooks/useSortStudents";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const STDUENTS_TABLE_LIMIT = 20;

const StudentsSection = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { isOpen, onClose, onOpen } = useDisclosure();

    let currentPage = Number(searchParams.get("page"));
    const sortBy = searchParams.get("sortBy") || "studentLName";
    const searchQuery = searchParams.get("search");
    const hasSearchQuery = searchQuery !== null ? `&search=${searchQuery}` : "";

    const paginatedStudentsQuery = useQuery({
        queryKey: ["students", "list", currentPage],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:5050/students/list/paginated`,
                {
                    params: {
                        page: currentPage,
                        limit: STDUENTS_TABLE_LIMIT,
                        search: searchQuery,
                    },
                }
            );
            return response.data;
        },
    });

    // SORTED RESULTS
    const { sortedArray } = useSortStudents(
        paginatedStudentsQuery.data?.results,
        sortBy
    );

    const exportStudentsData = async () => {
        const response = await axios.get(
            "http://localhost:5050/students/export",
            {
                responseType: "blob",
            }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "exported_students_data.csv");
        link.click();
    };

    useEffect(() => {
        const refreshPaginatedBooks = async () =>
            await paginatedStudentsQuery.refetch();

        refreshPaginatedBooks();
    }, [searchQuery]);

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <HStack>
                    <p>Sort by:</p>
                    <Select
                        w={"fit-content"}
                        size="sm"
                        onChange={(e) =>
                            router.push(
                                `${pathname}?page=${currentPage}&sortBy=${e.target.value}`
                            )
                        }
                    >
                        <option className="text-black" value="studentLName">
                            Last Name
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
                        placeholder="Search a Student"
                        _placeholder={{ color: "gray.50" }}
                        onChange={(e) => {
                            if (sortedArray.length <= STDUENTS_TABLE_LIMIT) {
                                currentPage = 1;
                            }

                            router.push(
                                `${pathname}?page=${currentPage}&sortBy=${sortBy}&search=${e.target.value}`
                            );
                        }}
                    />
                </InputGroup>

                <HStack>
                    <Button size="sm" colorScheme="blue" onClick={onOpen}>
                        Add Student
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="red"
                        onClick={exportStudentsData}
                    >
                        Export Data
                    </Button>
                </HStack>
            </div>

            <Spacer />
            <StudentsTable
                studentList={sortedArray}
                currentPage={currentPage}
            />
            <Spacer />

            {/* Pagination */}
            <div className="w-full mt-4 flex items-center justify-between">
                <p className="text-sm">
                    Page {currentPage} out of{" "}
                    {paginatedStudentsQuery.data?.totalPage}
                </p>

                <HStack>
                    <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() =>
                            router.push(
                                `${pathname}?page=${
                                    currentPage - 1
                                }&sortBy=${sortBy}${hasSearchQuery}`
                            )
                        }
                        isDisabled={currentPage == 1}
                    >
                        Prev
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() =>
                            router.push(
                                `${pathname}?page=${
                                    currentPage + 1
                                }&sortBy=${sortBy}${hasSearchQuery}`
                            )
                        }
                        isDisabled={
                            paginatedStudentsQuery.data?.totalPage ==
                            currentPage
                        }
                    >
                        Next
                    </Button>
                </HStack>
            </div>

            <AddStudentModal
                isOpen={isOpen}
                onClose={onClose}
                currentPage={currentPage}
            />
        </>
    );
};

export default StudentsSection;
