"use client";

import { useLanguage } from "@/context/LanguageContext";
import { RootState } from "@/store/store";
import { CarSale } from "@/Types/AuctionTypes";
import { base_url } from "@/utils/domain";
import { getColorValue, getFuelText } from "@/utils/orderUtils";
import { Menu, MenuItem } from "@mui/material";
import {
  Check,
  CheckCircle,
  Edit,
  Eye,
  ShoppingCart,
  Trash,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface CarCardProps {
  car: CarSale;
  isloagedin: boolean;
  onEdit: (order: CarSale) => void;
  onDelete: (id: number) => void;
  onChangeStatus?: (id: number, type: "accept" | "reject" | "finish") => void;
}

const CarCard: React.FC<CarCardProps> = ({
  car,
  onDelete,
  onEdit,
  isloagedin,
  onChangeStatus,
}) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const { isArabic, t } = useLanguage();
  const [accept, setAccept] = useState<number | null>(null);
  const [reject, setReject] = useState<number | null>(null);
  const [finish, setFinish] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const userRole = useSelector((state: RootState) => state.auth.user?.userRole);
  const fuelText = getFuelText(car.fuel_type);
  const excolor = getColorValue(car.ex_color);
  const incolor = getColorValue(car.in_color);
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLDivElement>,
    id: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleView = (id: number) => {
    localStorage.setItem("selectedCar", JSON.stringify(car));
    router.push(`${pathname}/${id}`);
    handleMenuClose();
  };

  const handleAccept = (id: number) => {
    setAccept(id);
    console.log(accept);
    if (onChangeStatus) {
      onChangeStatus(id, "accept");
    }
    handleMenuClose();
  };

  const handleReject = (id: number) => {
    setReject(id);
    console.log(reject);
    if (onChangeStatus) onChangeStatus(id, "reject");
    handleMenuClose();
  };
  const handleFinish = (id: number) => {
    setFinish(id);
    console.log(finish);
    if (onChangeStatus) onChangeStatus(id, "finish");
    handleMenuClose();
  };
  const defaultImage =
    car.images && car.images.length > 0 ? car.images[0].image : null;
  return (
    <div className="w-[250px] bg-white rounded-2xl shadow-xl border overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {car.category.manufacturer.title} - {car.category.title}
          </h2>
          <div
            className="w-6 h-6 flex flex-col rounded-md flex cursor-pointer justify-start"
            onClick={(e) => handleMenuOpen(e, car.id)}
          >
            <div className="w-4 h-[2px] bg-primary1" />
            <div className="w-6 h-[2px] bg-primary1 mt-1" />
            <div className="w-4 h-[2px] bg-primary1 mt-1" />
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedRow === car.id}
            onClose={handleMenuClose}
            PaperProps={{
              style: { minWidth: "150px" },
            }}
          >
            <MenuItem onClick={() => handleView(car.id)}>
              <Eye className="text-blue-500 mr-2" />{" "}
              {isArabic ? "عرض التفاصيل" : "View Details"}
            </MenuItem>
            {userRole === "USER" && isloagedin && (
              <MenuItem onClick={() => onEdit(car)}>
                <Edit className="text-yellow-500 mr-2" />{" "}
                {isArabic ? "تعديل" : "Edit"}
              </MenuItem>
            )}
            {userRole === "USER" && isloagedin && (
              <MenuItem onClick={() => onDelete(car.id)}>
                <Trash className="text-red-500 mr-2" />{" "}
                {isArabic ? "حذف" : "Delete"}
              </MenuItem>
            )}
            {userRole === "ADMIN" && isloagedin && (
              <MenuItem
                onClick={() => {
                  handleAccept(car.id);
                }}
              >
                <CheckCircle className="text-green-500 mr-2" />{" "}
                {isArabic ? "قبول" : "Accept"}
              </MenuItem>
            )}
            {userRole === "ADMIN" && isloagedin && (
              <MenuItem
                onClick={() => {
                  handleReject(car.id);
                }}
              >
                <XCircle className="text-red-500 mr-2" />{" "}
                {isArabic ? "رفض" : "Reject"}
              </MenuItem>
            )}
            {userRole === "ADMIN" && isloagedin && (
              <MenuItem
                onClick={() => {
                  handleFinish(car.id);
                }}
              >
                <Check className="text-green-500 mr-2" />{" "}
                {isArabic ? "تعيين ك منجز" : "Mark as Finished"}
              </MenuItem>
            )}
          </Menu>
        </div>
        <p className="text-gray-400 text-sm"> {car.year}</p>
      </div>

      {/* صورة السيارة */}
      <div className="image-gallery w-full relative group">
        <div className="image-preview w-full">
          {/* التحقق من وجود صورة معروضة */}
          {hoveredImage || defaultImage ? (
            <img
              src={`https://${base_url}/assets/img/common/${
                hoveredImage || defaultImage
              }`}
              alt="معاينة السيارة"
              className="w-full h-[200px] object-cover"
            />
          ) : (
            <div className="w-full h-[200px] bg-gray-300 flex items-center justify-center text-white">
              {isArabic ? "لا يتوفر صور" : "No Image Available"}
            </div>
          )}
        </div>
        <div className="image-thumbnails absolute top-2 left-0 w-full flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* عرض صور المصغرات إذا كانت موجودة */}
          {car.images && car.images.length > 0 ? (
            car.images.map((image) => (
              <img
                key={image.id}
                src={`https://${base_url}/assets/img/common/${image.image}`}
                alt="Thumbnail"
                className="w-12 h-12 object-cover cursor-pointer rounded-md"
                onMouseEnter={() => setHoveredImage(image.image)}
              />
            ))
          ) : (
            <div className="w-full h-12 bg-gray-300 flex items-center justify-center text-white">
              {isArabic ? "لا توجد صور مصغرة" : "No Thumbnails"}
            </div>
          )}
        </div>
      </div>

      {/* المعلومات السفلية */}
      <div className="p-4">
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-black">⛽ {t("Fuel_Type")}</span>
            <span>{t(fuelText)}</span>
          </div>
          <div className="w-[1px] h-15 bg-gray-400 "></div>
          <div className="flex flex-col items-center">
            <span className="text-black">🕒 {t("Mileage")}</span>
            <span>{car.mileage} KM</span>
          </div>
          <div className="w-[1px] h-15 bg-gray-400 "></div>
          <div className="flex flex-col items-center">
            <span className="text-black">🎨 {t("Color")}</span>
            <div className={`flex  gap-1 mt-1`}>
              <span
                className={`w-4 h-4 flex items-center justify-center text-[8px] rounded-full border border-gray-300 ${excolor} ${
                  car.ex_color === "white" ? "text-black" : "text-white"
                }`}
              >
                ex
              </span>
              <span
                className={`w-4 h-4 flex items-center justify-center text-[8px] rounded-full border border-gray-300 ${incolor}  ${
                  car.in_color === "white" ? "text-black" : "text-white"
                }`}
              >
                in
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">{t("Price")}</p>
            <p className="text-yellow-500 font-bold text-xl">{car.price} RO</p>
          </div>
          <button
            onClick={() =>
              window.open(
                "https://api.whatsapp.com/send/?phone=+963994888888",
                "_blank"
              )
            }
            className="bg-teal-600 hover:bg-teal-700 text-sm text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <ShoppingCart /> {isArabic ? "اشتري الان" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
