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
    IconButton,
} from "@chakra-ui/react";
import EditStudentModal from "../Modals/EditStudentModal";
import DeleteStudentAlert from "../Alerts/DeleteStudentAlert";
import ShowQRModal from "../Modals/ShowQRModal";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { BsQrCode } from "react-icons/bs";

export type StudentType = {
    _id?: string;
    studentFName: string;
    studentLName: string;
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
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Last name
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                First name
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Course
                            </Th>
                            <Th className="w-[10rem]  border text-center p-2 text-base bg-[#008948]">
                                Date Registered
                            </Th>
                            <Th className="w-[15rem] border text-center p-2 text-base bg-[#008948]">
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

            {studentList?.length === 0 && (
                <div className="absolute text-xl">No result found!</div>
            )}
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
                {data.studentLName}
            </Td>
            <Td className="border text-center p-2 text-sm">
                {data.studentFName}
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
                    mr={1}
                    onClick={showQrModal.onOpen}
                >
                    Show QR
                </Button>
                <IconButton
                    aria-label="Delete book"
                    size="sm"
                    colorScheme="blue"
                    mx={1}
                    icon={<EditIcon />}
                    onClick={editBookModal.onOpen}
                />
                <IconButton
                    aria-label="Delete book"
                    size="sm"
                    colorScheme="red"
                    ml={1}
                    icon={<DeleteIcon />}
                    onClick={deleteBookAlert.onOpen}
                />

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
