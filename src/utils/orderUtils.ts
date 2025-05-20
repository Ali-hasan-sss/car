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
  return transmission_type === 1
    ? "auto"
    : transmission_type === 2
    ? "manual"
    : "Tiptronic";
};
//تحويل القيم الى الوان
export const getColorValue = (color: string) => {
  switch (color.toLowerCase()) {
    case "white":
      return "bg-white";
    case "black":
      return "bg-black";
    case "silver":
    case "gray":
      return "bg-gray-400"; // فضي رمادي فاتح
    case "red":
      return "bg-red-500";
    case "blue":
      return "bg-blue-500";
    case "green":
      return "bg-green-500";
    case "yellow":
      return "bg-yellow-400";
    case "orange":
      return "bg-orange-500";
    case "brown":
      return "bg-amber-800"; // أقرب لون بني
    case "beige":
    case "cream":
      return "bg-yellow-100"; // قريب من البيج والكريمي
    case "gold":
      return "bg-yellow-500"; // ذهبي تقريباً
    case "maroon":
      return "bg-red-800"; // خمري
    case "navy":
    case "dark_blue":
      return "bg-blue-900"; // كحلي غامق
    case "purple":
      return "bg-purple-500";
    case "tan":
      return "bg-amber-300"; // لون سكري
    case "burgundy":
      return "bg-rose-900"; // عنابي غامق
    case "ivory":
      return "bg-gray-100"; // قريب من العاجي
    default:
      return "bg-gray-500"; // لون افتراضي
  }
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
    ? "Flex_Fuel"
    : fuel_type === 5
    ? "Hybrid"
    : "Electric";
};
export const getPackageTypeText = (package_type: number) => {
  return package_type === 1
    ? "Spare_Part"
    : package_type === 2
    ? "Tire"
    : package_type === 3
    ? "Battery"
    : package_type === 4
    ? "Engine"
    : package_type === 5
    ? "Car_Body_Part"
    : package_type === 6
    ? "Accessory"
    : "Other";
};
export const getWeightUnitText = (Weight_unit: number) => {
  return Weight_unit === 1 ? "Kg" : "Ton";
};
export const getDimensionunitText = (Dimension_unit: number) => {
  return Dimension_unit === 1
    ? "CM"
    : Dimension_unit === 2
    ? "M"
    : Dimension_unit === 3
    ? "Foot"
    : "Inch";
};
export const getDriveSystemText = (fuel_type: number) => {
  return fuel_type === 1 ? "FWD" : fuel_type === 2 ? "RWD" : "d4WD";
};

// 🛠️ تحويل خيار الشحن إلى نص
export const getShippingText = (shipping_option: number) => {
  return shipping_option === 1 ? "container" : "group";
};

// 🛠️ خريطة الحالات مع الألوان
export const statusMap: Record<
  number | "null",
  { label: string; color: string }
> = {
  0: { label: "rejected", color: "bg-red-500" },
  1: { label: "pending", color: "bg-yellow-200" },
  2: { label: "in_progress", color: "bg-blue-400" },
  3: { label: "completed", color: "bg-green-700" },
  4: { label: "Received", color: "bg-blue-500" },
  5: { label: "Delivered_To_Shipping_Co", color: "bg-blue-600" },
  6: { label: "Shipped", color: "bg-blue-700" },
  7: { label: "Arrived_To_Oman", color: "bg-green-500" },
  8: { label: "Arrived_To_Destination", color: "bg-green-600" },
  null: { label: "witing", color: "bg-gray-400" },
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
