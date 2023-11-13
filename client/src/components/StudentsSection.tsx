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
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import StudentsTable from "./Tables/StudentsTable";
import AddStudentModal from "./Modals/AddStudentModal";
import useSortStudents from "@/hooks/useSortStudents";
import { useRouter, useSearchParams } from "next/navigation";

//todo IMPLEMENT SORT BY, ADD IT TO THE URL

const StudentsSection = () => {
    const router = useRouter();
    const currentPage = Number(useSearchParams().get("page"));

    const { isOpen, onClose, onOpen } = useDisclosure();
    const [sortBy, setSortBy] = useState("");

    const paginatedStudentsQuery = useQuery({
        queryKey: ["students", "list", currentPage],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:5050/students/list/paginated`,
                { params: { page: currentPage, limit: 20 } }
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
                            Date added
                        </option>
                        <option className="text-black" value="studentName">
                            Student Name
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
                                `/students/manage?page=${currentPage - 1}`
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
                                `/students/manage?page=${currentPage + 1}`
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
