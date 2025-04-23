// components/StatisticsChart.tsx
import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface StatisticsChartProps {
  range: "week" | "month" | "6month" | "year";
  title_label: string;
  chartType?: "bar" | "doughnut";
}

const getChartData = (range: string, type: string) => {
  if (type === "التقييمات") {
    return {
      labels: ["5 نجوم", "4 نجوم", "3 نجوم", "نجمتين", "نجمة واحدة"],
      datasets: [
        {
          label: "عدد التقييمات",
          data: [120, 80, 40, 20, 10],
          backgroundColor: [
            "#10B981",
            "#3B82F6",
            "#F59E0B",
            "#F97316",
            "#EF4444",
          ],
        },
      ],
    };
  }

  // بيانات الطلبات (حسب المدى)
  switch (range) {
    case "week":
      return {
        labels: [
          "السبت",
          "الأحد",
          "الاثنين",
          "الثلاثاء",
          "الأربعاء",
          "الخميس",
          "الجمعة",
        ],
        datasets: [
          {
            label: "طلبات المزاد",
            data: [10, 12, 11, 14, 13, 15, 9],
            backgroundColor: "rgba(153, 102, 255, 0.6)",
          },
          {
            label: "طلبات الشحن",
            data: [5, 7, 6, 8, 5, 6, 4],
            backgroundColor: "rgba(255, 159, 64, 0.6)",
          },
          {
            label: "طلبات البيع",
            data: [8, 9, 7, 10, 6, 11, 8],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      };
    case "month":
      return {
        labels: Array.from({ length: 4 }, (_, i) => `الأسبوع ${i + 1}`),
        datasets: [
          {
            label: "طلبات المزاد",
            data: [40, 45, 42, 50],
            backgroundColor: "rgba(153, 102, 255, 0.6)",
          },
          {
            label: "طلبات الشحن",
            data: [20, 25, 22, 28],
            backgroundColor: "rgba(255, 159, 64, 0.6)",
          },
          {
            label: "طلبات البيع",
            data: [30, 35, 32, 38],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      };
    case "6month":
      return {
        labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
        datasets: [
          {
            label: "طلبات المزاد",
            data: [50, 65, 40, 80, 60, 90],
            backgroundColor: "rgba(153, 102, 255, 0.6)",
          },
          {
            label: "طلبات الشحن",
            data: [25, 35, 20, 40, 30, 45],
            backgroundColor: "rgba(255, 159, 64, 0.6)",
          },
          {
            label: "طلبات البيع",
            data: [30, 45, 35, 50, 40, 55],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      };
    case "year":
    default:
      return {
        labels: [
          "يناير",
          "فبراير",
          "مارس",
          "أبريل",
          "مايو",
          "يونيو",
          "يوليو",
          "أغسطس",
          "سبتمبر",
          "أكتوبر",
          "نوفمبر",
          "ديسمبر",
        ],
        datasets: [
          {
            label: "طلبات المزاد",
            data: [40, 50, 45, 60, 55, 70, 75, 80, 85, 90, 95, 100],
            backgroundColor: "rgba(153, 102, 255, 0.6)",
          },
          {
            label: "طلبات الشحن",
            data: [20, 30, 25, 35, 28, 40, 38, 45, 42, 50, 48, 55],
            backgroundColor: "rgba(255, 159, 64, 0.6)",
          },
          {
            label: "طلبات البيع",
            data: [25, 35, 30, 40, 36, 45, 42, 50, 47, 55, 53, 60],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      };
  }
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const StatisticsChart: React.FC<StatisticsChartProps> = ({
  range,
  title_label,
  chartType,
}) => {
  const chartData = getChartData(range, title_label);
  const finalChartType =
    chartType || (title_label === "التقييمات" ? "doughnut" : "bar");

  return (
    <div className="bg-white  p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{title_label}</h2>
      {finalChartType === "bar" ? (
        <Bar data={chartData} options={options} />
      ) : (
        <Doughnut data={chartData} options={options} />
      )}
    </div>
  );
};

export default StatisticsChart;
