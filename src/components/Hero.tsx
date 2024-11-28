"use client";

import { useContext } from "react";
import { AppContext } from "../app/context/AppContext";
export default function Hero() {
  const { isArabic, isDarkMode } = useContext(AppContext);

  return (
    <div>
      <section
        className={`  py-16 px-8 ${isDarkMode ? "dark-bg-2" : "light-bg-2"}`}
      >
        <div className=" mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            {isArabic ? "استيراد السيارات من كندا" : "Import cars from Canada"}
          </h1>
          <p className="text-lg mb-8">
            {isArabic
              ? "نوفر لك خدمة استيراد السيارات بأفضل الأسعار والجودة العالية."
              : "We provide the best car importing services at competitive prices and high quality."}
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {isArabic ? "اطلب الآن" : "Order Now"}
          </button>
        </div>
      </section>
    </div>
  );
}
