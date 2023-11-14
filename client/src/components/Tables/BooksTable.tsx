import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useDisclosure,
    IconButton,
} from "@chakra-ui/react";
import EditBookModal from "../Modals/EditBookModal";
import DeleteBookAlert from "../Alerts/DeleteBookAlert";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

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

            {bookList?.length === 0 && (
                <div className="absolute text-xl">No result found!</div>
            )}
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
            <Td className="border p-2 text-center text-sm">
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
                    mx={1}
                    icon={<DeleteIcon />}
                    onClick={deleteBookAlert.onOpen}
                />

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
