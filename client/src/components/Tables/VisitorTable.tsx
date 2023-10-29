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

export type VisitorType = {
    _id?: string;
    firstName: string;
    lastName: string;
    department: string;
    purpose: string;
    timeIn: string;
    timeOut?: string;
};

const VisitorTable = ({
    studentList,
    currentPage,
}: {
    studentList: VisitorType[];
    currentPage: number;
}) => {
    return (
        <>
            <TableContainer w="full" h="80vh" overflowY="scroll">
                <Table variant="unstyled">
                    <Thead>
                        <Tr>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Last name
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                First name
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Department
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Purpose
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Time in
                            </Th>
                            <Th className="border text-center p-2 text-base bg-[#008948]">
                                Time out
                            </Th>
                            <Th className="w-[10rem] border text-center p-2 text-base bg-[#008948]">
                                Action
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {studentList?.map((data: VisitorType) => (
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
    data: VisitorType;
    currentPage: number;
}) => {
    const showQrModal = useDisclosure();
    const editBookModal = useDisclosure();
    const deleteBookAlert = useDisclosure();

    return (
        <Tr key={data._id}>
            <Td className="border text-center p-2 text-sm">{data.lastName}</Td>
            <Td className="border text-center p-2 text-sm">{data.firstName}</Td>
            <Td className="border text-center p-2 text-sm">
                {data.department}
            </Td>
            <Td className="border text-center p-2 text-sm">{data.purpose}</Td>
            <Td className="border text-center p-2 text-sm">{data.timeIn}</Td>
            <Td className="border text-center p-2 text-sm">{data?.timeOut}</Td>
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

                {/* <ShowQRModal
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
                /> */}
            </Td>
        </Tr>
    );
};

export default VisitorTable;
