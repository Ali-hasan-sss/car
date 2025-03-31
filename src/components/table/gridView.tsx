import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import OrderCard from "../cards/order_card";
//import Pagenation from "../pagination";
import Loader from "../loading/loadingPage";
import { Auction } from "@/Types/AuctionTypes";
//import CustomPagination from "../pagination/extrnalPagenation";

interface Grid_ViewProps {
  API?: string;
  data?: Auction[];
  sortBy: string;
  searchTerm?: string;
  showing: number;
  onTotalCountChange: (count: number) => void;
  loading?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (order: Auction) => void;
  onChangeStatus?: (id: number, type: "accept" | "reject" | "finish") => void;
}

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
  const [fullData, setFullData] = useState<Auction[] | null>(null);
  const [displayedData, setDisplayedData] = useState<Auction[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [internalLoading, setInternalLoading] = useState(false);
  //const totalPages = fullData ? Math.ceil(fullData.length / showing) : 1;

  const fetchData = async () => {
    if (!API) return;
    try {
      setInternalLoading(true);
      const res = await axiosInstance.get(`${API}?page=${currentPage}`);
      const responseData: Auction[] = res.data.data;

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

  const sortData = (data: Auction[] | undefined, sortBy: string): Auction[] => {
    if (!Array.isArray(data) || data.length === 0) return []; // التحقق من أن البيانات ليست فارغة

    const sorted = [...data];

    switch (sortBy) {
      case "date":
        sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;

      case "status":
        sorted.sort((a, b) =>
          String(a.status || "").localeCompare(String(b.status || ""))
        );
        break;

      case "model":
        sorted.sort((a, b) =>
          (a.category?.manufacturer?.title || "").localeCompare(
            b.category?.manufacturer?.title || ""
          )
        );
        break;

      default:
        break;
    }

    return sorted;
  };

  useEffect(() => {
    if (fullData) {
      let filteredData = fullData;

      // تصفية حسب البحث إذا كانت قيمة البحث موجودة
      if (searchTerm && searchTerm.trim() !== "") {
        const lowerSearch = searchTerm.toLowerCase();
        filteredData = fullData.filter(
          (order) =>
            order.category?.manufacturer?.title
              .toLowerCase()
              .includes(lowerSearch) ||
            order.category?.title.toLowerCase().includes(lowerSearch)
        );
      }

      const sorted = sortData(filteredData, sortBy);
      const startIndex = (currentPage - 1) * showing;
      const sliced = sorted.slice(startIndex, startIndex + showing);
      setDisplayedData(sliced);
    }
  }, [fullData, sortBy, showing, currentPage, searchTerm]);

  // const handlePageChange = (page: number) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  const isLoading =
    externalLoading !== undefined ? externalLoading : internalLoading;

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full flex-wrap items-center min-h-[200px] justify-center gap-2 mb-4">
        {isLoading && <Loader />}
        {displayedData &&
          displayedData.map((item, index) => (
            <OrderCard
              key={index}
              order={item}
              onDelete={(id) =>
                onDelete ? onDelete(id) : console.log("deleted")
              }
              onEdit={(order) =>
                onEdit ? onEdit(order) : console.log(`editing: ${order}`)
              }
              onChangeStatus={onChangeStatus}
            />
          ))}
      </div>
      {/* <Pagenation totalPages={totalPages} onPageChange={handlePageChange} /> */}
    </div>
  );
}
