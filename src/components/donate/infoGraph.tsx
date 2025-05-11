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
import useGetGraphData from "../../hooks/useGetGraphData"; 
import LoadingAnimation from "../shared/loadingAnimation";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function InfoGraph() {


    const { data: dataInfo, isLoading } = useGetGraphData().getDonationData()
    const { } = useGetGraphData().getTicketData()

    // Get the last six months
    const lastSixMonths = dataInfo?.slice(-6);
    const amountArray = lastSixMonths?.map(item => item?.amount/100);

    // Format 'YYYY-MM' into 'MMM YYYY' (e.g., 'Nov 2024')
    const formattedMonths = lastSixMonths?.map((item: any) => {
        if (lastSixMonths?.length > 0) {
            const [year, month] = item?.month?.split('-')?.map(Number);
            const date = new Date(year, month - 1); // month is 0-indexed in JS
            const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
            const shortYear = `'${year.toString().slice(-2)}`; // Takes last 2 digits (e.g., '24')
            return `${monthName} ${shortYear}`;          
        }
    }); 

    // Chart Data
    const data = {
        labels: formattedMonths,
        datasets: [
            {
                label: "amount",
                data: amountArray, // Your dataset values
                backgroundColor: "#37137F",
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
                display: true,
                position: "bottom" as const,
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
                        return `Donations: £${value}`;
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
                    display: true, // Hide y-axis tick values
                },
            },
        },
    };

    return (
        <LoadingAnimation loading={isLoading} >
            <div className=" w-full h-fit flex justify-center " >
                <Bar data={data} options={options} height={300} />
            </div>
        </LoadingAnimation>
    )
}
