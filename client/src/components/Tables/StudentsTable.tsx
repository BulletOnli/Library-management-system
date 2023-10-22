import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import EditBookModal from "../Modals/EditBookModal";
import DeleteBookAlert from "../Alerts/DeleteBookAlert";
import EditStudentModal from "../Modals/EditStudentModal";
import DeleteStudentAlert from "../Alerts/DeleteStudentAlert";

export type StudentType = {
    _id?: string;
    studentName: string;
    studentCourseAndYear: string;
};

const StudentsTable = ({
    studentList,
    currentPage,
}: {
    studentList: StudentType[];
    currentPage: number;
}) => {
    return (
        <>
            <TableContainer w="full" h="80vh" overflowY="scroll">
                <Table variant="unstyled">
                    <Thead>
                        <Tr>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Student ID
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Name
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Course & Year Level
                            </Th>
                            <Th className="w-fit border text-center p-2 text-base bg-[#008948]">
                                Action
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {studentList?.map((data: StudentType) => (
                            <TableRow
                                data={data}
                                currentPage={currentPage}
                                key={data._id}
                            />
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};

const TableRow = ({
    data,
    currentPage,
}: {
    data: StudentType;
    currentPage: number;
}) => {
    const editBookModal = useDisclosure();
    const deleteBookAlert = useDisclosure();

    return (
        <Tr key={data._id}>
            <Td className="border text-center p-2 text-sm">{data._id}</Td>
            <Td className="border text-center p-2 text-sm">
                {data.studentName}
            </Td>
            <Td className="border text-center p-2 text-sm">
                {data.studentCourseAndYear}
            </Td>
            <Td className=" border text-center p-2 text-sm">
                <Button
                    size="sm"
                    variant="solid"
                    colorScheme="blue"
                    mr={2}
                    onClick={editBookModal.onOpen}
                >
                    Edit
                </Button>
                <Button
                    size="sm"
                    variant="solid"
                    colorScheme="red"
                    onClick={deleteBookAlert.onOpen}
                >
                    Remove
                </Button>

                <EditStudentModal
                    isOpen={editBookModal.isOpen}
                    onClose={editBookModal.onClose}
                    studentData={data}
                    currentPage={currentPage}
                />

                <DeleteStudentAlert
                    isOpen={deleteBookAlert.isOpen}
                    onClose={deleteBookAlert.onClose}
                    studentData={data}
                    currentPage={currentPage}
                />
            </Td>
        </Tr>
    );
};

export default StudentsTable;
