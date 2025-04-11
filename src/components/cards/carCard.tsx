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

interface CarCardProps {
  car: CarSale;
  isloagedin: boolean;
  onEdit: (order: CarSale) => void;
  onDelete: (id: number) => void;
  onChangeStatus?: (id: number, type: "accept" | "reject" | "finish") => void;
}

const CarCard: React.FC<CarCardProps> = ({
  car,
  isloagedin,
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
              alt="Car Preview"
              className="w-full max-h-[200px] object-contain" // استخدام object-contain هنا
            />
          ) : (
            <div className="w-full h-[200px] bg-gray-300 flex items-center justify-center text-white">
              No Image Available
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
              No Thumbnails
            </div>
          )}
        </div>
      </div>

      {/* تفاصيل السيارة */}
      <div className="car-details p-4">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-semibold">
            {`${car.category.manufacturer.title} - ${car.category.title}|${car.cmodel.title}  ${car.year}`}
          </h2>
          <div className="flex items-center">
            <IconButton onClick={(event) => handleMenuOpen(event, car.id)}>
              <EllipsisVertical className="text-gray-600 text-lg" />
            </IconButton>

            {isloagedin && (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && selectedRow === car.id}
                onClose={handleMenuClose}
                PaperProps={{
                  style: { minWidth: "150px" }, // تعيين عرض القائمة
                }}
              >
                <MenuItem onClick={() => handleView(car.id)}>
                  <Eye className="text-blue-500 mr-2" /> عرض التفاصيل
                </MenuItem>

                <MenuItem onClick={() => onEdit(car)}>
                  <Edit className="text-yellow-500 mr-2" /> تعديل
                </MenuItem>

                <MenuItem onClick={() => onDelete(car.id)}>
                  <Trash className="text-red-500 mr-2" /> حذف
                </MenuItem>

                {userRole === "ADMIN" && (
                  <MenuItem
                    onClick={() => {
                      handleAccept(car.id);
                    }}
                  >
                    <CheckCircle className="text-green-500 mr-2" /> قبول
                  </MenuItem>
                )}
                {userRole === "ADMIN" && (
                  <MenuItem
                    onClick={() => {
                      handleReject(car.id);
                    }}
                  >
                    <XCircle className="text-red-500 mr-2" /> رفض
                  </MenuItem>
                )}
                {userRole === "ADMIN" && (
                  <MenuItem
                    onClick={() => {
                      handleFinish(car.id);
                    }}
                  >
                    <Check className="text-green-500 mr-2" /> تعيين ك منجز
                  </MenuItem>
                )}
              </Menu>
            )}
          </div>
        </div>
        <p className="text-gray-700">Price: ${car.price || "N/A"}</p>
        <p className="text-gray-500">Mileage: {car.mileage || "N/A"} km</p>
        <p className="text-gray-500">Color: {car.ex_color || "N/A"}</p>
      </div>
    </div>
  );
};

export default CarCard;
