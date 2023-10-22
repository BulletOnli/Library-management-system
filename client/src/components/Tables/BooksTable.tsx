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
import { useState } from "react";

export type BookType = {
    _id?: string;
    title: string;
    author: string;
    publisher: string;
    category: string;
};

const BooksTable = ({
    bookList,
    currentPage,
}: {
    bookList: BookType[];
    currentPage: number;
}) => {
    return (
        <>
            <TableContainer w="full" h="80vh" overflowY="scroll">
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
                        {bookList?.map((data: BookType) => (
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
    data: BookType;
    currentPage: number;
}) => {
    const editBookModal = useDisclosure();
    const deleteBookAlert = useDisclosure();

    return (
        <Tr key={data._id}>
            <Td className="border text-center p-2 text-sm">{data.title}</Td>
            <Td className="border text-center p-2 text-sm">{data.author}</Td>
            <Td className="border text-center p-2 text-sm">{data.publisher}</Td>
            <Td className="border text-center p-2 text-sm">{data.category}</Td>
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

                <EditBookModal
                    isOpen={editBookModal.isOpen}
                    onClose={editBookModal.onClose}
                    bookData={data}
                    currentPage={currentPage}
                />

                <DeleteBookAlert
                    isOpen={deleteBookAlert.isOpen}
                    onClose={deleteBookAlert.onClose}
                    bookData={data}
                    currentPage={currentPage}
                />
            </Td>
        </Tr>
    );
};

export default BooksTable;
