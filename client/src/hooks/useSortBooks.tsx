import { BookType } from "@/components/BooksTable";
import { useState, useEffect } from "react";

const useSortBooks = (initialArray: BookType[], sortOrder: string) => {
    const [sortedArray, setSortedArray] = useState<BookType[]>([]);

    useEffect(() => {
        if (initialArray && sortOrder === "Title") {
            const sorted = [...initialArray].sort((a: any, b: any) => {
                const nameA = a.title.toLowerCase();
                const nameB = b.title.toLowerCase();

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

export default useSortBooks;
