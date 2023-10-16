import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    HStack,
    Button,
} from "@chakra-ui/react";

const TABLE_ROWS = [
    {
        bookID: 1,
        title: "Book Title 1",
        author: "Author 1",
        publisher: "Publisher A",
        category: "Fiction",
    },
    {
        bookID: 2,
        title: "Book Title 2",
        author: "Author 2",
        publisher: "Publisher B",
        category: "Non-fiction",
    },
    {
        bookID: 3,
        title: "Book Title 3",
        author: "Author 3",
        publisher: "Publisher A",
        category: "Science",
    },
    {
        bookID: 4,
        title: "Book Title 4",
        author: "Author 4",
        publisher: "Publisher C",
        category: "Fantasy",
    },
    {
        bookID: 5,
        title: "Book Title 5",
        author: "Author 5",
        publisher: "Publisher D",
        category: "Mystery",
    },
    {
        bookID: 6,
        title: "Book Title 6",
        author: "Author 6",
        publisher: "Publisher B",
        category: "Romance",
    },
    {
        bookID: 7,
        title: "Book Title 7",
        author: "Author 7",
        publisher: "Publisher A",
        category: "Science",
    },
    {
        bookID: 8,
        title: "Book Title 8",
        author: "Author 8",
        publisher: "Publisher D",
        category: "Adventure",
    },
    {
        bookID: 9,
        title: "Book Title 9",
        author: "Author 9",
        publisher: "Publisher E",
        category: "History",
    },
    {
        bookID: 10,
        title: "Book Title 10",
        author: "Author 10",
        publisher: "Publisher F",
        category: "Fantasy",
    },
    {
        bookID: 11,
        title: "Book Title 11",
        author: "Author 11",
        publisher: "Publisher A",
        category: "Mystery",
    },
    {
        bookID: 12,
        title: "Book Title 12",
        author: "Author 12",
        publisher: "Publisher C",
        category: "Science",
    },
    {
        bookID: 13,
        title: "Book Title 13",
        author: "Author 13",
        publisher: "Publisher B",
        category: "Romance",
    },
    {
        bookID: 14,
        title: "Book Title 14",
        author: "Author 14",
        publisher: "Publisher D",
        category: "Non-fiction",
    },
    {
        bookID: 15,
        title: "Book Title 15",
        author: "Author 15",
        publisher: "Publisher E",
        category: "History",
    },
    {
        bookID: 16,
        title: "Book Title 16",
        author: "Author 16",
        publisher: "Publisher A",
        category: "Adventure",
    },
    {
        bookID: 17,
        title: "Book Title 17",
        author: "Author 17",
        publisher: "Publisher C",
        category: "Fantasy",
    },
    {
        bookID: 18,
        title: "Book Title 18",
        author: "Author 18",
        publisher: "Publisher D",
        category: "Romance",
    },
    {
        bookID: 19,
        title: "Book Title 19",
        author: "Author 19",
        publisher: "Publisher B",
        category: "Mystery",
    },
    {
        bookID: 20,
        title: "Book Title 20",
        author: "Author 20",
        publisher: "Publisher F",
        category: "Science",
    },
];

const TableComponent = () => {
    return (
        <TableContainer w="full" h="80vh" mt={10} overflowY="scroll">
            <Table variant="unstyled">
                <Thead>
                    <Tr>
                        <Th className="border text-center p-2 text-base bg-[#008948]">
                            Book ID
                        </Th>
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
                        <Th className="border text-center p-2 text-base bg-[#008948]">
                            Action
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {TABLE_ROWS.map((data) => (
                        <Tr key={data.bookID}>
                            <Td className="border text-center p-2 text-sm">
                                {data.bookID}
                            </Td>
                            <Td className="border text-center p-2 text-sm">
                                {data.title}
                            </Td>
                            <Td className="border text-center p-2 text-sm">
                                {data.author}
                            </Td>
                            <Td className="border text-center p-2 text-sm">
                                {data.publisher}
                            </Td>
                            <Td className="border text-center p-2 text-sm">
                                {data.category}
                            </Td>
                            <Td className="border text-center p-2 text-sm">
                                <Button
                                    size="sm"
                                    variant="solid"
                                    colorScheme="green"
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="solid"
                                    colorScheme="red"
                                >
                                    Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default TableComponent;
