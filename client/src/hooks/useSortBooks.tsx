import { BookType } from "@/components/Tables/BooksTable";
import { useState, useEffect } from "react";

const useSortBooks = (initialArray: BookType[], sortOrder: string) => {
    const [sortedArray, setSortedArray] = useState<BookType[]>([]);

    useEffect(() => {
        if (initialArray && sortOrder === "title") {
            const sorted = [...initialArray].sort((a: any, b: any) => {
                const nameA = a.title.toLowerCase();
                const nameB = b.title.toLowerCase();

                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
            setSortedArray(sorted);
        } else if (initialArray && sortOrder === "date") {
            setSortedArray(initialArray);
        } else {
            setSortedArray(initialArray);
        }
    }, [initialArray, sortOrder]);

    return { sortedArray };
};

export default useSortBooks;
