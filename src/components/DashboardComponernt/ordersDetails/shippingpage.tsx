"use client";
import ShippingForm from "@/components/forms/ordersForms/shipping";
import InfoItem from "@/components/common/orderinfoItem";
import SectionBox from "@/components/common/sectionbox";
import Loader from "@/components/loading/loadingPage";
import DeleteMessage from "@/components/messags/deleteMessage";
import { useLanguage } from "@/context/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/store/Reducers/hooks";
import { deleteAuctionLocal } from "@/store/slice/AuctionsSlice";
import {
  fetchCarShippingById,
  updateCarShipping,
} from "@/store/slice/ShippingSlice";
import { RootState } from "@/store/store";
import {
  CarShipping,
  packages,
  ShippingFormInputs,
} from "@/Types/AuctionTypes";
import {
  getDimensionunitText,
  getDriveSystemText,
  getFuelText,
  getPackageTypeText,
  getStatusInfo,
  getTransmissionText,
  getWeightUnitText,
} from "@/utils/orderUtils";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import {
  Check,
  CheckCircle,
  Edit,
  EllipsisVertical,
  Trash,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import AnimatedModal from "@/components/modal/AnimatedModal";
import ImageUploader from "@/components/uploders/Uploader/ImageUploader";
import LoadingBTN from "@/components/loading/loadingBTN";

export default function ShippingDetails() {
  const dispatch = useAppDispatch();
  const shipping = useAppSelector((state) => state.carShippings.carShipping);
  const { loading, error } = useAppSelector((state) => ({
    loading: state.carShippings.loading,
    error: state.carShippings.error,
  }));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [initForm, setInitForm] = useState<ShippingFormInputs | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [OpenstatusModal, setOpenstatusModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [shippingStatus, setShippingStatus] = useState("");
  const [Loading, setLoading] = useState(false);

  const userRole = useSelector((state: RootState) => state.auth.user?.userRole);
  const openImagesModal = (status: number) => {
    if (!shipping) return;

    const images = shipping[status.toString()];
    if (images && Array.isArray(images) && images.length > 0) {
      setSelectedStatus(status.toString());
    }
  };

  const { t } = useLanguage();
  const apiUrl = `${userRole === "ADMIN" ? "admin" : "customer"}/car-shippings`;
  const [id, setId] = useState(0);
  const shippingStatuses = [
    "Accepted",
    "Delivered",
    "Shipped",
    "Arrived_To_Oman",
    "Arrived_To_Destination",
  ];
  const shippingStatusMap: Record<string, number> = {
    Accepted: 4,
    Delivered: 5,
    Shipped: 6,
    Arrived_To_Oman: 7,
    Arrived_To_Destination: 8,
  };
  useEffect(() => {
    const storedid = localStorage.getItem("itemselected");
    if (storedid) {
      setId(Number(storedid));
    }
  }, []);

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

  const handleAcceptReject = async (
    id: number,
    type: "accept" | "reject" | "finish"
  ) => {
    const status = type === "accept" ? 2 : type === "reject" ? 0 : 3;
    try {
      handleMenuClose();
      await dispatch(
        updateCarShipping({
          apiUrl: apiUrl,
          id: id,
          updatedData: { status },
        })
      ).unwrap();
      toast.success(
        `تم ${
          type === "accept" ? "قبول" : type === "reject" ? "رفض" : "اكمال"
        } الطلب رقم ${id}`
      );
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث الطلب:");
      console.error(error);
    }
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
    handleMenuClose();
  };
  useEffect(() => {
    if (id !== 0 && (!shipping || shipping.id !== id)) {
      dispatch(fetchCarShippingById({ apiUrl: apiUrl, id }));
    }
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="p-6 text-center">
        <Loader />
      </div>
    );
  if (!shipping) return <div className="p-6 text-center">{error}</div>;
  const transmissionText = getTransmissionText(shipping.transmission_type);
  const fuelText = getFuelText(shipping.fuel_type);
  const DriveSystemText = getDriveSystemText(shipping.drive_system);
  const statusInfo = getStatusInfo(shipping.status);

  const handleEdit = (order: CarShipping) => {
    const mapOrderToFormInputs = (order: CarShipping): ShippingFormInputs => {
      return {
        id: order.id ?? null,
        manufacturer: order.category?.manufacturer?.id ?? null,
        category_id: order.category?.id ?? null,
        cmodel_id: order.cmodel?.id ?? null,
        year: order.year?.toString() ?? "",
        mileage: order.mileage?.toString() ?? "",
        transmission_type: order.transmission_type ?? null,
        drive_system: order.drive_system ?? null,
        fuel_type: order.fuel_type ?? null,
        cylinders: order.cylinders ?? null,
        price: order.price?.toString() ?? "",
        final_port: "",
        shipping_from: order.shipping_from ?? "",
        in_transit: 0,
        is_pickup: 0,
        is_consolidate: 0,
        vin: order.vin ?? "",
        ex_color: order.ex_color ?? "",
        in_color: order.in_color ?? "",
        images: order.images ?? [],
        car_status: order.car_status ?? null,
        location_of_car: order.location_of_car ?? null,
        car_fax: order.car_fax ?? null,
        commodity_type: "vehicle",
        bill_pdf: "",
        title_pdf: "",
        consignee: "",
        apply_consignee: null,
        use_type: 0,
        package_shippings: [],
      };
    };

    const formData = mapOrderToFormInputs(order);
    setInitForm(formData);
    setOpenModal(true);
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
      setOpenstatusModal(false);
      setUploadedImages([]);
      setSelectedStatus(null);
    } catch (error) {
      toast.error(t("Error"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validSteps = [2, 4, 5, 6, 7, 8];
  const steps = [
    "Accepted",
    "Received",
    "Delivered_To_Shipping_Co",
    "Shipped",
    "Arrived_To_Oman",
    "Arrived_To_Destination",
  ];
  const currentStepIndex = validSteps.indexOf(shipping.status);

  return (
    <div className="p-4 bg-white w-full min-h-screen">
      {/* بيانات السيارة */}
      <div className="space-y-3 w-full">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-sm md:text-xl  font-bold">
            {t("Auction") + " " + t("NO")} :{" "}
            <span className="text-black">{shipping.id}</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-xs md:text-sm font-medium">
              {t("status")} :{" "}
              <span className={`${statusInfo.color} px-2  rounded-full`}>
                {t(statusInfo.label)}
              </span>
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-400">{t("steper_message")}</p>
        <div className="w-full flex items-center rounded-lg px-3 bg-blue-200">
          {" "}
          <ol className="flex items-center w-full ">
            {steps.map((label, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const statusNumber = validSteps[index];

              return (
                <div
                  key={index}
                  className="flex items-center w-full mx-auto p-1 flex-col cursor-pointer"
                  onClick={() => {
                    if ([4, 5, 6, 7, 8].includes(statusNumber)) {
                      openImagesModal(statusNumber);
                      setImageModal(true);
                    }
                  }}
                >
                  <li
                    className={`flex w-full items-center ${
                      index < steps.length - 1
                        ? isCompleted
                          ? "text-primary1 after:content-[''] after:w-full after:h-1 after:border-b after:border-primary1 after:border-4 after:inline-block"
                          : "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block"
                        : ""
                    }`}
                    title={t(label)}
                  >
                    <span
                      className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
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
          </ol>
          <div className="flex items-center">
            <IconButton
              onClick={(event) => handleMenuOpen(event, shipping.id)}
              disabled={userRole === "USER" && shipping.status <= 2}
            >
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
              {shipping.status === 1 && (
                <MenuItem onClick={() => handleEdit(shipping)}>
                  <Edit className="text-yellow-500 mx-2" /> {t("Edit")}
                </MenuItem>
              )}
              {shipping.status === 1 && (
                <MenuItem onClick={() => handleDelete()}>
                  <Trash className="text-red-500 mx-2" /> {t("Delete")}
                </MenuItem>
              )}
              {userRole === "ADMIN" && shipping.status <= 1 && (
                <MenuItem
                  onClick={() => {
                    handleAcceptReject(shipping.id, "accept");
                  }}
                >
                  <CheckCircle className="text-green-500 mx-2" /> {t("Accept")}
                </MenuItem>
              )}

              {userRole === "ADMIN" && (
                <MenuItem
                  onClick={() => {
                    handleAcceptReject(shipping.id, "reject");
                  }}
                >
                  <XCircle className="text-red-500 mx-2" /> {t("Reject")}
                </MenuItem>
              )}
              {userRole === "ADMIN" && shipping.status === 8 && (
                <MenuItem
                  onClick={() => {
                    handleAcceptReject(shipping.id, "finish");
                  }}
                >
                  <Check className="text-green-500 mx-2" /> {t("complete")}
                </MenuItem>
              )}
              {userRole === "ADMIN" && shipping.status >= 2 && (
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
                        setOpenstatusModal(true);
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
        </div>
        <div className="border">
          <SectionBox title={t("Car_Information")}>
            <div className="flex flex-col lg:flex-row items-center w-full text-sm text-gray-700 gap-0">
              <div className="flex w-full items-center">
                <InfoItem
                  label={t("brand")}
                  value={shipping.category?.manufacturer.title}
                />
                <InfoItem label={t("model")} value={shipping.category.title} />
                <InfoItem label={t("Year")} value={String(shipping.year)} />
              </div>
              <div className="flex my-2 md:my-0 w-full items-center">
                <InfoItem
                  label={t("Drive_System")}
                  value={t(DriveSystemText)}
                />
                <InfoItem
                  label={t("Exterior_Color")}
                  value={t(shipping.ex_color) || "-"}
                />
                <InfoItem
                  label={t("Interior_Color")}
                  value={t(shipping.in_color)}
                />
              </div>
              <div className="flex w-full items-center">
                <InfoItem label={t("Fuel_Type")} value={t(fuelText)} />
                <InfoItem
                  label={t("Cylinders")}
                  value={String(shipping.cylinders)}
                />
                <InfoItem
                  label={t("Transmission")}
                  value={t(transmissionText)}
                />
              </div>
            </div>
          </SectionBox>
          <SectionBox title={t("Budget_and_Shipping")}>
            <div className="flex items-center w-full text-sm text-gray-700 gap-0">
              <InfoItem label={t("Price")} value={shipping.price + " RO"} />
              <InfoItem
                label={t("Country")}
                value={shipping.shipping_from || "-"}
              />
            </div>
          </SectionBox>
          <SectionBox title={t("Packages")}>
            <div className="flex w-full flex-col md:flex-row items-center gap-1 ">
              {shipping.package_shippings.map((packag: packages, index) => (
                <div key={index} className="w-full border-b py-1">
                  <h2 className="text-sm font-bold">
                    {t("Package") + " " + ":" + " " + Number(index + 1)}
                  </h2>
                  <div className="flex w-full flex-col md:flex-row items-center gap-1 ">
                    <div className="flex items-center w-full text-sm text-gray-700 gap-0">
                      <InfoItem
                        label={t("Package_type")}
                        value={t(
                          getPackageTypeText(Number(packag.package_type))
                        )}
                      />
                      <InfoItem
                        label={t("Pieces")}
                        value={String(packag.pieces)}
                      />
                      <InfoItem
                        label={t("Length")}
                        value={
                          packag.length +
                          " " +
                          getDimensionunitText(Number(packag.unit))
                        }
                      />
                      <InfoItem
                        label={t("Width")}
                        value={
                          packag.width +
                          " " +
                          getDimensionunitText(Number(packag.unit))
                        }
                      />
                      <InfoItem
                        label={t("Height")}
                        value={
                          packag.height +
                          " " +
                          getDimensionunitText(Number(packag.unit))
                        }
                      />{" "}
                    </div>
                    <div className="flex items-center w-full text-sm text-gray-700 gap-0">
                      <InfoItem
                        label={t("Item_weight")}
                        value={
                          packag.item_weight +
                          " " +
                          getWeightUnitText(Number(packag.Weight_unit))
                        }
                      />
                      <InfoItem
                        label={t("Total_weight")}
                        value={
                          packag.item_weight * packag.pieces +
                          " " +
                          getWeightUnitText(Number(packag.Weight_unit))
                        }
                      />
                      <InfoItem
                        label={t("Item_value")}
                        value={packag.item_value + " " + "$"}
                      />
                      <InfoItem
                        label={t("Total_value")}
                        value={packag.item_value * packag.pieces + " " + "$"}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-800 mt-2 p-1">
                    {t("Description")} : {packag.description || "-"}
                  </p>
                </div>
              ))}
            </div>
          </SectionBox>
          <SectionBox title={t("User_Data")}>
            <div className="flex flex-col lg:flex-row items-center w-full text-sm text-gray-700 gap-0">
              <div className="flex my-2 md:my-0 items-center w-full">
                <InfoItem
                  label={t("name")}
                  value={shipping.user?.name || "-"}
                />
                <InfoItem
                  label={t("Phone_Num")}
                  value={shipping.user?.contact?.mobile || "-"}
                />
                <InfoItem
                  label={t("Address")}
                  value={shipping.user?.contact?.address1 || "-"}
                />
              </div>
              <div className="flex items-center w-full">
                <InfoItem
                  label={t("Email")}
                  value={shipping.user?.email || "-"}
                />
                <InfoItem
                  label={t("City")}
                  value={shipping.user?.contact?.city || "-"}
                />
              </div>
            </div>
          </SectionBox>

          <SectionBox title={t("User_Documents")}>
            <div className="flex items-center w-full text-sm text-gray-700 gap-0">
              <InfoItem
                label={t("id_NO")}
                value={shipping.user?.idDetail?.id_number || "-"}
              />
              <InfoItem
                label={t("Tax")}
                value={shipping.user?.idDetail?.tax_info || "-"}
              />
            </div>
          </SectionBox>
          <p className="text-gray-400 text-xs px-3">
            <span>
              {t("created_at")} :{" "}
              {new Date(shipping.created_at).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(shipping.created_at).toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </p>
        </div>
      </div>
      {openDeleteModal && (
        <DeleteMessage
          API={apiUrl}
          open={openDeleteModal}
          id={id}
          handleClose={() => setOpenDeleteModal(false)}
          onDeleteSuccess={() => dispatch(deleteAuctionLocal(id))}
        />
      )}
      {openModal && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: "1000px",
              height: "80%",
              maxHeight: "90vh",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 3,
              borderRadius: "8px",
              overflowY: "auto",
              outline: "none",
            }}
          >
            <ShippingForm
              close={() => setOpenModal(false)}
              onSubmit={(data) => {
                console.log(data);
              }}
              initialData={initForm}
            />
          </Box>
        </Modal>
      )}
      <AnimatedModal
        className="w-[500px]"
        open={OpenstatusModal}
        handleClose={() => setOpenstatusModal(false)}
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
                setOpenstatusModal(false);
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
              {Loading ? <LoadingBTN /> : t("Save")}
            </button>
          </div>
        </div>
      </AnimatedModal>
      {selectedStatus && shipping?.[selectedStatus]?.length > 0 && (
        <Modal
          open={imageModal}
          onClose={() => setImageModal(false)}
          className="max-w-[600px]"
        >
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: "1000px",
              height: "80%",
              maxHeight: "90vh",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 3,
              padding: 0,
              borderRadius: "8px",
              overflowY: "auto",
              outline: "none",
            }}
          >
            {" "}
            <div className="w-full mt-4 px-3">
              <button
                onClick={() => {
                  setImageModal(false);
                  setSelectedStatus(null);
                }}
                className="button_close mx-auto px-3 py-1"
              >
                X
              </button>
            </div>
            <div className=" w-full flex flex-wrap items-center justify-center gap-4 p-4 ">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {shipping[selectedStatus].map((img: any) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt={`Image for status ${selectedStatus}`}
                  className="w-full h-[70vh] border object-contain rounded"
                />
              ))}
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}
