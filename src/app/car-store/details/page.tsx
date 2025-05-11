"use client";

import { useEffect, useState } from "react";
//import { useLanguage } from "@/context/LanguageContext";
import { createPortal } from "react-dom";
import Navbar from "@/components/NavBar/navbar";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/LanguageContext";
import { base_url } from "@/utils/domain";
import {
  getDriveSystemText,
  getFuelText,
  getTimeAgo,
  getTransmissionText,
} from "@/utils/orderUtils";
import { ShoppingCart } from "lucide-react";

export default function Car() {
  const { isArabic, t } = useLanguage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [carData, setCarData] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [viewModel, setViewModel] = useState(true);
  const [viewColor, setViewColor] = useState(false);
  const [viewSystem, setViewSystem] = useState(false);
  // const { t } = useLanguage();

  useEffect(() => {
    const storedCar = localStorage.getItem("selectedCar");
    if (storedCar) {
      setCarData(JSON.parse(storedCar));
    }
  }, []);

  if (!carData) return <div className="p-8">لا توجد بيانات</div>;

  const images = carData.images || [];
  const displayedImages = showAllImages ? images : images.slice(0, 4);
  const fuleText = getFuelText(carData.fuel_type);
  const driveText = getDriveSystemText(carData.drive_system);
  const transmissionText = getTransmissionText(carData.transmission_type);
  const timeAgo = getTimeAgo(carData.created_at);

  const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div className=" text-sm flex items-center gap-2 font-bold ">
      <div className="  px-3 text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </div>
      <div
        className={` whitespace-nowrap overflow-hidden text-ellipsis ${
          label === "Price" || label === "السعر"
            ? "text-yellow-700"
            : "text-primary1"
        }`}
      >
        {value || "-"}
      </div>
    </div>
  );
  return (
    <>
      <Navbar />
      <div className=" mx-auto px-1 md:px-10 lg:px-20">
        <div className="relative flex flex-col items-center py-4 md:py-8 gap-1 md:gap-4 justify-center w-full">
          <h2 className="font-bold text-xl md:text-3xl">
            {isArabic ? "التفاصيل" : "Details"}
          </h2>
          <p className="text-gray-300 text-sm">
            Car Store &gt; View Details &gt; Details
          </p>
        </div>
        <div className="flex flex-col py-2 md:py-5 md:flex-row md:gap-6 ">
          {/* شبكة الصور */}
          <div className="w-full md:w-2/3">
            <div className="rounded-lg border w-full overflow-hidden max-h-[400px]">
              <div
                className={`grid grid-cols-2 gap-1 p-1 overflow-y-auto`}
                style={{
                  maxHeight: showAllImages ? "400px" : "100%",
                }}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {displayedImages.map((img: any, index: number) => (
                  <div
                    key={index}
                    className="w-full h-48 overflow-hidden cursor-pointer"
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
                ))}
              </div>
            </div>

            {!showAllImages && images.length > 4 && (
              <div className="text-center my-4">
                <button
                  onClick={() => setShowAllImages(true)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  {isArabic ? "عرض كل الصور" : "Show All Images"} (
                  {images.length})
                </button>
              </div>
            )}
          </div>

          {/* تفاصيل السيارة */}
          <div className="w-full py-6 md:w-1/3 h-[500px] overflow-hidden">
            <h1 className="text-xl md:text-3xl font-bold mb-1">
              {carData.category?.manufacturer?.title}-{carData.category?.title}
            </h1>

            <div className="flex flex-col h-[350px] justify-between">
              <div className="flex text-xl items-center gap-4 border-b-[3px] border-gray-300">
                <button
                  className={`text-gray-400 hover:text-primary1 ${
                    viewModel ? "text-primary1" : ""
                  }`}
                  onClick={() => {
                    setViewModel(true);
                    setViewColor(false);
                    setViewSystem(false);
                  }}
                >
                  Model
                </button>
                <button
                  className={`text-gray-400 hover:text-primary1 ${
                    viewColor ? "text-primary1" : ""
                  }`}
                  onClick={() => {
                    setViewColor(true);
                    setViewModel(false);
                    setViewSystem(false);
                  }}
                >
                  Color
                </button>
                <button
                  className={`text-gray-400 hover:text-primary1 ${
                    viewSystem ? "text-primary1" : ""
                  }`}
                  onClick={() => {
                    setViewColor(false);
                    setViewModel(false);
                    setViewSystem(true);
                  }}
                >
                  System
                </button>
              </div>
              {viewModel && (
                <div className="flex flex-col gap-3 mt-5">
                  <InfoItem
                    label={t("Car_Model")}
                    value={carData.cmodel?.title}
                  />
                  <InfoItem label={t("year")} value={carData.year} />
                  <InfoItem
                    label={t("Mileage")}
                    value={carData.mileage + " " + "KM"}
                  />
                </div>
              )}
              {viewColor && (
                <div className="flex flex-col gap-5 mt-5">
                  <InfoItem
                    label={t("Exterior_Color")}
                    value={carData.ex_color}
                  />
                  <InfoItem
                    label={t("Interior_Color")}
                    value={carData.in_color}
                  />
                </div>
              )}
              {viewSystem && (
                <div className="flex flex-col gap-5 mt-5 ">
                  <InfoItem label={t("Drive_System")} value={t(driveText)} />
                  <InfoItem
                    label={t("Transmission")}
                    value={t(transmissionText)}
                  />
                  <InfoItem label={t("Cylinders")} value={carData.cylinders} />
                  <InfoItem label={t("Fuel_Type")} value={t(fuleText)} />
                </div>
              )}
              <div className="flex flex-col gap-5 mt-5 border-t-[3px] pt-2 border-gray-400">
                {" "}
                <InfoItem
                  label={t("Price")}
                  value={carData.price + " " + "RO"}
                />
              </div>

              <div className=" gap-1 p-2 mt-10 w-[300px] flex items-center justify-between w-full">
                <button
                  onClick={() =>
                    window.open(
                      "https://api.whatsapp.com/send/?phone=+963994888888",
                      "_blank"
                    )
                  }
                  className="button_outline font-bold text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                  <ShoppingCart /> {isArabic ? "اشتري الان" : "Buy Now"}
                </button>
                <p className="text-xs text-gray-400 ">
                  <strong>{isArabic ? "تمت الإضافة" : "Added On"}:</strong>{" "}
                  {new Date(carData.created_at).toLocaleDateString()}
                </p>
                <span className="bg-primary1 text-white p-1 rounded-full text-xs">
                  {t("time_ago")} : {timeAgo}
                </span>
              </div>
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
                  className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded shadow hover:bg-rex-400"
                >
                  X
                </button>
              </div>
            </div>,
            document.body
          )}
      </div>

      <Footer />
    </>
  );
}
