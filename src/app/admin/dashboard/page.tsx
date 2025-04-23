// pages/admin/dashboard.tsx
"use client";
import DateRangePicker from "@/app/admin/dashboard/homeDashboard/DateRangePicker";
import NotificationsCard from "@/app/admin/dashboard/homeDashboard/NotificationsCard";
import StatisticsChart from "@/app/admin/dashboard/homeDashboard/StatisticsChart";
import StatsCards from "@/app/admin/dashboard/homeDashboard/StatsCards";
import React, { useState } from "react";

export default function AdminDashboard() {
  const [range, setRange] = useState<"week" | "month" | "6month" | "year">(
    "week"
  );
  const handleRangeChange = (val: string) => {
    // تحقق من أن `val` هو واحد من القيم المسموح بها
    if (["week", "month", "6month", "year"].includes(val)) {
      setRange(val as "week" | "month" | "6month" | "year");
    }
  };
  return (
    <div className="p-10 bg-secondary1">
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>

      <div className="flex flex-wrab items-center w-full gap-4 mb-6">
        <StatsCards />
        <NotificationsCard unreadCount={3} />
      </div>
      <div className="w-full flex flex-wrap items-center just">
        <div className="w-full md:w-1/2  lg:w-1/4 ">
          <DateRangePicker value={range} onChange={handleRangeChange} />
        </div>
      </div>
      <div className="w-[full] h-[2px] bg-gray-400"></div>
      <div className="w-full mt-5 flex flex-wrap gap-4 justify-between">
        <div className="w-[450px]">
          <StatisticsChart title_label="احصائيات الطلبات" range={range} />
        </div>
        <div className="w-[2px] my-auto h-[300px] bg-gray-400"></div>
        <div className="w-[350px] ">
          <StatisticsChart
            title_label="التقييمات"
            chartType="doughnut"
            range={range}
          />
        </div>
      </div>
      <div className="w-[full] h-[2px] mt-5 bg-gray-400"></div>
    </div>
  );
}
