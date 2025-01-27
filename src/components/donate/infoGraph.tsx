import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function InfoGraph() {
    // Chart Data
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "",
                data: [300, 500, 400, 700, 600, 800], // Your dataset values
                backgroundColor: "#37137F4D",
                borderRadius: 15, // Make bars rounded on all corners
                borderSkipped: false, // Ensure rounding happens at the bottom
                barThickness: 40,
                hoverBackgroundColor: "#37137F"
            },
        ],
    };
    // Chart Options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: "top" as const,
            },
            title: {
                display: true,
                text: "",
            },
            tooltip: {
                enabled: true, // Enable tooltips
                callbacks: {
                    // Customize tooltip content
                    label: (context: any) => {
                        const value = context.raw;
                        return `Sales: $${value}`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Remove gridlines on the X-axis
                    drawBorder: false, // Remove the axis line
                },
                title: {
                    display: true,
                    text: "",
                },
            },
            y: {
                grid: {
                    display: false, // Remove gridlines on the X-axis
                    drawBorder: false, // Remove the axis line,
                },
                ticks: {
                    display: false, // Hide y-axis tick values
                },
            },
        },
    };
    return (
        <div className=" w-full h-[230px] flex justify-center " >
            <Bar data={data} options={options} height={230} />
        </div>
    )
}
