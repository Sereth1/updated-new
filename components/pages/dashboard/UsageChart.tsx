import { Card, CardContent, CardHeader } from "@/components/cards/Card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "UPDT Usage",
      data: [15, 20, 15, 25, 22, 30, 28],
      borderColor: "rgb(0, 240, 255)",
      backgroundColor: "rgba(0, 240, 255, 0.1)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "rgb(0, 240, 255)",
      pointBorderColor: "rgb(0, 240, 255)",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(0, 240, 255)",
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 12,
      borderColor: "rgba(0, 240, 255, 0.2)",
      borderWidth: 1,
      displayColors: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 30,
      ticks: {
        stepSize: 5,
        color: "rgba(255, 255, 255, 0.6)",
        font: {
          size: 12,
        },
      },
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
        drawBorder: false,
      },
      border: {
        display: false,
      },
    },
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
        drawBorder: false,
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.6)",
        font: {
          size: 12,
        },
      },
      border: {
        display: false,
      },
    },
  },
  interaction: {
    intersect: false,
    mode: "index" as const,
  },
  elements: {
    line: {
      borderJoinStyle: "round" as const,
    },
  },
};

export const UsageChart = () => {
  return (
    <Card variant="glass" className="h-[400px]">
      <CardHeader>
        <h2 className="text-xl font-semibold text-white">
          UPDT Usage (Last 7 Days)
        </h2>
      </CardHeader>
      <CardContent className="h-[calc(100%-80px)]">
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
};
