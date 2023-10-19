import TableComponent from "@/components/TableComponent";
import { Spacer } from "@chakra-ui/react";

const BooksList = () => {
    return (
        <div className="w-full min-h-screen flex flex-col items-center p-6">
            <div className="w-full flex items-center justify-center">Table</div>
            <Spacer />
            <TableComponent />
        </div>
    );
};

export default BooksList;
