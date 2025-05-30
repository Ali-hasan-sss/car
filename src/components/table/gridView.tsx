import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import OrderCard from "../cards/order_card";
import Loader from "../loading/loadingPage";
import { Auction, CarSale, CarShipping } from "@/Types/AuctionTypes"; // تأكد من أن الأنواع تشمل كلاً من الطلبات والسيارات
import CarCard from "../cards/car_card";
import { CarShippingCard } from "../cards/ShippingCard";

interface Grid_ViewProps {
  API?: string;
  data?: (Auction | CarSale | CarShipping)[]; // البيانات يمكن أن تكون من نوع Order أو CarSale
  sortBy: string;
  searchTerm?: string;
  showing: number;
  onTotalCountChange: (count: number) => void;
  loading?: boolean;
  actionLoading: number[];
  onDelete?: (id: number) => void;
  onEdit?: (item: Auction | CarSale | CarShipping) => void;
  onChangeStatus?: (id: number, type: "accept" | "reject" | "finish") => void;
}

const isCarSale = (item: Auction | CarSale | CarShipping): item is CarSale => {
  return "images" in item && !("package_shippings" in item);
};

const isShipping = (
  item: Auction | CarSale | CarShipping
): item is CarShipping => {
  return (item as CarShipping).package_shippings !== undefined;
};

const isAuction = (item: Auction | CarSale | CarShipping): item is Auction => {
  return (item as Auction).auction_link !== undefined;
};

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
  loading: externalLoading,
  actionLoading,
}: Grid_ViewProps) {
  const [fullData, setFullData] = useState<
    (Auction | CarSale | CarShipping)[] | null
  >(null);
  const [displayedData, setDisplayedData] = useState<
    (Auction | CarSale | CarShipping)[] | null
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
  }, [API, data, onTotalCountChange]);

  const sortData = (
    data: (Auction | CarSale | CarShipping)[] | undefined,
    sortBy: string
  ): (Auction | CarSale | CarShipping)[] => {
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
            isCarSale(item) ? (
              <CarCard
                isDashboard
                isloagedin
                key={index}
                car={item}
                onDelete={(id) =>
                  onDelete ? onDelete(id) : console.log("deleted")
                }
                onEdit={(order) =>
                  onEdit ? onEdit(order) : console.log(`editing: ${order}`)
                }
                onChangeStatus={onChangeStatus}
              />
            ) : isShipping(item) ? (
              <CarShippingCard
                actionLoading={actionLoading.includes(item.id)}
                key={index}
                shipping={item as CarShipping}
                onDelete={(id) =>
                  onDelete ? onDelete(id) : console.log("deleted")
                }
                onEdit={(order) =>
                  onEdit ? onEdit(order) : console.log(`editing: ${order}`)
                }
                onChangeStatus={onChangeStatus}
              />
            ) : isAuction(item) ? (
              <OrderCard
                actionLoading={actionLoading.includes(item.id)}
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
            ) : (
              <div>نوع غير معروف</div>
            )
          )}
      </div>
    </div>
  );
}
