// components/StatsCards.tsx
import React from "react";
import { PackageSearch, ShoppingCart, Truck } from "lucide-react";

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon }) => (
  <div
    className={`flex items-center gap-4 p-5 rounded-2xl shadow-md bg-secondary1 text-gray-700 transition hover:scale-[1.02] duration-200`}
  >
    <div className="text-4xl">{icon}</div>
    <div>
      <p className="text-sm opacity-90">{title}</p>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  </div>
);

export default function StatsCards() {
  return (
    <div className="flex w-full items-center flex-wrap gap-5">
      <StatCard
        title="طلبات المزاد"
        count={12}
        icon={<PackageSearch className="text-blue-500" size={32} />}
      />
      <StatCard
        title="طلبات البيع"
        count={8}
        icon={<ShoppingCart className="text-blue-500" size={32} />}
      />
      <StatCard
        title="طلبات الشحن"
        count={5}
        icon={<Truck size={32} className="text-yellow-300" />}
      />
    </div>
  );
}
