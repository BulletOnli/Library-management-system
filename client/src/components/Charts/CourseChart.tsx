"use client";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CourseChart = () => {
    const data = {
        labels: ["BSIT", "BSED", "BSBA", "BSHM", "BSA"],
        datasets: [
            {
                data: [5, 12, 7, 8, 2],
                backgroundColor: ["red", "blue", "green", "pink", "yellow"],
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
