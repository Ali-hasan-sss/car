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
import { useLanguage } from "@/context/LanguageContext";

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

const getChartData = (
  range: string,
  type: string,
  t: (key: string) => string
) => {
  // بيانات الطلبات (حسب المدى)
  switch (range) {
    case "week":
      return {
        labels: ["sat", "sun", "mon", "tue", "wed", "thu", "fri"].map(t),
        datasets: [
          {
            label: t("Auctions_Requests"),
            data: [10, 12, 11, 14, 13, 15, 9],
            backgroundColor: "rgba(41, 239, 153, 0.6)",
          },
          {
            label: t("Shipping_Requests"),
            data: [5, 7, 6, 8, 5, 6, 4],
            backgroundColor: "rgba(255, 159, 64, 0.6)",
          },
          {
            label: t("sale_Requests"),
            data: [8, 9, 7, 10, 6, 11, 8],
            backgroundColor: "rgba(79, 185, 180, 0.6)",
          },
        ],
      };
    case "month":
      return {
        labels: Array.from({ length: 4 }, (_, i) => `${t("week")} ${i + 1}`),
        datasets: [
          {
            label: t("Auctions_Requests"),
            data: [40, 45, 42, 50],
            backgroundColor: "rgba(41, 239, 153, 0.6)",
          },
          {
            label: t("Shipping_Requests"),
            data: [20, 25, 22, 28],
            backgroundColor: "rgba(255, 159, 64, 0.6)",
          },
          {
            label: t("sale_Requests"),
            data: [30, 35, 32, 38],
            backgroundColor: "rgba(79, 185, 180, 0.6)",
          },
        ],
      };
    case "6month":
      return {
        labels: ["jan", "feb", "march", "april", "may", "june"].map(t),
        datasets: [
          {
            label: t("Auctions_Requests"),
            data: [50, 65, 40, 80, 60, 90],
            backgroundColor: "rgba(41, 239, 153, 0.6)",
          },
          {
            label: t("Shipping_Requests"),
            data: [25, 35, 20, 40, 30, 45],
            backgroundColor: "rgba(255, 159, 64, 0.6)",
          },
          {
            label: t("sale_Requests"),
            data: [30, 45, 35, 50, 40, 55],
            backgroundColor: "rgba(79, 185, 180, 0.6)",
          },
        ],
      };
    case "year":
    default:
      return {
        labels: [
          "jan",
          "feb",
          "march",
          "april",
          "may",
          "june",
          "july",
          "august",
          "sep",
          "oct",
          "nov",
          "dec",
        ].map(t),
        datasets: [
          {
            label: t("Auctions_Requests"),
            data: [40, 50, 45, 60, 55, 70, 75, 80, 85, 90, 95, 100],
            backgroundColor: "rgba(41, 239, 153, 0.6)",
          },
          {
            label: t("Shipping_Requests"),
            data: [20, 30, 25, 35, 28, 40, 38, 45, 42, 50, 48, 55],
            backgroundColor: "rgba(255, 159, 64, 0.6)",
          },
          {
            label: t("sale_Requests"),
            data: [25, 35, 30, 40, 36, 45, 42, 50, 47, 55, 53, 60],
            backgroundColor: "rgba(79, 185, 180, 0.6)",
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
  const { t } = useLanguage();
  const chartData = getChartData(range, title_label, t);
  const finalChartType =
    chartType || (title_label === "reviews" ? "doughnut" : "bar");

  return (
    <div className="bg-white  p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{t(title_label)}</h2>
      {finalChartType === "bar" ? (
        <Bar data={chartData} options={options} />
      ) : (
        <Doughnut data={chartData} options={options} />
      )}
    </div>
  );
};

export default StatisticsChart;
