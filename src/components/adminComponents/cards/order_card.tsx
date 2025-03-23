import { Order } from "@/Types/orderTypes";
import React from "react";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const {
    category,
    year,
    transmission_type,
    fuel_type,
    cylinders,
    from_budget,
    to_budget,
    ex_color,
    in_color,
    country,
    user,
    status,
    shipping_option,
    created_at,
  } = order;

  const transmissionText = transmission_type === 1 ? "Automatic" : "Manual";
  const fuelText = fuel_type === 1 ? "Petrol" : "Diesel";
  const shippingText = shipping_option === 1 ? "Yes" : "No";
  const statusMap: Record<number, { label: string; color: string }> = {
    0: { label: "محذوف", color: "bg-red-500 text-white" },
    1: { label: "قيد الانتظار", color: "bg-yellow-400 text-white" },
    2: { label: "قيد التنفيذ", color: "bg-blue-500 text-white" },
    3: { label: "منجز", color: "bg-green-500 text-white" },
  };

  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200 w-full mx-auto mb-4">
      {/* Card Header */}
      <h2
        className={`text-2xl font-bold rounded-t-xl text-gray-800 mb-2 w-full p-2 ${statusMap[status].color} col-span-full`}
      >
        {category?.manufacturer.title} {category?.title} - {year}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col space-y-4 px-3 py-1 text-gray-700 text-lg sm:col-span-1 lg:col-span-1">
          {/* Car Info */}
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Transmission:</span>{" "}
              {transmissionText}
            </p>
            <p>
              <span className="font-semibold">Fuel Type:</span> {fuelText}
            </p>
            <p>
              <span className="font-semibold">Cylinders:</span> {cylinders}
            </p>
            <p>
              <span className="font-semibold">Colors:</span> Exterior:{" "}
              {ex_color} / Interior: {in_color}
            </p>
            <p>
              <span className="font-semibold">Country:</span> {country?.title}
            </p>
            <p>
              <span className="font-semibold">Budget Range:</span> $
              {from_budget} - ${to_budget}
            </p>
            <p>
              <span className="font-semibold">Shipping:</span> {shippingText}
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-4 text-gray-700 text-lg sm:col-span-1 lg:col-span-1">
          {/* User Info */}
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {user?.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span>{" "}
              {user?.contact.mobile}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {user?.contact.address1}, {user?.contact.city}
            </p>
            <p>
              <span className="font-semibold">ZIP Code:</span>{" "}
              {user?.contact.zip_code}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">ID Image:</span>
              <a
                href={user?.idDetail.id_file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold text-lg">Status:</span>
              <span
                className={`text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${statusMap[status]?.color}`}
              >
                {statusMap[status]?.label}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Order created date */}
      <div className="mt-2 text-xs bg-gray-200 text-gray-500 px-6 py-2 text-center">
        Order created on:{" "}
        {new Date(created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
};

export default OrderCard;
