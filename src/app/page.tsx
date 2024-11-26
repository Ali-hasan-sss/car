"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isArabic, setIsArabic] = useState(false);

  // تحديث اللغة بناءً على localStorage مباشرةً
  useEffect(() => {
    const updateLanguage = () => {
      const savedLanguage = localStorage.getItem("language");
      setIsArabic(savedLanguage === "ar");
    };

    // تعيين اللغة عند أول تحميل
    updateLanguage();

    // التفاعل مع تغييرات اللغة من أي مصدر خارجي
    window.addEventListener("storage", updateLanguage);

    return () => {
      window.removeEventListener("storage", updateLanguage);
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-16 px-8">
        <div className="container mx-auto text-center">
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

      {/* Services Section */}
      <section className="py-16 px-8 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            {isArabic ? "خدماتنا" : "Our Services"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="p-6 bg-white shadow-lg rounded-lg">
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
            <div className="p-6 bg-white shadow-lg rounded-lg">
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
            <div className="p-6 bg-white shadow-lg rounded-lg">
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
