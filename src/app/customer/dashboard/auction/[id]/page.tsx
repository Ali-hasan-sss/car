"use client";
import Loader from "@/components/loading/loadingPage";
import { useAppDispatch } from "@/store/Reducers/hooks";
import {
  fetchAuctionById,
  selectAuctionsLoading,
} from "@/store/slice/AuctionsSlice";
import { RootState } from "@/store/store";
import { Auction } from "@/Types/AuctionTypes";
import {
  getFuelText,
  getShippingText,
  getStatusInfo,
  getTimeAgo,
  getTransmissionText,
} from "@/utils/orderUtils";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AuctionDetails() {
  const { id: paramId } = useParams();
  const id = Number(paramId);
  const apiUrl = "customer/car-auctions";
  const dispatch = useAppDispatch();
  const loading = useSelector(selectAuctionsLoading);
  const orderData = useSelector((state: RootState) => state.auctions.auction); // اجلب الطلب من الحالة
  const [order, setOrder] = useState<Auction | null>(null);
  const transmissionText =
    order && getTransmissionText(order.transmission_type);
  const fuelText = order && getFuelText(order.fuel_type);
  const shippingText = order && getShippingText(order.shipping_option);
  const statusInfo = order && getStatusInfo(order.status);
  const timeAgo = order && getTimeAgo(order.created_at);
  const updateTimeAgo = order && getTimeAgo(order.updated_at);
  const createdDate = order && new Date(order.created_at);
  const updatedDate = order && new Date(order.updated_at);

  useEffect(() => {
    dispatch(fetchAuctionById({ apiUrl: apiUrl, id: id }));
  }, [dispatch, id]);
  useEffect(() => {
    if (orderData) {
      setOrder(orderData); // تحديث الحالة عند استلام البيانات
    }
  }, [orderData]);
  if (loading) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  const InfoItem = ({
    label,
    value,
  }: {
    label: string;
    value: string | null | number;
  }) => (
    <div className="flex items-center gap-4">
      <p className="text-gray-600 ">{label}:</p>
      <p className="font-medium text-gray-900 ">{value}</p>
    </div>
  );

  return (
    <div className="p-4  w-full mx-auto">
      {order && (
        <div className=" mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800  pb-3">
            تفاصيل الطلب
          </h2>

          {/* تفاصيل السيارة */}
          <div className="grid grid-cols-1 md:grid-cols-2 pb-3 gap-6 border-b">
            <InfoItem
              label="الموديل"
              value={`${order.category.title} (${order.category.manufacturer.title})`}
            />
            <InfoItem label="السنة" value={order.year} />
            <InfoItem label="ناقل الحركة" value={transmissionText} />
            <InfoItem label="نوع الوقود" value={fuelText} />
            <InfoItem label="عدد الأسطوانات" value={order.cylinders} />
            <InfoItem
              label="ميزانية"
              value={`${order.from_budget} - ${order.to_budget} USD`}
            />
            <InfoItem label="اللون الخارجي" value={order.ex_color} />
            <InfoItem label="اللون الداخلي" value={order.in_color} />
            <InfoItem label="بلد الشحن" value={order.country.title} />
            <InfoItem label="نوع الشحن" value={shippingText} />
            {statusInfo && (
              <p className="flex items-center gap-2">
                <span className="font-semibold text-lg">Status:</span>
                <span
                  className={`text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${statusInfo.color}`}
                >
                  {statusInfo.label}
                </span>
              </p>
            )}
          </div>

          {/* بيانات المستخدم */}
          <h3 className="text-xl font-semibold text-gray-700">
            بيانات المستخدم
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem label="الاسم" value={order.user.name} />
            <InfoItem label="البريد الإلكتروني" value={order.user.email} />
            <InfoItem label="رقم الجوال" value={order.user.contact.mobile} />
            <InfoItem label="المدينة" value={order.user.contact.city} />
          </div>

          {/* تفاصيل الهوية */}

          {order && createdDate && updatedDate && (
            <div className="mt-2 text-xs bg-gray-300 rounded-lg text-gray-500 px-6 py-2 text-center flex flex-col  justify-center items-center gap-2">
              <div className="flex items-center gap-1">
                <span>
                  تم اخر تعديل في:{" "}
                  {updatedDate.toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {updatedDate.toLocaleTimeString("ar-EG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="bg-blue-400 text-white px-2 py-1 rounded-full text-xs">
                  منذ {updateTimeAgo}
                </span>
              </div>
              <div className="flex items-center gap-1">
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
                <span className="bg-green-400 text-white px-2 py-1 rounded-full text-xs">
                  منذ {timeAgo}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
