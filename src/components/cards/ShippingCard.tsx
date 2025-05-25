import { useLanguage } from "@/context/LanguageContext";
import { RootState } from "@/store/store";
import { CarShipping } from "@/Types/AuctionTypes";
import {
  getFuelText,
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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
import LoadingBTN from "../loading/loadingBTN";
import ImageUploader from "../uploders/Uploader/ImageUploader";
import AnimatedModal from "../modal/AnimatedModal";
import { updateCarShipping } from "@/store/slice/ShippingSlice";
import { useAppDispatch } from "@/store/Reducers/hooks";

interface CarShippingCardProps {
  shipping: CarShipping;
  onDelete: (id: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEdit: (order: any) => void;
  onChangeStatus?: (id: number, type: "accept" | "reject" | "finish") => void;
  actionLoading: boolean;
}

export const CarShippingCard: React.FC<CarShippingCardProps> = ({
  shipping,
  onDelete,
  onEdit,
  actionLoading,
  onChangeStatus,
}) => {
  const { t, isArabic } = useLanguage();
  const validSteps = [2, 4, 5, 6, 7, 8];
  const steps = [
    "in_progress",
    "Received",
    "Delivered_To_Shipping_Co",
    "Shipped",
    "Arrived_To_Oman",
    "Arrived_To_Destination",
  ];
  const currentStepIndex = validSteps.indexOf(shipping.status);
  const transmissionText = getTransmissionText(shipping.transmission_type);
  const fuelText = getFuelText(shipping.fuel_type);
  const statusInfo = getStatusInfo(shipping.status);
  const timeAgo = getTimeAgo(shipping.created_at, isArabic ? "ar" : "en");
  const createdDate = new Date(shipping.created_at);
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
  const dispatch = useAppDispatch();
  const shippingStatusMap: Record<string, number> = {
    Received: 4,
    Delivered: 5,
    Shipped: 6,
    Arrived_To_Oman: 7,
    Arrived_To_Destination: 8,
  };
  const shippingStatuses = [
    "Received",
    "Delivered_To_Shipping_Co",
    "Shipped",
    "Arrived_To_Oman",
    "Arrived_To_Destination",
  ];

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(id);
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
      await dispatch(
        updateCarShipping({
          apiUrl: "admin/car-shippings",
          id: shipping.id,
          updatedData: {
            status: statusNumber,
            images_status,
          },
        })
      ).unwrap();

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
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      window.location.href = `${currentPath}/details`;
    }
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
    <div className="bg-white w-full  shadow-md mx-auto rounded-2xl">
      <div
        className={`flex items-center bg-blue-400 rounded-t-2xl w-full ${
          shipping.status === 3
            ? "bg-green-400"
            : shipping.status === 0
            ? "bg-red-400"
            : shipping.status === 1
            ? "bg-yellow-200"
            : ""
        } `}
      >
        {" "}
        <ol
          className={`flex  items-center  w-full  ${
            shipping.status === 3
              ? "bg-green-400"
              : shipping.status === 0
              ? "bg-red-400"
              : shipping.status === 1
              ? "bg-yellow-200"
              : ""
          }`}
        >
          {steps.map((label, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div
                key={index}
                className="flex items-center w-full mx-auto p-1 flex-col"
              >
                <li
                  className={`flex w-full items-center ${
                    index < steps.length - 1
                      ? isCompleted
                        ? "text-primary1 after:content-[''] after:w-full after:h-1 after:border-b after:border-primary1 after:border-4 after:inline-block"
                        : "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block"
                      : ""
                  }`}
                  title={label}
                >
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 ${
                      isCompleted || isCurrent ? "bg-primary1" : "bg-gray-100"
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 16 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5.917 5.724 10.5 15 1.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <span className="text-sm font-medium text-gray-500">
                        {index + 1}
                      </span>
                    )}
                  </span>
                </li>
                <span className="w-full text-xs text-gray-700 hidden md:block">
                  {t(label)}
                </span>
              </div>
            );
          })}
        </ol>{" "}
        {actionLoading ? (
          <PulseLoader size={6} color="#ffffff" />
        ) : (
          <div className="flex items-center">
            <IconButton onClick={(event) => handleMenuOpen(event, shipping.id)}>
              <EllipsisVertical className="text-gray-600 text-lg" />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedRow === shipping.id}
              onClose={handleMenuClose}
              PaperProps={{
                style: { minWidth: "150px" },
              }}
            >
              <MenuItem onClick={() => handleView(shipping.id)}>
                <Eye className="text-blue-500 mr-2" />
                {t("details")}
              </MenuItem>

              {shipping.status === 1 && (
                <MenuItem onClick={() => onEdit(shipping)}>
                  <Edit className="text-yellow-500 mr-2" /> {t("Edit")}
                </MenuItem>
              )}
              {shipping.status === 1 && (
                <MenuItem onClick={() => onDelete(shipping.id)}>
                  <Trash className="text-red-500 mr-2" /> {t("Delete")}
                </MenuItem>
              )}
              {userRole === "ADMIN" && (
                <MenuItem
                  onClick={() => {
                    handleAccept(shipping.id);
                  }}
                >
                  <CheckCircle className="text-green-500 mr-2" /> {t("Accept")}
                </MenuItem>
              )}

              {userRole === "ADMIN" && (
                <MenuItem
                  onClick={() => {
                    handleReject(shipping.id);
                  }}
                >
                  <XCircle className="text-red-500 mr-2" /> {t("Reject")}
                </MenuItem>
              )}
              {userRole === "ADMIN" && (
                <MenuItem
                  onClick={() => {
                    handleFinish(shipping.id);
                  }}
                >
                  <Check className="text-green-500 mr-2" /> {t("complete")}
                </MenuItem>
              )}
              {userRole === "ADMIN" && (
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

      <div className="flex  px-4 w-full items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-gray-800">
          {shipping.category?.manufacturer?.title} {shipping.category?.title}{" "}
          {shipping.cmodel?.title} - {shipping.year}
        </h2>
        <span className="text-sm font-bold text-gray-900">#{shipping.id}</span>
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
              {shipping.cylinders}
            </p>
            <p>
              <span className="font-semibold text-sm">Colors:</span>{" "}
              {t("Exterior")} : {shipping.ex_color} | {t("Interior")} :{" "}
              {shipping.in_color}
            </p>
            <p>
              <span className="font-semibold text-sm">{t("Price")} :</span>
              {shipping.price} RO
            </p>
          </div>
        </div>

        <div className="flex flex-col px-3 space-y-4 text-gray-700 text-sm sm:col-span-1 lg:col-span-1">
          {/* User Info */}
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-sm">{t("Full_Name")} :</span>{" "}
              {shipping.user?.name}
            </p>
            <p>
              <span className="font-semibold text-sm">{t("Email")}:</span>{" "}
              {shipping.user?.email}
            </p>

            <p>
              <span className="font-semibold text-sm">{t("Phone_Num")}:</span>{" "}
              {shipping.user?.contact?.mobile || "NA"}
            </p>

            <p>
              <span className="font-semibold text-sm">{t("Address")} :</span>{" "}
              {t(shipping.user?.contact?.address1)},{" "}
              {t(shipping.user?.contact?.city)}
            </p>

            <p className="flex items-center gap-2">
              <span className="font-semibold text-sm">{t("ID_image")} :</span>
              <a
                href={shipping.user?.idDetail?.id_file}
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
      <div className="mt-2 w-full text-xs bg-gray-300 rounded-b-lg text-gray-500 px-6 py-2 text-center flex flex-col sm:flex-row justify-center items-center gap-2">
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
            {t("upload_images_for_status")}{" "}
            {selectedStatus && t(selectedStatus)}
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
