import { useLanguage } from "@/context/LanguageContext";
import { RootState } from "@/store/store";
import { Auction, CarSale, CarShipping } from "@/Types/AuctionTypes";
import axiosInstance from "@/utils/axiosInstance";
import {
  getFuelText,
  getShippingText,
  getStatusInfo,
  getTimeAgo,
  getTransmissionText,
} from "@/utils/orderUtils";
import {
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
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
import { toast } from "sonner";
import AnimatedModal from "../modal/AnimatedModal";
import ImageUploader from "../uploders/Uploader/ImageUploader";
import LoadingBTN from "../loading/loadingBTN";

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
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [shippingStatus, setShippingStatus] = useState("");
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(id);
  };
  const isShipping = (
    item: Auction | CarSale | CarShipping
  ): item is CarSale => {
    return (item as CarShipping).package_shippings !== undefined;
  };
  const shippingStatuses = [
    "Received",
    "Delivered_To_Shipping_Co",
    "Shipped",
    "Arrived_To_Oman",
    "Arrived_To_Destination",
  ];
  const shippingStatusMap: Record<string, number> = {
    Received: 4,
    Delivered: 5,
    Shipped: 6,
    Arrived_To_Oman: 7,
    Arrived_To_Destination: 8,
  };

  const handleSubmitShippingStatus = async () => {
    if (!selectedStatus) return;

    const statusNumber = shippingStatusMap[selectedStatus];

    const images_status = uploadedImages.map((image) => ({
      image,
      status: statusNumber,
    }));

    try {
      setLoading(true);
      await axiosInstance.put(`admin/car-shippings/${order.id}`, {
        status: statusNumber,
        images_status: images_status,
      });

      toast.success(t("edit_car_shipping"));
      setOpenModal(false);
      setUploadedImages([]);
      setSelectedStatus(null);
    } catch (error) {
      toast.error(t("Error"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleView = (id: number) => {
    localStorage.setItem("itemselected", String(id));
    router.push(`${pathname}/details`);
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
              {userRole === "ADMIN" && isShipping(order) && (
                <MenuItem disableRipple>
                  <FormControl fullWidth size="small">
                    <InputLabel id="shipping-status-label">
                      {t("shipping_status")}
                    </InputLabel>
                    <Select
                      value={shippingStatus}
                      onChange={(e) => {
                        const selected = e.target.value;
                        setShippingStatus(selected);
                        setSelectedStatus(selected);
                        setOpenModal(true);
                      }}
                    >
                      {shippingStatuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {t(status)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
              <span className="font-semibold text-sm">
                {t("Transmission")} :
              </span>{" "}
              {t(transmissionText)}
            </p>
            <p>
              <span className="font-semibold text-sm">{t("Fuel_Type")} :</span>{" "}
              {fuelText}
            </p>
            <p>
              <span className="font-semibold text-sm">{t("Cylinders")} :</span>{" "}
              {cylinders}
            </p>
            <p>
              <span className="font-semibold text-sm">Colors:</span>{" "}
              {t("Exterior")} : {ex_color} | {t("Interior")} : {in_color}
            </p>
            <p>
              <span className="font-semibold text-sm">{t("Country")} :</span>{" "}
              {country?.title}
            </p>
            <p>
              <span className="font-semibold text-sm">
                {t("Budget_Range")} :
              </span>
              {from_budget} - {to_budget} RO
            </p>
            <p>
              <span className="font-semibold text-sm">
                {t("Shipping_Option")} :
              </span>{" "}
              {shippingText}
            </p>
          </div>
        </div>

        <div className="flex flex-col px-3 space-y-4 text-gray-700 text-sm sm:col-span-1 lg:col-span-1">
          {/* User Info */}
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-sm">{t("Full_Name")} :</span>{" "}
              {user?.name}
            </p>
            <p>
              <span className="font-semibold text-sm">{t("Email")}:</span>{" "}
              {user?.email}
            </p>

            <p>
              <span className="font-semibold text-sm">{t("Phone_Num")}:</span>{" "}
              {user?.contact?.mobile || "NA"}
            </p>

            <p>
              <span className="font-semibold text-sm">{t("Address")} :</span>{" "}
              {t(user?.contact?.address1)}, {t(user?.contact?.city)}
            </p>

            <p className="flex items-center gap-2">
              <span className="font-semibold text-sm">{t("ID_image")} :</span>
              <a
                href={user?.idDetail?.id_file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {t("View")}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold text-sm">{t("status")} :</span>
              <span
                className={`text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${statusInfo.color} `}
              >
                {t(statusInfo.label)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Order created date */}
      <div className="mt-2 text-xs bg-gray-300 rounded-b-lg text-gray-500 px-6 py-2 text-center flex flex-col sm:flex-row justify-center items-center gap-2">
        <span>
          {t("created_at")} :{" "}
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
          {t("time_ago")} : {timeAgo}
        </span>
      </div>
      <AnimatedModal
        className="w-[500px]"
        open={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <div className="p-2 bg-white rounded-lg w-[90%]  mx-auto mt-2">
          <h2 className="mb-4 text-lg font-semibold text-center">
            {t("upload_images_for_status")}: {selectedStatus}
          </h2>

          <ImageUploader
            onImagesUpload={(fileNames) => setUploadedImages(fileNames)}
            multiple
          />

          <div className="mt-6 flex justify-between gap-4">
            <button
              className=" px-2 py-1 button_close"
              onClick={() => {
                setOpenModal(false);
                setUploadedImages([]);
                setSelectedStatus(null);
              }}
            >
              {t("Close")}
            </button>

            <button
              className=" px-2 py-1 button_outline"
              onClick={handleSubmitShippingStatus}
              disabled={uploadedImages.length === 0}
            >
              {loading ? <LoadingBTN /> : t("Save")}
            </button>
          </div>
        </div>
      </AnimatedModal>
    </div>
  );
};

export default OrderCard;
