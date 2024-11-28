"use client";

import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Hero from "@/components/Hero";
export default function Home() {
  const { isArabic, isDarkMode } = useContext(AppContext);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section
        className={`  py-16 px-8 ${isDarkMode ? "dark-bg" : "light-bg "}`}
      >
        <div
          className={`container mx-auto text-center ${
            isDarkMode ? "dark-bg" : "light-bg "
          }`}
        >
          <h2 className="text-3xl font-bold mb-8">
            {isArabic ? "خدماتنا" : "Our Services"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="p-6 border shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                {isArabic ? "تقرير حالة السيارة" : "Car Condition Report"}
              </h3>
              <p>
                {isArabic
                  ? "نقدم تقارير شاملة عن حالة السيارة، بما في ذلك المواصفات والحالة الميكانيكية."
                  : "We provide detailed reports on car condition, including specifications and mechanical status."}
              </p>
            </div>
            {/* Service 2 */}
            <div className="p-6 border shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                {isArabic ? "أسعار منافسة" : "Competitive Prices"}
              </h3>
              <p>
                {isArabic
                  ? "نضمن لك أفضل الأسعار عند استيراد السيارات مباشرة من كندا."
                  : "We guarantee the best prices for importing cars directly from Canada."}
              </p>
            </div>
            {/* Service 3 */}
            <div className="p-6 border shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                {isArabic ? "الشحن والتوصيل" : "Shipping and Delivery"}
              </h3>
              <p>
                {isArabic
                  ? "نوفر خدمة شحن آمنة وسريعة مع ضمان وصول السيارة بحالة ممتازة."
                  : "We provide secure and fast shipping with guaranteed car delivery in excellent condition."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
