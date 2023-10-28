"use client";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StudentType } from "../Tables/StudentsTable";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const CourseChart = () => {
    const studentsQuery = useQuery({
        queryKey: ["students", "list"],
        queryFn: async () => {
            const response = await axios.get(
                "http://localhost:5050/students/list"
            );

            return response.data;
        },
    });

    const filterCourseCount = (course: string) => {
        return studentsQuery?.data?.filter(
            (a: StudentType) => a.studentCourse === course.toUpperCase()
        ).length;
    };

    const data = {
        labels: ["BSIT", "BSED", "BSBA", "BSHM", "BSA"],
        datasets: [
            {
                data: [
                    filterCourseCount("BSIT"),
                    filterCourseCount("BSED"),
                    filterCourseCount("BSBA"),
                    filterCourseCount("BSHM"),
                    filterCourseCount("BSA"),
                ],
                backgroundColor: [
                    "#8C3333", // Maroon
                    "#0077b6", // Blue
                    "#ffbd00", // Yellow
                    "#4c956c", // green
                    "#ffb3c1", // Pink
                ],
                borderColor: "#F0D77B",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    color: "#F0D77B",
                },
            },
        },
    };

    return (
        <div className="lg:w-[24rem] lg:h-[24rem] 2xl:w-[30rem] 2xl:h-[30rem]">
            <Pie data={data} options={options} />
        </div>
    );
};

export default CourseChart;
