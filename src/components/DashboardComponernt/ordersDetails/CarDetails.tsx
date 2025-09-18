"use client";

import { useEffect, useRef, useState } from "react";
//import { useLanguage } from "@/context/LanguageContext";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";
import { getColorValue } from "@/utils/orderUtils";

export default function Car() {
  const { isArabic } = useLanguage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [carData, setCarData] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);
  const activeThumbRef = useRef<HTMLButtonElement | null>(null);
  // const { t } = useLanguage();

  useEffect(() => {
    const storedCar = localStorage.getItem("selectedCar");
    if (storedCar) {
      setCarData(JSON.parse(storedCar));
    }
  }, []);

  // لا نُرجع مبكراً حتى لا يتغير ترتيب Hooks
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const images = (carData?.images || []) as any[];
  const totalImages: number = images.length;
  const msrpValue: number = (carData?.msrp ?? carData?.price ?? 0) as number;

  const getImageUrlByIndex = (idx: number): string =>
    totalImages > 0 && images[idx]
      ? `https://backend.soufanglobal.com/assets/img/common/${images[idx].image}`
      : "";

  const goNext = () => {
    if (totalImages <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const goPrev = () => {
    if (totalImages <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const openLightbox = () => {
    const url = getImageUrlByIndex(currentIndex);
    if (url) setSelectedImage(url);
  };

  const scrollThumbnails = (dir: "left" | "right") => {
    const container = thumbnailsRef.current;
    if (!container) return;
    const scrollAmount =
      dir === "left" ? -container.clientWidth : container.clientWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [totalImages]);
  return (
    <>
      {!carData ? (
        <div className="p-8">لا توجد بيانات</div>
      ) : (
        <div className="p-4 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {carData.category?.manufacturer?.title} {carData.category?.title}
          </h1>

          {/* الحاوية الرئيسية: سلايدر الصور + التفاصيل */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* عرض الصور: سلايدر مع مصغرات */}
            <div className="w-full md:w-1/2">
              <div className="relative w-full overflow-hidden rounded-lg border bg-white h-[360px]">
                {totalImages > 0 ? (
                  <img
                    src={getImageUrlByIndex(currentIndex)}
                    alt={`car-${currentIndex}`}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={openLightbox}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    {isArabic ? "لا توجد صور" : "No images"}
                  </div>
                )}

                {totalImages > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/70"
                      aria-label={isArabic ? "السابق" : "Previous"}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/70"
                      aria-label={isArabic ? "التالي" : "Next"}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {totalImages > 1 && (
                <div className="mt-3 relative">
                  <button
                    type="button"
                    onClick={() => scrollThumbnails("left")}
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full shadow w-8 h-8 items-center justify-center hover:bg-white"
                    aria-label={isArabic ? "تحريك لليسار" : "Scroll left"}
                  >
                    ‹
                  </button>
                  <div
                    ref={thumbnailsRef}
                    className="flex gap-2 overflow-x-auto px-1 py-1 scroll-smooth"
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {images.map((img: any, index: number) => (
                      <button
                        key={index}
                        ref={index === currentIndex ? activeThumbRef : null}
                        onClick={() => setCurrentIndex(index)}
                        className={`shrink-0 rounded border ${
                          index === currentIndex
                            ? "ring-2 ring-blue-500 border-blue-500"
                            : "border-gray-200"
                        }`}
                        style={{ width: 88, height: 64 }}
                        aria-current={index === currentIndex}
                      >
                        <img
                          src={`https://backend.soufanglobal.com/assets/img/common/${img.image}`}
                          alt={`thumb-${index}`}
                          className="w-full h-full object-cover rounded"
                        />
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollThumbnails("right")}
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full shadow w-8 h-8 items-center justify-center hover:bg-white"
                    aria-label={isArabic ? "تحريك لليمين" : "Scroll right"}
                  >
                    ›
                  </button>
                </div>
              )}
            </div>

            {/* تفاصيل السيارة */}
            <div className="w-full md:w-1/2">
              <div className="border rounded bg-gray-100 p-4 shadow h-auto md:h-[360px] overflow-visible md:overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                  <div className="flex items-center justify-between md:col-span-2">
                    <span className="text-gray-600">
                      {isArabic ? "سعر الوكيل (MSRP)" : "MSRP"}
                    </span>
                    <span className="font-semibold">${msrpValue}</span>
                  </div>
                  <div className="flex items-center justify-between md:col-span-2">
                    <span className="text-gray-600">
                      {isArabic ? "السعر" : "Price"}
                    </span>
                    <span className="font-semibold">${carData.price}</span>
                  </div>
                  <p>
                    <strong>{isArabic ? "الموديل" : "Model"}:</strong>{" "}
                    {carData.cmodel?.title}
                  </p>
                  <p>
                    <strong>{isArabic ? "سنة الصنع" : "Year"}:</strong>{" "}
                    {carData.year}
                  </p>
                  <p>
                    <strong>
                      {isArabic ? "عدد الأسطوانات" : "Cylinders"}:
                    </strong>{" "}
                    {carData.cylinders}
                  </p>

                  <p>
                    <strong>
                      {isArabic ? "المسافة المقطوعة" : "Mileage"}:
                    </strong>{" "}
                    {carData.mileage} KM
                  </p>
                  <p>
                    <strong>{isArabic ? "نوع الوقود" : "Fuel Type"}:</strong>{" "}
                    {carData.fuel_type === 1
                      ? isArabic
                        ? "بنزين"
                        : "Petrol"
                      : isArabic
                      ? "ديزل"
                      : "Diesel"}
                  </p>
                  <p>
                    <strong>
                      {isArabic ? "نظام القيادة" : "Drive System"}:
                    </strong>{" "}
                    {carData.drive_system === 1
                      ? isArabic
                        ? "أمامي"
                        : "Front"
                      : isArabic
                      ? "خلفي"
                      : "Rear"}
                  </p>
                  <p>
                    <strong>
                      {isArabic ? "ناقل الحركة" : "Transmission"}:
                    </strong>{" "}
                    {carData.transmission_type === 1
                      ? isArabic
                        ? "أوتوماتيك"
                        : "Automatic"
                      : isArabic
                      ? "عادي"
                      : "Manual"}
                  </p>
                  <p>
                    <strong>{isArabic ? "تمت الإضافة" : "Added On"}:</strong>{" "}
                    {new Date(carData.created_at).toLocaleDateString()}
                  </p>
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <strong>
                          {isArabic ? "اللون الخارجي" : "Ex Color"}:
                        </strong>
                        <span
                          className={`inline-block w-5 h-5 rounded-full border ${getColorValue(
                            carData.ex_color || "gray"
                          )}`}
                        ></span>
                        <span>{carData.ex_color}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <strong>
                          {isArabic ? "اللون الداخلي" : "In Color"}:
                        </strong>
                        <span
                          className={`inline-block w-5 h-5 rounded-full border ${getColorValue(
                            carData.in_color || "gray"
                          )}`}
                        ></span>
                        <span>{carData.in_color}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* زر الشراء */}
              <div className="mt-4 flex flex-col gap-3">
                <button
                  type="button"
                  className="w-full bg-primary1 text-white py-3 rounded hover:bg-gray-900"
                >
                  {isArabic ? "احجز هذه السيارة" : "Get This Vehicle"}
                </button>
              </div>
            </div>
          </div>

          {/* وصف السيارة - كامل العرض */}
          <div className="mt-6">
            <div className="border rounded-lg bg-gray-100 p-4 shadow">
              <h2 className="text-lg font-semibold mb-2">
                {isArabic ? "وصف السيارة" : "Vehicle Description"}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {isArabic
                  ? "سيارة بحالة ممتازة ومناسبة للاستخدام اليومي والسفر، تتميز باستهلاك اقتصادي للوقود ومساحة داخلية مريحة وتقنيات أمان حديثة."
                  : "A well-maintained vehicle ideal for daily use and travel, featuring efficient fuel consumption, a comfortable interior, and modern safety technologies."}
              </p>
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
      )}
    </>
  );
}
