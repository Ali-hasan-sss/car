import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import OrderCard from "../cards/order_card";
import Loader from "../loading/loadingPage";
import { Auction, CarSale } from "@/Types/AuctionTypes"; // تأكد من أن الأنواع تشمل كلاً من الطلبات والسيارات
import CarCard from "../cards/carCard";

interface Grid_ViewProps {
  API?: string;
  data?: (Auction | CarSale)[]; // البيانات يمكن أن تكون من نوع Order أو CarSale
  sortBy: string;
  searchTerm?: string;
  showing: number;
  onTotalCountChange: (count: number) => void;
  loading?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (item: Auction | CarSale) => void;
  onChangeStatus?: (id: number, type: "accept" | "reject" | "finish") => void;
}

// دالة لفحص ما إذا كان العنصر من نوع CarSale
const isCarSale = (item: Auction | CarSale): item is CarSale => {
  return (item as CarSale).images !== undefined;
};

// // دالة لفحص ما إذا كان العنصر من نوع Auction
// const isAuction = (item: Auction | CarSale): item is Auction => {
//   return (item as Auction).created_at !== undefined;
// };

export default function Grid_View({
  API,
  data,
  sortBy,
  searchTerm,
  showing,
  onDelete,
  onEdit,
  onChangeStatus,
  onTotalCountChange,
  loading: externalLoading, // <-- إعادة التسمية لتمييزه عن الداخلي
}: Grid_ViewProps) {
  const [fullData, setFullData] = useState<(Auction | CarSale)[] | null>(null);
  const [displayedData, setDisplayedData] = useState<
    (Auction | CarSale)[] | null
  >(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [internalLoading, setInternalLoading] = useState(false);

  const fetchData = async () => {
    if (!API) return;
    try {
      setInternalLoading(true);
      const res = await axiosInstance.get(`${API}?page=${currentPage}`);
      const responseData: (Auction | CarSale)[] = res.data.data;

      setFullData(responseData);
      onTotalCountChange(responseData.length);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setInternalLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setFullData(data);
      onTotalCountChange(data.length);
      setCurrentPage(1);
    } else if (API) {
      fetchData();
    }
  }, [API, data]);

  const sortData = (
    data: (Auction | CarSale)[] | undefined,
    sortBy: string
  ): (Auction | CarSale)[] => {
    if (!Array.isArray(data) || data.length === 0) return [];

    const sorted = [...data];

    switch (sortBy) {
      case "date":
        sorted.sort(
          (a, b) =>
            new Date((b as Auction).created_at).getTime() -
            new Date((a as Auction).created_at).getTime()
        );
        break;

      case "status":
        sorted.sort((a, b) =>
          String((a as Auction).status || "").localeCompare(
            String((b as Auction).status || "")
          )
        );
        break;

      case "model":
      //  إذا كانت CarSale تحتوي على model أو خصائص مشابهة
      // sorted.sort(
      //   (a, b) =>
      //     (a as CarSale).category?.manufacturer.title((b as CarSale).cmodel || "") || 0
      // );
      // break;

      // default:
      //   break;
    }

    return sorted;
  };

  useEffect(() => {
    if (fullData) {
      let filteredData = fullData;

      if (searchTerm && searchTerm.trim() !== "") {
        const lowerSearch = searchTerm.toLowerCase();
        filteredData = fullData.filter(
          (item) =>
            (item as Auction).category?.manufacturer?.title
              .toLowerCase()
              .includes(lowerSearch) ||
            (item as Auction).category?.title
              .toLowerCase()
              .includes(lowerSearch)
        );
      }

      const sorted = sortData(filteredData, sortBy);
      const startIndex = (currentPage - 1) * showing;
      const sliced = sorted.slice(startIndex, startIndex + showing);
      setDisplayedData(sliced);
    }
  }, [fullData, sortBy, showing, currentPage, searchTerm]);

  const isLoading =
    externalLoading !== undefined ? externalLoading : internalLoading;

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full flex-wrap items-center min-h-[200px] justify-center gap-4 mb-4">
        {isLoading && <Loader />}
        {displayedData &&
          displayedData.map((item, index) =>
            // نعرض كارد الطلب أو كارد السيارة حسب نوع البيانات
            isCarSale(item) ? (
              <CarCard
                key={index}
                car={item as CarSale}
                onDelete={(id) =>
                  onDelete ? onDelete(id) : console.log("deleted")
                }
                onEdit={(order) =>
                  onEdit ? onEdit(order) : console.log(`editing: ${order}`)
                }
                onChangeStatus={onChangeStatus}
              />
            ) : (
              <OrderCard
                key={index}
                order={item as Auction}
                onDelete={(id) =>
                  onDelete ? onDelete(id) : console.log("deleted")
                }
                onEdit={(order) =>
                  onEdit ? onEdit(order) : console.log(`editing: ${order}`)
                }
                onChangeStatus={onChangeStatus}
              />
            )
          )}
      </div>
    </div>
  );
}
