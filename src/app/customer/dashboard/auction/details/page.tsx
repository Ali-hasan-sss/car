"use client";
import Auctions from "@/app/customer/dashboard/ordersForms/Auctions";
import InfoItem from "@/components/common/orderinfoItem";
import SectionBox from "@/components/common/sectionbox";
import Loader from "@/components/loading/loadingPage";
import DeleteMessage from "@/components/messags/deleteMessage";
import { useLanguage } from "@/context/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/store/Reducers/hooks";
import {
  deleteAuctionLocal,
  fetchAuctionById,
  updateAuction,
} from "@/store/slice/AuctionsSlice";
import { RootState } from "@/store/store";
import { Auction, AuctionsFormInputs } from "@/Types/AuctionTypes";
import {
  getDriveSystemText,
  getFuelText,
  getShippingText,
  getStatusInfo,
  getTransmissionText,
} from "@/utils/orderUtils";
import { Box, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import {
  Check,
  CheckCircle,
  Edit,
  EllipsisVertical,
  Printer,
  Trash,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function AuctionOrder() {
  const dispatch = useAppDispatch();
  const auction = useAppSelector((state) => state.auctions.auction);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [initForm, setInitForm] = useState<AuctionsFormInputs | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const userRole = useSelector((state: RootState) => state.auth.user?.userRole);
  const { t } = useLanguage();
  const apiUrl = "customer/car-auctions";
  const [id, setId] = useState(0);
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
      //await axiosInstance.put(`${apiUrl}/${id}`, { status });
      await dispatch(
        updateAuction({
          apiUrl: apiUrl,
          id: id,
          updatedData: { status },
        })
      );
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
    if (id !== 0 && (!auction || auction.id !== id)) {
      dispatch(fetchAuctionById({ apiUrl: apiUrl, id }));
    }
  }, [dispatch, id]);

  if (!auction)
    return (
      <div className="p-6 text-center">
        <Loader />
      </div>
    );
  const transmissionText = getTransmissionText(auction.transmission_type);
  const fuelText = getFuelText(auction.fuel_type);
  const DriveSystemText = getDriveSystemText(auction.drive_system);
  const shippingText = getShippingText(auction.shipping_option);
  const statusInfo = getStatusInfo(auction.status);

  const handleEdit = (order: Auction) => {
    const mapOrderToFormInputs = (order: Auction): AuctionsFormInputs => {
      return {
        auction_link: order.auction_link || "",
        manufacturer: order.category?.manufacturer?.id || null,
        category_id: order.category?.id || null,
        year: order.year.toString() || "",
        transmission_type: order.transmission_type || 1,
        drive_system: order.drive_system || 1,
        fuel_type: order.fuel_type || 1,
        cylinders: order.cylinders || 4,
        from_budget: order.from_budget.toString() || "",
        to_budget: order.to_budget.toString() || "",
        shipping_option: order.shipping_option || 1,
        car_status: order.status?.toString() || "",
        ex_color: order.ex_color || "",
        in_color: order.in_color || "",
        country_id: order.country?.id || null,
        shipping_from: order.country.id.toString(),
        id: order.id,
      };
    };
    const formData = mapOrderToFormInputs(order);
    setInitForm(formData);
    setOpenModal(true);
  };
  const handlePrint = () => {
    const content = document.getElementById("order-container");
    if (!content) return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <html>
        <head>
          <title>طباعة الطلب</title>
          <style>
            @media print {
              body {
                -webkit-print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };
  return (
    <div className="p-4 bg-white order-container w-full min-h-screen">
      {/* بيانات السيارة */}
      <div className="space-y-6 w-full">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-sm md:text-xl  font-bold">
            {t("Auction") + " " + t("NO")} :{" "}
            <span className="text-black">{auction.id}</span>
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
                onClick={(event) => handleMenuOpen(event, auction.id)}
              >
                <EllipsisVertical className="text-gray-600 text-lg" />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && selectedRow === auction.id}
                onClose={handleMenuClose}
                PaperProps={{
                  style: { minWidth: "150px" },
                }}
              >
                {auction.status === 1 && (
                  <MenuItem onClick={() => handleEdit(auction)}>
                    <Edit className="text-yellow-500 mx-2" /> {t("Edit")}
                  </MenuItem>
                )}

                <MenuItem onClick={() => handleDelete()}>
                  <Trash className="text-red-500 mx-2" /> {t("Delete")}
                </MenuItem>
                <MenuItem onClick={handlePrint}>
                  <Printer className="text-gray-700 mx-2" /> {t("Print")}
                </MenuItem>

                {userRole === "ADMIN" && (
                  <MenuItem
                    onClick={() => {
                      handleAcceptReject(auction.id, "accept");
                    }}
                  >
                    <CheckCircle className="text-green-500 mx-2" />{" "}
                    {t("Accept")}
                  </MenuItem>
                )}

                {userRole === "ADMIN" && (
                  <MenuItem
                    onClick={() => {
                      handleAcceptReject(auction.id, "reject");
                    }}
                  >
                    <XCircle className="text-red-500 mx-2" /> {t("Reject")}
                  </MenuItem>
                )}
                {userRole === "ADMIN" && (
                  <MenuItem
                    onClick={() => {
                      handleAcceptReject(auction.id, "finish");
                    }}
                  >
                    <Check className="text-green-500 mx-2" /> {t("complete")}
                  </MenuItem>
                )}
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
                  value={auction.category?.manufacturer.title}
                />
                <InfoItem label={t("model")} value={auction.category.title} />
                <InfoItem label={t("Year")} value={auction.year} />
              </div>
              <div className="flex my-2 md:my-0 w-full items-center">
                <InfoItem
                  label={t("Drive_System")}
                  value={t(DriveSystemText)}
                />
                <InfoItem
                  label={t("Exterior_Color")}
                  value={t(auction.ex_color) || "-"}
                />
                <InfoItem
                  label={t("Interior_Color")}
                  value={t(auction.in_color)}
                />
              </div>
              <div className="flex w-full items-center">
                <InfoItem label={t("Fuel_Type")} value={t(fuelText)} />
                <InfoItem
                  label={t("Cylinders")}
                  value={String(auction.cylinders)}
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
              <InfoItem
                label={t("From_To")}
                value={auction.from_budget + " - " + auction.to_budget + " RO"}
              />
              <InfoItem
                label={t("Country")}
                value={auction.country?.title || "-"}
              />
              <InfoItem label={t("Shipping_Option")} value={t(shippingText)} />
            </div>
          </SectionBox>

          <SectionBox title={t("User_Data")}>
            <div className="flex flex-col lg:flex-row items-center w-full text-sm text-gray-700 gap-0">
              <div className="flex my-2 md:my-0 items-center w-full">
                <InfoItem label={t("name")} value={auction.user?.name || "-"} />
                <InfoItem
                  label={t("Phone_Num")}
                  value={auction.user?.contact?.mobile || "-"}
                />
                <InfoItem
                  label={t("Address")}
                  value={auction.user?.contact?.address1 || "-"}
                />
              </div>
              <div className="flex items-center w-full">
                <InfoItem
                  label={t("Email")}
                  value={auction.user?.email || "-"}
                />
                <InfoItem
                  label={t("City")}
                  value={auction.user?.contact?.city || "-"}
                />
              </div>
            </div>
          </SectionBox>

          <SectionBox title={t("User_Documents")}>
            <div className="flex items-center w-full text-sm text-gray-700 gap-0">
              <InfoItem
                label={t("id_NO")}
                value={auction.user.idDetail?.id_number || "-"}
              />
              <InfoItem
                label={t("Tax")}
                value={auction.user?.idDetail?.tax_info || "-"}
              />
            </div>
          </SectionBox>
          <p className="text-gray-400 text-xs px-3">
            <span>
              {t("created_at")} :{" "}
              {new Date(auction.created_at).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(auction.created_at).toLocaleTimeString("ar-EG", {
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
              padding: 0,
              borderRadius: "8px",
              overflowY: "auto",
              outline: "none",
            }}
          >
            <Auctions
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
