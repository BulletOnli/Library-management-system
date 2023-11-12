"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <CacheProvider>
                <Toaster richColors position="bottom-left" />
                <ChakraProvider>{children}</ChakraProvider>
            </CacheProvider>
            {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
    );
};

export default Providers;
