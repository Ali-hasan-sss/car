"use client";

import { useEffect, useState } from "react";
//import { useLanguage } from "@/context/LanguageContext";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";
import {
  getDriveSystemText,
  getFuelText,
  getTransmissionText,
} from "@/utils/orderUtils";
import { base_url } from "@/utils/domain";

export default function Car() {
  const { isArabic } = useLanguage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [carData, setCarData] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);
  // const { t } = useLanguage();

  useEffect(() => {
    const storedCar = localStorage.getItem("selectedCar");
    if (storedCar) {
      setCarData(JSON.parse(storedCar));
    }
  }, []);

  if (!carData) return <div className="p-8">لا توجد بيانات</div>;
  const transmissionText = getTransmissionText(carData.transmission_type);
  const fuelText = getFuelText(carData.fuel_type);
  const DriveSystemText = getDriveSystemText(carData.drive_system);
  const images = carData.images || [];
  const displayedImages = showAllImages ? images : images.slice(0, 4);

  const isOdd = displayedImages.length % 2 !== 0;
  return (
    <>
      <div className="p-4 max-w-5xl mx-auto">
        <div className="flex items-center mb-5 justify-between">
          <h1 className="text-3xl  font-bold text-center">
            {carData.category?.manufacturer?.title} {carData.category?.title}
          </h1>
          <span
            className={`text-white rounded-full shadow ${
              carData.status === 2 ? "bg-green-400" : "bg-red-400"
            } py-1 px-2`}
          >
            {carData.status === 2
              ? "متاحة"
              : carData.status === 3
              ? "مباعة"
              : "غير متاحة"}
          </span>
        </div>
        {/* الحاوية الرئيسية: شبكة الصور + التفاصيل */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* شبكة الصور */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-lg border w-full">
              <div
                className={`grid grid-cols-2 gap-1 absolute inset-0 p-1`}
                style={{
                  overflowY: showAllImages ? "auto" : "hidden",
                }}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {displayedImages.map((img: any, index: number) => {
                  const isLastAndOdd =
                    isOdd && index === displayedImages.length - 1;
                  return (
                    <div
                      key={index}
                      className={`relative ${
                        isLastAndOdd ? "col-span-2" : "col-span-1"
                      } aspect-square overflow-hidden cursor-pointer`}
                      onClick={() =>
                        setSelectedImage(
                          `https://${base_url}/assets/img/common/${img.image}`
                        )
                      }
                    >
                      <img
                        src={`https://${base_url}/assets/img/common/${img.image}`}
                        alt={`car-${index}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {!showAllImages && images.length > 4 && (
              <div className="text-center my-4">
                <button
                  onClick={() => setShowAllImages(true)}
                  className="text-blue-600 hover:underline"
                >
                  {isArabic ? "عرض كل الصور" : "Show All Images"} (
                  {images.length})
                </button>
              </div>
            )}
          </div>

          {/* تفاصيل السيارة */}
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg bg-white p-6 rounded shadow">
              <p>
                <strong>{isArabic ? "السعر" : "Price"}:</strong> {carData.price}{" "}
                $
              </p>
              <p>
                <strong>{isArabic ? "الموديل" : "Model"}:</strong>{" "}
                {carData.cmodel?.title}
              </p>
              <p>
                <strong>{isArabic ? "سنة الصنع" : "Year"}:</strong>{" "}
                {carData.year}
              </p>
              <p>
                <strong>{isArabic ? "عدد الأسطوانات" : "Cylinders"}:</strong>{" "}
                {carData.cylinders}
              </p>
              <p>
                <strong>
                  {isArabic ? "اللون الخارجي" : "Exterior Color"}:
                </strong>{" "}
                {carData.ex_color}
              </p>
              <p>
                <strong>
                  {isArabic ? "اللون الداخلي" : "Interior Color"}:
                </strong>{" "}
                {carData.in_color}
              </p>
              <p>
                <strong>{isArabic ? "المسافة المقطوعة" : "Mileage"}:</strong>{" "}
                {carData.mileage} كم
              </p>
              <p>
                <strong>{isArabic ? "نوع الوقود" : "Fuel Type"}:</strong>{" "}
                {fuelText}
              </p>
              <p>
                <strong>{isArabic ? "نظام القيادة" : "Drive System"}:</strong>{" "}
                {DriveSystemText}
              </p>
              <p>
                <strong>{isArabic ? "ناقل الحركة" : "Transmission"}:</strong>{" "}
                {transmissionText}
              </p>
              <p>
                <strong>{isArabic ? "تمت الإضافة" : "Added On"}:</strong>{" "}
                {new Date(carData.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage &&
          createPortal(
            <div
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl w-full px-4">
                <img
                  src={selectedImage}
                  alt="Full Size"
                  className="w-full max-h-[90vh] object-contain rounded"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                  className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200"
                >
                  X
                </button>
              </div>
            </div>,
            document.body
          )}
      </div>
    </>
  );
}
