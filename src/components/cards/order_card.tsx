import { useLanguage } from "@/context/LanguageContext";
import { RootState } from "@/store/store";
import { Auction } from "@/Types/AuctionTypes";
import {
  getFuelText,
  getShippingText,
  getStatusInfo,
  getTimeAgo,
  getTransmissionText,
} from "@/utils/orderUtils";
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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

interface OrderCardProps {
  order: Auction;
  onDelete: (id: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEdit: (order: any) => void;
  onChangeStatus?: (id: number, type: "accept" | "reject" | "finish") => void;
  actionLoading: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onDelete,
  onEdit,
  actionLoading,
  onChangeStatus,
}) => {
  const { t } = useLanguage();
  const {
    id,
    category,
    year,
    cylinders,
    from_budget,
    to_budget,
    ex_color,
    in_color,
    country,
    user,
    created_at,
  } = order;
  const router = useRouter();
  const pathname = usePathname();
  const transmissionText = getTransmissionText(order.transmission_type);
  const fuelText = getFuelText(order.fuel_type);
  const shippingText = getShippingText(order.shipping_option);
  const statusInfo = getStatusInfo(order.status);
  const timeAgo = getTimeAgo(order.created_at);
  const createdDate = new Date(created_at);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [accept, setAccept] = useState<number | null>(null);
  const [reject, setReject] = useState<number | null>(null);
  const [finish, setFinish] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
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
  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200 w-full mx-auto mb-4">
      {/* Card Header */}
      <div
        className={`flex items-center justify-between px-1 rounded-t-xl w-full !bg-opacity-100 ${statusInfo.color} `}
      >
        {" "}
        <h2
          className={`text-xl font-bold rounded-t-xl text-gray-800  w-full p-2  col-span-full`}
        >
          {category?.manufacturer.title} {category?.title} - {year}
        </h2>
        {actionLoading ? (
          <PulseLoader size={6} color="#ffffff" />
        ) : (
          <div className="flex items-center">
            <IconButton onClick={(event) => handleMenuOpen(event, order.id)}>
              <EllipsisVertical className="text-gray-600 text-lg" />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedRow === order.id}
              onClose={handleMenuClose}
              PaperProps={{
                style: { minWidth: "150px" }, // تعيين عرض القائمة
              }}
            >
              <MenuItem onClick={() => handleView(order.id)}>
                <Eye className="text-blue-500 mr-2" />
                {t("details")}
              </MenuItem>

              {order.status === 1 && (
                <MenuItem onClick={() => onEdit(order)}>
                  <Edit className="text-yellow-500 mr-2" /> {t("Edit")}
                </MenuItem>
              )}

              <MenuItem onClick={() => onDelete(id)}>
                <Trash className="text-red-500 mr-2" /> {t("Delete")}
              </MenuItem>

              {userRole === "ADMIN" && (
                <MenuItem
                  onClick={() => {
                    handleAccept(order.id);
                  }}
                >
                  <CheckCircle className="text-green-500 mr-2" /> {t("Accept")}
                </MenuItem>
              )}

              {userRole === "ADMIN" && (
                <MenuItem
                  onClick={() => {
                    handleReject(order.id);
                  }}
                >
                  <XCircle className="text-red-500 mr-2" /> {t("Reject")}
                </MenuItem>
              )}
              {userRole === "ADMIN" && (
                <MenuItem
                  onClick={() => {
                    handleFinish(order.id);
                  }}
                >
                  <Check className="text-green-500 mr-2" /> {t("complete")}
                </MenuItem>
              )}
            </Menu>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col space-y-4 px-3 py-1 text-gray-700 text-sm sm:col-span-1 lg:col-span-1">
          {/* Car Info */}
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Transmission:</span>{" "}
              {transmissionText}
            </p>
            <p>
              <span className="font-semibold">Fuel Type:</span> {fuelText}
            </p>
            <p>
              <span className="font-semibold">Cylinders:</span> {cylinders}
            </p>
            <p>
              <span className="font-semibold">Colors:</span> Exterior:{" "}
              {ex_color} / Interior: {in_color}
            </p>
            <p>
              <span className="font-semibold">Country:</span> {country?.title}
            </p>
            <p>
              <span className="font-semibold">Budget Range:</span> $
              {from_budget} - ${to_budget}
            </p>
            <p>
              <span className="font-semibold">Shipping:</span> {shippingText}
            </p>
          </div>
        </div>

        <div className="flex flex-col px-3 space-y-4 text-gray-700 text-sm sm:col-span-1 lg:col-span-1">
          {/* User Info */}
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {user?.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span>{" "}
              {user?.contact.mobile}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {user?.contact.address1}, {user?.contact.city}
            </p>
            <p>
              <span className="font-semibold">ZIP Code:</span>{" "}
              {user?.contact.zip_code}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">ID Image:</span>
              <a
                href={user?.idDetail.id_file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold text-lg">Status:</span>
              <span
                className={`text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${statusInfo.color} `}
              >
                {statusInfo.label}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Order created date */}
      <div className="mt-2 text-xs bg-gray-300 rounded-b-lg text-gray-500 px-6 py-2 text-center flex flex-col sm:flex-row justify-center items-center gap-2">
        <span>
          تم إنشاء الطلب في:{" "}
          {createdDate.toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          -{" "}
          {createdDate.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span className="bg-blue-400 text-white px-2 py-1 rounded-full text-xs">
          منذ {timeAgo}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
