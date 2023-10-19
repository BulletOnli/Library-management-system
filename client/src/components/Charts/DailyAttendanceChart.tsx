"use client";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Percentage of the students who come to library everyday
const DailyAttendanceChart = () => {
    const data = {
        labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
        datasets: [
            {
                label: "Students",
                data: [1, 2, 3, 4, 5, 6],
                backgroundColor: "#F0D77B",
                borderColor: "black",
                borderWidth: 1,
            },
            {
                label: "Non-Teaching staff",
                data: [1, 2, 3, 4, 5, 6],
                backgroundColor: "#28A86C",
                borderColor: "black",
                borderWidth: 1,
            },
            {
                label: "Teachers",
                data: [1, 2, 3, 4, 5, 6],
                backgroundColor: "gray",
                borderColor: "black",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                grid: {
                    color: "white",
                },
                ticks: {
                    color: "white",
                },
            },
            y: {
                grid: {
                    color: "white",
                },
                ticks: {
                    color: "white",
                },
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: "white",
                },
            },
        },
    };

    return <Bar height={100} data={data} options={options} />;
};

export default DailyAttendanceChart;
