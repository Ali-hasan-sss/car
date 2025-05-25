"use client";

import { useEffect, useState } from "react";
//import { useLanguage } from "@/context/LanguageContext";
import { createPortal } from "react-dom";

import { useLanguage } from "@/context/LanguageContext";
import { base_url } from "@/utils/domain";
import {
  getCarSourceText,
  getDriveSystemText,
  getFuelText,
  getStatusInfo,
  getTimeAgo,
  getTransmissionText,
} from "@/utils/orderUtils";
import { ShoppingCart } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { fetchSocialMediaSuccess } from "@/store/Reducers/socialMediaReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
interface CarProps {
  isStore?: boolean;
}
export default function CarDetails({ isStore }: CarProps) {
  const { isArabic, t } = useLanguage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [carData, setCarData] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);
  // const { t } = useLanguage();
  const dispatch = useDispatch();
  const { socialMediaList, lastUpdated } = useSelector(
    (state: RootState) => state.socialMedia
  );
  useEffect(() => {
    const storedCar = localStorage.getItem("selectedCar");
    if (storedCar) {
      setCarData(JSON.parse(storedCar));
    }
  }, []);
  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const response = await axiosInstance.get("/admin/socials");
        if (response.data.success) {
          dispatch(fetchSocialMediaSuccess(response.data.data));
        }
      } catch (error) {
        console.error("حدث خطأ في جلب بيانات السوشيال ميديا:", error);
      } finally {
      }
    };
    const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 دقائق

    const currentTime = Date.now();
    if (currentTime - lastUpdated >= UPDATE_INTERVAL) {
      fetchSocialMedia();
    }
  }, [dispatch, lastUpdated]);
  if (!carData) return <div className="p-8">لا توجد بيانات</div>;
  const whatsappItem = socialMediaList.find((item) => item.icon === "whatsapp");
  const images = carData.images || [];
  const displayedImages = showAllImages ? images : images.slice(0, 4);
  const fuleText = getFuelText(carData.fuel_type);
  const driveText = getDriveSystemText(carData.drive_system);
  const transmissionText = getTransmissionText(carData.transmission_type);
  const carSourceText = getCarSourceText(carData.car_source);
  const timeAgo = getTimeAgo(carData.created_at, isArabic ? "ar" : "en");
  const statusInfo = getStatusInfo(carData.status);
  const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div className=" text-sm  font-bold text-center">
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
    <div className="w-full">
      <div
        className="flex flex-col md:flex-row md:gap-6 md:justify-between items-center"
        style={{ direction: "rtl" }}
      >
        {/* شبكة الصور */}
        <div className="w-full md:w-1/2">
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
                {isArabic ? "عرض كل الصور" : "Show All Images"} ({images.length}
                )
              </button>
            </div>
          )}
        </div>

        {/* تفاصيل السيارة */}
        <div className="w-full  py-6 md:w-1/2 relative overflow-hidden">
          <img
            src="/images/EllipseCarPage.png"
            className="absolute left-0 top-0 z-0 w-[350px] "
            alt=""
          />
          <div className="flex flex-col items-center z-10 justify-center">
            <h1 className="text-3xl z-20 font-bold mb-6 text-center">
              {carData.category?.manufacturer?.title} -{" "}
              {carData.category?.title}
            </h1>
            <div className="relative flex items-center w-[100px] h-[50px]">
              {!isArabic && (
                <img
                  src="/images/detailscar.png"
                  className="w-[50px] absolute top-0 left-0"
                  alt="sss"
                />
              )}
              <h2
                className="absolute top-2 text-primary1 font-bold text-xl"
                style={{ left: "35px" }}
              >
                {isArabic ? "التفاصيل" : "Details"}
              </h2>
            </div>
            <div className="flex gap-3 w-[300px] z-10 items-center justify-between">
              <InfoItem label={t("Car_Model")} value={carData.cmodel?.title} />

              <InfoItem label={t("year")} value={carData.year} />
            </div>
            <div className="flex gap-3 mt-4 z-10 w-[300px] items-center justify-between">
              <InfoItem label={t("Exterior_Color")} value={carData.ex_color} />
              <InfoItem label={t("Interior_Color")} value={carData.in_color} />
            </div>
            <div className="flex gap-3 mt-4 z-10 w-[300px]  items-center justify-between">
              <InfoItem
                label={t("Mileage")}
                value={carData.mileage + " " + "KM"}
              />
              <InfoItem label={t("Fuel_Type")} value={t(fuleText)} />
            </div>
            <div className="flex gap-3 mt-4 w-[300px] z-10 items-center justify-between">
              <InfoItem label={t("Drive_System")} value={t(driveText)} />
              <InfoItem label={t("Transmission")} value={t(transmissionText)} />
            </div>
            <div className="flex gap-3 mt-4 z-10 w-[300px] items-center justify-between">
              <InfoItem label={t("Cylinders")} value={carData.cylinders} />
              <InfoItem label={t("Price")} value={carData.price + " " + "RO"} />
            </div>
            <div className="flex gap-3 mt-4 z-10 w-[300px] items-center justify-between">
              <InfoItem label={t("car_source")} value={t(carSourceText)} />
            </div>
            <div className=" gap-1 p-2 mt-10 z-10 w-[300px] flex items-center justify-between w-full">
              {isStore ? (
                <button
                  onClick={() => {
                    if (whatsappItem?.link) {
                      window.open(whatsappItem.link, "_blank");
                    }
                  }}
                  className="button_outline font-bold text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                  <ShoppingCart /> {isArabic ? "اشتري الان" : "Buy Now"}
                </button>
              ) : (
                <p className="px-2 z-10 py-1 font-bold text-xs">
                  {t("status")} :
                  <span
                    className={` rounded-full px-2 py-1 ${statusInfo.color}`}
                  >
                    {t(statusInfo.label)}
                  </span>
                </p>
              )}
              <p className="text-xs text-gray-400 z-10 ">
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
  );
}
