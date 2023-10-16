"use client";
import Sidebar from "@/components/Sidebar";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <CacheProvider>
            <ChakraProvider>
                <div className="w-full min-h-screen flex bg-[#28A86C] text-white">
                    <Sidebar />
                    <div className="w-full h-full flex ">{children}</div>
                </div>
            </ChakraProvider>
        </CacheProvider>
    );
};

export default App;
