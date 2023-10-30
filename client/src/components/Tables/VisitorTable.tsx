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

export type VisitorType = {
    _id?: string;
    visitorFName: string;
    visitorLName: string;
    department: string;
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
            <Td className="border text-center p-2 text-sm">
                {data.visitorLName}
            </Td>
            <Td className="border text-center p-2 text-sm">
                {data.visitorFName}
            </Td>
            <Td className="border text-center p-2 text-sm">
                {data.department}
            </Td>
            <Td className="border text-center p-2 text-sm">{data.timeIn}</Td>
            <Td className="border text-center p-2 text-sm">{data?.timeOut}</Td>
            <Td className=" border text-center p-2 text-sm">
                <Button
                    size="sm"
                    variant="solid"
                    colorScheme="red"
                    onClick={deleteBookAlert.onOpen}
                >
                    Out
                </Button>
            </Td>
        </Tr>
    );
};

export default VisitorTable;
