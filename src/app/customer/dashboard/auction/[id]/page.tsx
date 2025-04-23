"use client";
import Auctions from "@/app/customer/dashboard/ordersForms/Auctions";
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
  getTimeAgo,
  getTransmissionText,
} from "@/utils/orderUtils";
import { Box, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import {
  Check,
  CheckCircle,
  Edit,
  EllipsisVertical,
  Trash,
  XCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function AuctionOrder() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const paramId = params?.id;
  const id = Number(Array.isArray(paramId) ? paramId[0] : paramId);
  const auction = useAppSelector((state) => state.auctions.auction);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [initForm, setInitForm] = useState<AuctionsFormInputs | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const userRole = useSelector((state: RootState) => state.auth.user?.userRole);
  const { t } = useLanguage();
  const apiUrl = "customer/car-auctions";
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
    const status = type === "accept" ? 2 : type === "reject" ? 0 : 3; // تحديد القيمة بناءً على نوع الإجراء
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
    if (!auction || auction.id !== id) {
      dispatch(fetchAuctionById({ apiUrl: apiUrl, id }));
    }
  }, [dispatch, id]);

  if (!auction)
    return <div className="p-6 text-center">جاري تحميل البيانات...</div>;
  const transmissionText = getTransmissionText(auction.transmission_type);
  const fuelText = getFuelText(auction.fuel_type);
  const DriveSystemText = getDriveSystemText(auction.drive_system);
  const shippingText = getShippingText(auction.shipping_option);
  const statusInfo = getStatusInfo(auction.status);
  const timeAgo = getTimeAgo(auction.created_at);
  const {
    category,
    year,
    cylinders,
    ex_color,
    in_color,
    from_budget,
    to_budget,
    country,
    user,
  } = auction;
  const handleEdit = (order: Auction) => {
    const mapOrderToFormInputs = (order: Auction): AuctionsFormInputs => {
      return {
        auction_link: order.auction_link || "", // الرابط الخاص بالمزاد
        manufacturer: order.category?.manufacturer?.id || null, // تحويل category إلى manufacturer (في حال كان category يحتوي على id)
        category_id: order.category?.id || null, // نفس الشيء مع category
        year: order.year.toString() || "", // تحويل السنة إلى نص
        transmission_type: order.transmission_type || 1, // نفس الشيء مع transmission_type
        drive_system: order.drive_system || 1, // نفس الشيء مع drive_system
        fuel_type: order.fuel_type || 1, // نفس الشيء مع fuel_type
        cylinders: order.cylinders || 4, // نفس الشيء مع cylinders
        from_budget: order.from_budget.toString() || "", // تحويل القيمة إلى نص
        to_budget: order.to_budget.toString() || "", // تحويل القيمة إلى نص
        shipping_option: order.shipping_option || 1, // نفس الشيء مع shipping_option
        car_status: order.status?.toString() || "", // تحويل الحالة إلى نص
        ex_color: order.ex_color || "", // اللون الخارجي
        in_color: order.in_color || "", // اللون الداخلي
        country_id: order.country?.id || null,
        shipping_from: order.country.id.toString(),
        id: order.id,
      };
    };
    const formData = mapOrderToFormInputs(order);
    setInitForm(formData);
    setOpenModal(true);
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6"> طلب المزاد : {auction.id}</h1>
        <p className="flex items-center gap-2">
          <span className="font-semibold text-lg !bg-opacity-100">Status:</span>
          <span
            className={`text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${statusInfo.color} `}
          >
            {statusInfo.label}
          </span>
        </p>
      </div>
      {/* بيانات السيارة */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="bg-white border-b border-gray-400 py-4 mb-6">
          {auction.auction_link && (
            <div className="flex items-center gap-2 px-5 ">
              <strong>رابط المزاد:</strong> {auction.auction_link}
            </div>
          )}
          <div className="flex items-center justify-between ">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              بيانات السيارة
            </h2>

            <span className="bg-blue-400 text-white px-2 py-1 rounded-full text-xs">
              منذ {timeAgo}
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
                  style: { minWidth: "150px" }, // تعيين عرض القائمة
                }}
              >
                {auction.status === 1 && (
                  <MenuItem onClick={() => handleEdit(auction)}>
                    <Edit className="text-yellow-500 mr-2" /> {t("Edit")}
                  </MenuItem>
                )}

                <MenuItem onClick={() => handleDelete()}>
                  <Trash className="text-red-500 mr-2" /> {t("Delete")}
                </MenuItem>

                {userRole === "ADMIN" && (
                  <MenuItem
                    onClick={() => {
                      handleAcceptReject(auction.id, "accept");
                    }}
                  >
                    <CheckCircle className="text-green-500 mr-2" />{" "}
                    {t("Accept")}
                  </MenuItem>
                )}

                {userRole === "ADMIN" && (
                  <MenuItem
                    onClick={() => {
                      handleAcceptReject(auction.id, "reject");
                    }}
                  >
                    <XCircle className="text-red-500 mr-2" /> {t("Reject")}
                  </MenuItem>
                )}
                {userRole === "ADMIN" && (
                  <MenuItem
                    onClick={() => {
                      handleAcceptReject(auction.id, "finish");
                    }}
                  >
                    <Check className="text-green-500 mr-2" /> {t("complete")}
                  </MenuItem>
                )}
              </Menu>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-center gap-2 px-5 ">
              <strong>الماركة:</strong> {category?.manufacturer?.title}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>الموديل:</strong> {category?.title}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>سنة الصنع:</strong> {year}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>نوع الوقود:</strong> {fuelText}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>نظام القيادة:</strong> {DriveSystemText}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>ناقل الحركة:</strong> {transmissionText}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>عدد الإسطوانات:</strong> {cylinders}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>اللون الخارجي:</strong> {ex_color}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>اللون الداخلي:</strong> {in_color}
            </div>
          </div>
        </div>

        {/* بيانات الميزانية */}
        <div className="bg-white  border-b border-gray-400 py-4 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            الميزانية والشحن
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-center gap-2 px-5 ">
              <strong>من:</strong>
              <i> RO</i> {from_budget} - <strong>إلى:</strong> <i>RO </i>
              {to_budget}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>خيار الشحن:</strong> {shippingText}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>البلد:</strong> {country?.title}
            </div>
          </div>
        </div>

        {/* بيانات المستخدم */}
        <div className="bg-white  border-b border-gray-400 py-4 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            بيانات المستخدم
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-center gap-2 px-5 ">
              <strong>الاسم:</strong> {user?.name}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>البريد الإلكتروني:</strong> {user?.email}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>رقم الجوال:</strong> {user?.contact?.mobile}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>المدينة:</strong> {user?.contact?.city}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>العنوان:</strong> {user?.contact?.address1}
            </div>
          </div>
        </div>

        {/* بطاقة الهوية */}
        <div className="bg-white border-b border-gray-400 py-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            مستندات المستخدم
          </h2>
          <div className="text-gray-700 space-y-2">
            <div className="flex items-center gap-2 px-5 ">
              <strong>رقم الهوية:</strong> {user?.idDetail?.id_number}
            </div>
            <div className="flex items-center gap-2 px-5 ">
              <strong>معلومات ضريبية:</strong> {user?.idDetail?.tax_info}
            </div>
            {user?.idDetail?.id_file && (
              <div className="flex items-center gap-2 px-5 ">
                <strong>صورة الهوية:</strong>
                <br />
                <a
                  className="text-blue-500 underline"
                  href={user.idDetail.id_file}
                  target="blank"
                >
                  عرض
                </a>
              </div>
            )}
          </div>
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
              width: "80%", // 80% من عرض الشاشة (يبقى 10% من الجوانب)
              maxWidth: "1000px", // الحد الأقصى لعرض المودال
              height: "80%", // 80% من ارتفاع الشاشة (يبقى 10% من الأعلى والأسفل)
              maxHeight: "90vh", // ضمان عدم تجاوز الشاشة
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 3,
              padding: 0,
              borderRadius: "8px",
              overflowY: "auto", // السماح بالتمرير عند زيادة المحتوى
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
