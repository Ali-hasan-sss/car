"use client";
import ShippingForm from "@/app/customer/dashboard/ordersForms/shipping";
import InfoItem from "@/components/common/orderinfoItem";
import SectionBox from "@/components/common/sectionbox";
import Loader from "@/components/loading/loadingPage";
import DeleteMessage from "@/components/messags/deleteMessage";
import { useLanguage } from "@/context/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/store/Reducers/hooks";
import { deleteAuctionLocal } from "@/store/slice/AuctionsSlice";
import { fetchCarShippingById } from "@/store/slice/ShippingSlice";
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
import { Box, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import { Edit, EllipsisVertical, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShippingOrder() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const paramId = params?.id;
  const id = Number(Array.isArray(paramId) ? paramId[0] : paramId);
  const shipping = useAppSelector((state) => state.carShippings.carShipping);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [initForm, setInitForm] = useState<ShippingFormInputs | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const { t } = useLanguage();
  const apiUrl = "customer/car-shippings";
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

  const handleDelete = () => {
    setOpenDeleteModal(true);
    handleMenuClose();
  };
  useEffect(() => {
    if (!shipping || shipping.id !== id) {
      dispatch(fetchCarShippingById({ apiUrl: apiUrl, id }));
    }
  }, [dispatch, id]);

  if (!shipping)
    return (
      <div className="p-6 text-center">
        <Loader />
      </div>
    );
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
        cmodel_id: order.cmodel?.id ?? null, // استخدم cmodel.id
        year: order.year?.toString() ?? "",
        mileage: order.mileage?.toString() ?? "",
        transmission_type: order.transmission_type ?? null,
        drive_system: order.drive_system ?? null,
        fuel_type: order.fuel_type ?? null,
        cylinders: order.cylinders ?? null,
        price: order.price?.toString() ?? "",
        final_port: "", // غير موجود في CarShipping، ضعه فارغ أو أضف دعمًا له إذا كان موجود بالباك
        shipping_from: order.shipping_from ?? "",
        in_transit: 0, // غير موجود في CarShipping، ضعه صفر أو أضف دعمًا له إذا كان موجود
        is_pickup: 0, // غير موجود في CarShipping
        is_consolidate: 0, // غير موجود في CarShipping
        vin: order.vin ?? "",
        ex_color: order.ex_color ?? "",
        in_color: order.in_color ?? "",
        images: order.images ?? [],
        car_status: order.car_status ?? null,
        location_of_car: order.location_of_car ?? null,
        car_fax: order.car_fax ?? null,
        commodity_type: "vehicle", // ثابت
        bill_pdf: "", // غير موجود، تعيين افتراضي
        title_pdf: "", // غير موجود، تعيين افتراضي
        consignee: "", // غير موجود، تعيين افتراضي
        apply_consignee: null, // غير موجود، تعيين افتراضي
        use_type: 0, // غير موجود، تعيين افتراضي
        package_shippings: [],
      };
    };

    const formData = mapOrderToFormInputs(order);
    setInitForm(formData);
    setOpenModal(true);
  };

  return (
    <div className="p-4 bg-white w-full min-h-screen">
      {/* بيانات السيارة */}
      <div className="space-y-6 w-full">
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
            <div className="flex items-center">
              <IconButton
                onClick={(event) => handleMenuOpen(event, shipping.id)}
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

                <MenuItem onClick={() => handleDelete()}>
                  <Trash className="text-red-500 mx-2" /> {t("Delete")}
                </MenuItem>
              </Menu>
            </div>
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
            <div className="flex flex-col items-center w-full text-sm text-gray-700 gap-4">
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
                value={shipping.user.idDetail?.id_number || "-"}
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
    </div>
  );
}
