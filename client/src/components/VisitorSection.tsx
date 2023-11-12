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
import AttendanceTable from "./Tables/VisitorTable";
import AddVisitorAuto from "./Modals/AddVisitorAuto";
import AddVisitorManual from "./Modals/AddVisitorManual";

const VisitorSection = () => {
    const manualVisitorModal = useDisclosure();
    const autoVisitorModal = useDisclosure();
    const [currentPage, setPage] = useState(1);

    const paginatedVisitorQuery = useQuery({
        queryKey: ["visitor", "list"],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:5050/visitor/list`
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
                        onClick={autoVisitorModal.onOpen}
                    >
                        Add via QR Code
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="green"
                        onClick={manualVisitorModal.onOpen}
                    >
                        Add manually
                    </Button>
                </HStack>

                <InputGroup w={400}>
                    <InputLeftElement pointerEvents="none">
                        <BsSearch color="gray.300" />
                    </InputLeftElement>
                    <Input
                        placeholder="Search a Visitor"
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
            <AttendanceTable
                studentList={paginatedVisitorQuery.data}
                currentPage={currentPage}
            />
            <Spacer />

            {/* Pagination */}
            <div className="w-full mt-4 flex items-center justify-between">
                <p className="text-sm">
                    Page {currentPage} out of{" "}
                    {paginatedVisitorQuery.data?.length}
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
                            paginatedVisitorQuery.data?.totalPage == currentPage
                        }
                    >
                        Next
                    </Button>
                </HStack>
            </div>

            <AddVisitorAuto
                isOpen={autoVisitorModal.isOpen}
                onClose={autoVisitorModal.onClose}
            />
            <AddVisitorManual
                isOpen={manualVisitorModal.isOpen}
                onClose={manualVisitorModal.onClose}
            />
        </>
    );
};

export default VisitorSection;
