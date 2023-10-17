import TableComponent from "@/components/TableComponent";
import {
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Spacer,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

const BooksList = () => {
    return (
        <div className="w-full min-h-screen flex flex-col items-center p-6">
            <div className="w-full flex items-center justify-center">
                <HStack>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <BiSearch />
                        </InputLeftElement>
                        <Input
                            variant="filled"
                            type="text"
                            placeholder="Phone number"
                        />
                    </InputGroup>
                </HStack>
            </div>

            <TableComponent />
        </div>
    );
};

export default BooksList;
