"use client";
import {
    HStack,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    useDisclosure,
    Spacer,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import AttendanceTable from "./Tables/AttendanceTable";
import AddAutoAttendance from "./Modals/AddAutoAttendance";
import AddManualAttendance from "./Modals/AddManualAttendance";

const AttendanceSection = () => {
    const autoAttendanceModal = useDisclosure();
    const manualAttendanceModal = useDisclosure();
    const [currentPage, setPage] = useState(1);

    const paginatedAttendanceQuery = useQuery({
        queryKey: ["students", "list", currentPage],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:5050/students/list/paginated?page=${currentPage}&limit=20`
            );

            return response.data;
        },
    });

    const exportAttendanceData = async () => {
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
            <div className=" w-full flex items-center justify-between">
                <HStack>
                    <Button
                        size="sm"
                        colorScheme="blackAlpha"
                        onClick={autoAttendanceModal.onOpen}
                    >
                        Add via QR Code
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="green"
                        onClick={manualAttendanceModal.onOpen}
                    >
                        Add manually
                    </Button>
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

                <Button
                    size="sm"
                    colorScheme="red"
                    onClick={exportAttendanceData}
                >
                    Export Data
                </Button>
            </div>

            <Spacer />
            <AttendanceTable studentList={[]} currentPage={currentPage} />
            <Spacer />

            {/* Pagination */}
            <div className="w-full mt-4 flex items-center justify-between">
                <p className="text-sm">
                    Page {currentPage} out of{" "}
                    {paginatedAttendanceQuery.data?.totalPage}
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
                            paginatedAttendanceQuery.data?.totalPage ==
                            currentPage
                        }
                    >
                        Next
                    </Button>
                </HStack>
            </div>

            <AddAutoAttendance
                isOpen={manualAttendanceModal.isOpen}
                onClose={manualAttendanceModal.onClose}
            />
            <AddManualAttendance
                isOpen={autoAttendanceModal.isOpen}
                onClose={autoAttendanceModal.onClose}
            />
        </>
    );
};

export default AttendanceSection;
