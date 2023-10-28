"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { StudentType } from "./Tables/StudentsTable";

const DashboardCounts = () => {
    const queryClient = useQueryClient();

    const booksQuery = useQuery({
        queryKey: ["books", "list"],
        queryFn: async () => {
            const response = await axios.get(
                "http://localhost:5050/books/list"
            );

            return response.data;
        },
    });

    const studentsList: StudentType[] | undefined = queryClient.getQueryData([
        "students",
        "list",
    ]);

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
                    {studentsList?.length || 0}
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
