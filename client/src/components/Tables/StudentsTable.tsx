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
import EditStudentModal from "../Modals/EditStudentModal";
import DeleteStudentAlert from "../Alerts/DeleteStudentAlert";
import ShowQRModal from "../Modals/ShowQRModal";

export type StudentType = {
    _id?: string;
    studentName: string;
    studentCourse: string;
    studentQR: string;
    createdAt: string;
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
                            <Th className="w-[20rem] border text-center p-2 text-base bg-[#008948]">
                                Student ID
                            </Th>
                            <Th className="w-[25rem] border text-center p-2 text-base bg-[#008948]">
                                Full name
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Course
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Date Registered
                            </Th>
                            <Th className="w-[20rem] border text-center p-2 text-base bg-[#008948]">
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
    const showQrModal = useDisclosure();
    const editBookModal = useDisclosure();
    const deleteBookAlert = useDisclosure();

    return (
        <Tr key={data._id}>
            <Td className="border text-center p-2 text-sm">{data._id}</Td>
            <Td className="border text-center p-2 text-sm">
                {data.studentName}
            </Td>
            <Td className="border text-center p-2 text-sm">
                {data.studentCourse}
            </Td>
            <Td className="border text-center p-2 text-sm">
                {data.createdAt.slice(0, 10)}
            </Td>
            <Td className=" border text-center p-2 text-sm">
                <Button
                    size="sm"
                    variant="solid"
                    colorScheme="green"
                    backgroundColor={"#008948"}
                    mr={2}
                    onClick={showQrModal.onOpen}
                >
                    Show QR
                </Button>
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

                <ShowQRModal
                    isOpen={showQrModal.isOpen}
                    onClose={showQrModal.onClose}
                    studentData={data}
                />

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
