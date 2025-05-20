"use client";

import { useLanguage } from "../../../../context/LanguageContext";
import GeneralFilter from "@/components/DashboardComponernt/filters/generalFilter";
import TableHeader from "@/components/common/titleBar/tableHeader";
import ToolBar from "@/components/common/toolbar";
import Search_input from "@/components/inputs/search_input";
import { useEffect, useState } from "react";
import GeneralTable, { Column } from "@/components/table";
import Grid_View from "@/components/table/gridView";

import { useAppDispatch } from "@/store/Reducers/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Auction, AuctionsFormInputs } from "@/Types/AuctionTypes";
import DeleteMessage from "@/components/messags/deleteMessage";
import CustomPagination from "@/components/pagination/extrnalPagenation";
import {
  deleteAuctionLocal,
  fetchAuctions,
  updateAuction,
} from "@/store/slice/AuctionsSlice";
import Auctions from "@/components/forms/ordersForms/Auctions";
import { Box, Modal } from "@mui/material";
import { toast } from "sonner";
//import GeneralTable from "@/components/table";

export default function Actions() {
  const { t } = useLanguage();
  const [openFilter, setOpenFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [initForm, setInitForm] = useState<AuctionsFormInputs | null>(null);
  const [showing, setShowing] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [sortby, setSortby] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("table");
  const handleTogleFilter = () => setOpenFilter(!openFilter);
  const [selectedRequest, setSelectedRequest] = useState<{
    id: number;
    type: "accept" | "reject" | "finish";
  } | null>(null);
  console.log(selectedRequest);
  const columns: Column[] = [
    {
      id: "user.name",
      label: " اسم صاحب الطلب",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "category.manufacturer.title",
      label: "الشركة الصانعة",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "category.title",
      label: "الموديل",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "year",
      label: "سنة الصنع",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "ex_color",
      label: "اللون",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "country.title",
      label: "بلد الشحن",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "created_at",
      label: "تاريخ انشاء الطلب",
      languageDisplay: "en",
      includeInForm: false,
    },
    {
      id: "status",
      label: "حالة الطلب",
      languageDisplay: "en",
      includeInForm: false,
    },
  ];
  const apiUrl = `admin/car-auctions`;
  const dispatch = useAppDispatch();
  const { auctions, error, loading, actionLoadingIds, totalPages } =
    useSelector((state: RootState) => state.auctions);
  //console.log(totalPages);
  const [actions] = useState({
    edit: true,
    add: true,
    delete: true,
    view: true,
    accept: true,
    reject: true,
    finish: true,
  });
  useEffect(() => {
    const apiUrl = `admin/car-auctions?page_size=${showing}&page=${currentPage}`;
    dispatch(fetchAuctions({ API: apiUrl }));
  }, [dispatch, currentPage, showing]);
  const closeModal = () => {
    setOpenModal(false);
  };
  const handleDelete = (id: number) => {
    setOpenDeleteModal(true);
    setDeleteId(id);
  };
  const handleAcceptReject = async (
    id: number,
    type: "accept" | "reject" | "finish"
  ) => {
    setSelectedRequest({ id, type });
    const status = type === "accept" ? 2 : type === "reject" ? 0 : 3; // تحديد القيمة بناءً على نوع الإجراء
    try {
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
      console.error("حدث خطأ أثناء تحديث الطلب:", error);
      toast.error("حدث خطأ ما");
    } finally {
    }
  };

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
  if (error) return <div>{error}</div>;
  return (
    <div className="flex flex-col items-center w-full  gap-[5px]">
      <TableHeader
        title={t("Auctions")}
        action={{
          filter: true,
          export: true,
          add: true,
          addNewActiom: () => {
            setOpenModal(true);
            setInitForm(null);
          },
          filterActiom: handleTogleFilter,
        }}
      />
      <Search_input value={searchTerm} onChange={setSearchTerm} />
      {openFilter && (
        <>
          <GeneralFilter label="Filter & Sort Control" />
        </>
      )}
      <ToolBar
        view={view}
        setView={setView}
        showing={showing}
        sortby={sortby}
        onShowingChange={setShowing}
        onSortByChange={setSortby}
        totalItems={totalCount}
      />
      {view === "table" ? (
        <GeneralTable
          loading={loading}
          actionLoading={actionLoadingIds}
          columns={columns}
          apiUrl={apiUrl}
          actions={actions}
          initialData={auctions}
          onTotalCountChange={setTotalCount}
          onChangeStatus={handleAcceptReject}
          sortBy={sortby}
          showing={showing}
          searchTerm={searchTerm}
          customEditForm={(data, close) => (
            <Auctions
              onSubmit={(data) => {
                console.log("data:", data);
              }}
              initialData={data}
              close={() => close}
            />
          )}
        />
      ) : (
        <Grid_View
          loading={loading}
          actionLoading={actionLoadingIds}
          data={auctions}
          sortBy={sortby}
          showing={showing}
          onTotalCountChange={setTotalCount}
          searchTerm={searchTerm}
          onDelete={(id) => handleDelete(id)}
          onEdit={(order) => {
            if ("auction_link" in order) {
              handleEdit(order);
            }
          }}
          onChangeStatus={handleAcceptReject}
        />
      )}
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {openModal && (
        <Modal open={openModal} onClose={closeModal}>
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
      {openDeleteModal && (
        <DeleteMessage
          API={apiUrl}
          open={openDeleteModal}
          id={deleteId}
          handleClose={() => setOpenDeleteModal(false)}
          onDeleteSuccess={() => dispatch(deleteAuctionLocal(deleteId))}
        />
      )}
    </div>
  );
}
