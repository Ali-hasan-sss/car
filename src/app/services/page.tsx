"use client";

import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

interface Service {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: { ar: "استيراد السيارات", en: "Car Import" },
    description: {
      ar: "نساعدك في استيراد السيارات من كندا مع توفير جميع الإجراءات اللازمة.",
      en: "We assist you in importing cars from Canada, ensuring all required procedures.",
    },
    image: "/images/car-import.jpg",
  },
  {
    id: 2,
    title: { ar: "تسجيل المركبات", en: "Vehicle Registration" },
    description: {
      ar: "نقوم بتسهيل عملية تسجيل المركبات المستوردة في سلطنة عمان.",
      en: "We facilitate the registration of imported vehicles in Oman.",
    },
    image: "/images/car-registration.jpg",
  },
  {
    id: 3,
    title: { ar: "خدمات الفحص الفني", en: "Technical Inspection Services" },
    description: {
      ar: "نوفر لك خدمات الفحص الفني لضمان سلامة المركبات المستوردة.",
      en: "We provide technical inspection services to ensure the safety of imported vehicles.",
    },
    image: "/images/car-inspection.jpg",
  },
];

const ServicesPage: React.FC = () => {
  const { isDarkMode, isArabic } = useContext(AppContext); // استخدام القيم من السياق

  return (
    <div
      className={`p-4 min-h-screen ${isDarkMode ? "dark-bg-2" : "light-bg-2"}`}
    >
      <h1 className="text-center text-2xl font-bold mb-6">
        {isArabic ? "خدماتنا" : "Our Services"}
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className={`rounded-md shadow-md p-4 ${
              isDarkMode ? "dark-bg" : "light-bg"
            }`}
          >
            <img
              src={service.image}
              alt={isArabic ? service.title.ar : service.title.en}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold mb-2">
              {isArabic ? service.title.ar : service.title.en}
            </h2>
            <p>{isArabic ? service.description.ar : service.description.en}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
