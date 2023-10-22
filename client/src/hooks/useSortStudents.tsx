import { StudentType } from "@/components/Tables/StudentsTable";
import { useState, useEffect } from "react";

const useSortStudents = (initialArray: StudentType[], sortOrder: string) => {
    const [sortedArray, setSortedArray] = useState<StudentType[]>([]);

    useEffect(() => {
        if (initialArray && sortOrder === "studentName") {
            const sorted = [...initialArray].sort((a: any, b: any) => {
                const nameA = a.studentName.toLowerCase();
                const nameB = b.studentName.toLowerCase();

                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
            setSortedArray(sorted);
        } else if (initialArray && sortOrder === "Date") {
            setSortedArray(initialArray);
        } else {
            setSortedArray(initialArray);
        }
    }, [initialArray, sortOrder]);

    return { sortedArray };
};

export default useSortStudents;
