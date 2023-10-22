"use client";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Image,
    VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="sticky top-0 w-[18vw] h-screen flex flex-col items-center bg-[#008948]">
            <VStack mt={6}>
                <Image src="/gjclogo.png" alt="GJC Logo" width={120} />
                <p className="text-xl font-bold">College Library</p>
            </VStack>

            <nav className="w-full mt-16 text-center">
                <Link href="/">
                    <p
                        className={`${
                            pathname === "/" ? "bg-[#28A86C]" : "bg-none"
                        } font-medium text-lg px-4 py-2 hover:bg-[#28A86C] cursor-pointer`}
                    >
                        Dashboard
                    </p>
                </Link>
                <Link href="/">
                    <p
                        className={`${
                            pathname === "/activity"
                                ? "bg-[#28A86C]"
                                : "bg-none"
                        } font-medium text-lg px-4 py-2 hover:bg-[#28A86C] cursor-pointer`}
                    >
                        Activity Log
                    </p>
                </Link>
                <Link href="/students/manage">
                    <p
                        className={`${
                            pathname === "/students/manage"
                                ? "bg-[#28A86C]"
                                : "bg-none"
                        } font-medium text-lg px-4 py-2 hover:bg-[#28A86C] cursor-pointer`}
                    >
                        Manage Students
                    </p>
                </Link>
                <Link href="/books/manage">
                    <p
                        className={`${
                            pathname === "/books/manage"
                                ? "bg-[#28A86C]"
                                : "bg-none"
                        } font-medium text-lg px-4 py-2 hover:bg-[#28A86C] cursor-pointer`}
                    >
                        Manage Books
                    </p>
                </Link>

                {/* <Accordion allowMultiple>
                    <AccordionItem border="none">
                        <p className="font-medium">
                            <AccordionButton
                                _hover={{ bg: "#28A86C" }}
                                _expanded={{ bg: "#008445", color: "white" }}
                                position="relative"
                            >
                                <Box as="span" flex="1" fontSize="lg">
                                    Books
                                </Box>
                                <AccordionIcon position="absolute" right={4} />
                            </AccordionButton>
                        </p>
                        <Link href="/books/manage">
                            <AccordionPanel p={0} bg="#008445">
                                <p
                                    className={`${
                                        pathname === "/books/manage"
                                            ? "bg-[#28A86C]"
                                            : "bg-none"
                                    } font-medium py-3 hover:bg-[#28A86C] cursor-pointer`}
                                >
                                    Manage Books
                                </p>
                            </AccordionPanel>
                        </Link>
                        <Link href="/books/issued">
                            <AccordionPanel p={0} bg="#008445">
                                <p
                                    className={`${
                                        pathname === "/books/issued"
                                            ? "bg-[#28A86C]"
                                            : "bg-none"
                                    } font-medium py-3 hover:bg-[#28A86C] cursor-pointer`}
                                >
                                    Issued Books
                                </p>
                            </AccordionPanel>
                        </Link>
                    </AccordionItem>
                </Accordion> */}
            </nav>
        </div>
    );
};

export default Sidebar;
