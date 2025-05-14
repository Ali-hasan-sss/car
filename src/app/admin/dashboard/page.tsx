// pages/admin/dashboard.tsx
"use client";
import DateRangePicker from "@/app/admin/dashboard/homeDashboard/DateRangePicker";
import StatisticsChart from "@/app/admin/dashboard/homeDashboard/StatisticsChart";
import StatsCards from "@/app/admin/dashboard/homeDashboard/StatsCards";
import { useLanguage } from "@/context/LanguageContext";
import React, { useState } from "react";

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [range, setRange] = useState<"week" | "month" | "6month" | "year">(
    "week"
  );
  const handleRangeChange = (val: string) => {
    if (["week", "month", "6month", "year"].includes(val)) {
      setRange(val as "week" | "month" | "6month" | "year");
    }
  };
  return (
    <div className="p-10 bg-secondary1">
      <h1 className="text-2xl font-bold mb-6">{t("Dashboard")}</h1>

      <div className="flex flex-wrab items-center w-full gap-4 mb-6">
        <StatsCards />
      </div>
      <div className="w-full flex flex-wrap items-center">
        <div className="w-full  ">
          <DateRangePicker value={range} onChange={handleRangeChange} />
        </div>
      </div>
      {/* <div className="w-[full] h-[2px] bg-gray-300"></div> */}
      <div className="w-full h-[400px] mt-5 flex items-center justify-center">
        <div className="w-full md:w-3/4">
          <StatisticsChart
            title_label={t("Requests_Statistics")}
            range={range}
          />
        </div>
      </div>
    </div>
  );
}
