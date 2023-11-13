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
                <Image src="/gjclogo.png" alt="GJC Logo" width={100} />
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
                <Link href="/visitor">
                    <p
                        className={`${
                            pathname === "/visitor" ? "bg-[#28A86C]" : "bg-none"
                        } font-medium text-lg px-4 py-2 hover:bg-[#28A86C] cursor-pointer`}
                    >
                        Visitor Log
                    </p>
                </Link>
                <Link href="/students/manage?page=1&sortBy=title">
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
                <Link href="/books/manage?page=1&sortBy=title">
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
                <Link href="/">
                    <p
                        className={`${
                            pathname === "/" ? "bg-[#28A86C]" : "bg-none"
                        } font-medium text-lg px-4 py-2 hover:bg-[#28A86C] cursor-pointer`}
                    >
                        Issue Book
                    </p>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
