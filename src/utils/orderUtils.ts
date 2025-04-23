import { Auction } from "@/Types/AuctionTypes";

export const extractOrderDetails = (order: Auction) => {
  const {
    id,
    category,
    year,
    transmission_type,
    fuel_type,
    cylinders,
    from_budget,
    to_budget,
    ex_color,
    in_color,
    country,
    user,
    status,
    shipping_option,
    created_at,
  } = order;

  return {
    id,
    category,
    year,
    transmission_type,
    fuel_type,
    cylinders,
    from_budget,
    to_budget,
    ex_color,
    in_color,
    country,
    user,
    status,
    shipping_option,
    created_at,
  };
};

// 🛠️ تحويل نوع ناقل الحركة إلى نص
export const getTransmissionText = (transmission_type: number) => {
  return transmission_type === 1 ? "Automatic" : "Manual";
};

// 🛠️ تحويل نوع الوقود إلى نص
export const getFuelText = (fuel_type: number) => {
  return fuel_type === 1
    ? "Petrol"
    : fuel_type === 2
    ? "Diesel"
    : fuel_type === 3
    ? "CNG"
    : fuel_type === 4
    ? "Flex fuel"
    : fuel_type === 5
    ? "Hybrid"
    : "Electric";
};
export const getDriveSystemText = (fuel_type: number) => {
  return fuel_type === 1
    ? "دفع امامي"
    : fuel_type === 2
    ? "دفع خلفي"
    : "دفع رباعي";
};

// 🛠️ تحويل خيار الشحن إلى نص
export const getShippingText = (shipping_option: number) => {
  return shipping_option === 1 ? "Container" : "Group";
};

// 🛠️ خريطة الحالات مع الألوان
export const statusMap: Record<
  number | "null",
  { label: string; color: string }
> = {
  0: { label: "مرفوض", color: "bg-red-500" },
  1: { label: "قيد الانتظار", color: "bg-yellow-200" },
  2: { label: "قيد التنفيذ", color: "bg-blue-500" },
  3: { label: "منجز", color: "bg-green-500" },
  null: { label: "غير محدد", color: "bg-gray-400" },
};

//  تحديد حالة الطلب
export const getStatusInfo = (status: number | null) => {
  const statusKey = status === null ? "null" : status;
  return statusMap[statusKey];
};

// حساب المدة منذ إنشاء الطلب
export const getTimeAgo = (created_at: string) => {
  const now = new Date();
  const createdDate = new Date(created_at);
  const diffMs = now.getTime() - createdDate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 24) return `${diffHours} ساعة`;
  if (diffDays < 7) return `${diffDays} يوم`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} أسبوع`;
  return `${Math.floor(diffDays / 30)} شهر`;
};
