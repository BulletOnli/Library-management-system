import Sidebar from "@/components/Sidebar";
import Providers from "./Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GJC Library",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <main className="w-full min-h-screen flex bg-[#28A86C] text-white">
                        <Sidebar />
                        <div className="w-[82vw] h-full flex flex-col">
                            {children}
                        </div>
                    </main>
                </Providers>
            </body>
        </html>
    );
}
