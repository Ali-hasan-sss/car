import React, { useState } from "react";
import "./cards.css";
import { CarSale } from "@/Types/AuctionTypes";
import { IconButton, Menu, MenuItem } from "@mui/material";
import {
  Check,
  CheckCircle,
  Edit,
  EllipsisVertical,
  Eye,
  Trash,
  XCircle,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { base_url } from "@/utils/domain";
import { useLanguage } from "@/context/LanguageContext";

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
  onChangeStatus,
}) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [accept, setAccept] = useState<number | null>(null);
  const [reject, setReject] = useState<number | null>(null);
  const [finish, setFinish] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const userRole = useSelector((state: RootState) => state.auth.user?.userRole);
  const { isArabic } = useLanguage();
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
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
  // تحقق من وجود صور قبل عرضها
  const defaultImage =
    car.images && car.images.length > 0 ? car.images[0].image : null;

  return (
    <div className="car-card border rounded-lg overflow-hidden shadow-lg w-[300px]">
      {/* الصور */}
      <div className="image-gallery relative group">
        <div className="image-preview">
          {/* التحقق من وجود صورة معروضة */}
          {hoveredImage || defaultImage ? (
            <img
              src={`https://${base_url}/assets/img/common/${
                hoveredImage || defaultImage
              }`}
              alt="معاينة السيارة"
              className="w-full max-h-[200px] object-contain" // استخدام object-contain هنا
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

      {/* تفاصيل السيارة */}
      <div className="car-details p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4 justify-between">
            <h2 className="text-xl font-semibold">
              {`${car.category.manufacturer.title} - ${car.category.title}|  ${car.year}`}
            </h2>
            <span
              className={`text-white w-4 h-4 rounded-full ${
                car.status === 2 ? "bg-green-400" : "bg-red-500"
              } py-1 px-2`}
            ></span>
          </div>
          <div className="flex items-center">
            <IconButton onClick={(event) => handleMenuOpen(event, car.id)}>
              <EllipsisVertical className="text-gray-600 text-lg" />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedRow === car.id}
              onClose={handleMenuClose}
              PaperProps={{
                style: { minWidth: "150px" }, // تعيين عرض القائمة
              }}
            >
              <MenuItem onClick={() => handleView(car.id)}>
                <Eye className="text-blue-500 mr-2" />{" "}
                {isArabic ? "عرض التفاصيل" : "View Details"}
              </MenuItem>
              {userRole === "USER" && (
                <MenuItem onClick={() => onEdit(car)}>
                  <Edit className="text-yellow-500 mr-2" />{" "}
                  {isArabic ? "تعديل" : "Edit"}
                </MenuItem>
              )}
              {userRole === "USER" && (
                <MenuItem onClick={() => onDelete(car.id)}>
                  <Trash className="text-red-500 mr-2" />{" "}
                  {isArabic ? "حذف" : "Delete"}
                </MenuItem>
              )}
              {userRole === "ADMIN" && (
                <MenuItem
                  onClick={() => {
                    handleAccept(car.id);
                  }}
                >
                  <CheckCircle className="text-green-500 mr-2" />{" "}
                  {isArabic ? "قبول" : "Accept"}
                </MenuItem>
              )}
              {userRole === "ADMIN" && (
                <MenuItem
                  onClick={() => {
                    handleReject(car.id);
                  }}
                >
                  <XCircle className="text-red-500 mr-2" />{" "}
                  {isArabic ? "رفض" : "Reject"}
                </MenuItem>
              )}
              {userRole === "ADMIN" && (
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
        </div>
        <p className="text-gray-700">
          {isArabic ? "السعر" : "Price"}: ${car.price || "N/A"}
        </p>
        <p className="text-gray-500">
          {isArabic ? "المسافة المقطوعة" : "Mileage"}: {car.mileage || "N/A"} km
        </p>
        <p className="text-gray-500">
          {isArabic ? "اللون" : "Color"}: {car.ex_color || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default CarCard;
