"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DashboardCounts = () => {
    const booksQuery = useQuery({
        queryKey: ["books", "list"],
        queryFn: async () => {
            const response = await axios.get(
                "http://localhost:5050/books/list"
            );

            return response.data;
        },
    });

    const studentsQuery = useQuery({
        queryKey: ["students", "list"],
        queryFn: async () => {
            const response = await axios.get(
                "http://localhost:5050/students/list"
            );

            return response.data;
        },
    });

    return (
        <div className="w-full 2xl:w-[80%] mt-4 flex justify-evenly items-center text-center">
            <div className="w-[11rem] h-[9rem] flex flex-col items-center justify-center gap-2 bg-[#008948] border-2 border-[#F0D77B] rounded-lg">
                <p className="text-3xl font-bold">
                    {booksQuery.data?.length || 0}
                </p>
                <p className="font-medium">Total Books</p>
            </div>
            <div className="w-[11rem] h-[9rem] flex flex-col items-center justify-center gap-2 bg-[#008948] border-2 border-[#F0D77B] rounded-lg">
                <p className="text-3xl font-bold">
                    {studentsQuery.data?.length || 0}
                </p>
                <p className="font-medium">Total Students</p>
            </div>
            <div className="w-[11rem] h-[9rem] flex flex-col items-center justify-center gap-2 bg-[#008948] border-2 border-[#F0D77B] rounded-lg">
                <p className="text-3xl font-bold">0</p>
                <p className="font-medium">Issued Books</p>
            </div>
            <div className="w-[11rem] h-[9rem] flex flex-col items-center justify-center gap-2 bg-[#008948] border-2 border-[#F0D77B] rounded-lg">
                <p className="text-3xl font-bold">0</p>
                <p className="font-medium">Borowed Books</p>
            </div>
            <div className="w-[11rem] h-[9rem] flex flex-col items-center justify-center gap-2 bg-[#008948] border-2 border-[#F0D77B] rounded-lg">
                <p className="text-3xl font-bold">0</p>
                <p className="font-medium">N/A</p>
            </div>
        </div>
    );
};

export default DashboardCounts;
