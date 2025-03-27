"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import GeneralFilter from "@/components/DashboardComponernt/filters/generalFilter";
import QuickFilter from "@/components/DashboardComponernt/filters/quickFillter";
import TableHeader from "@/components/DashboardComponernt/titleBar/tableHeader";
import ToolBar from "@/components/DashboardComponernt/toolbar";
import Search_input from "@/components/inputs/search_input";
import { useEffect, useState } from "react";
import GeneralTable, { Column } from "@/components/table";
import Grid_View from "@/components/table/gridView";
import {
  deleteOrderLocal,
  fetchOrders,
  updateOrder,
} from "@/store/slice/orderSlice";
import { useAppDispatch } from "@/store/Reducers/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AuctionsFormInputs, Order } from "@/Types/orderTypes";
import DeleteMessage from "@/components/messags/deleteMessage";
import CustomPagination from "@/components/pagination/extrnalPagenation";
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
  const closeModal = () => {
    setOpenModal(false);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const handleTogleFilter = () => setOpenFilter(!openFilter);
  const [selectedRequest, setSelectedRequest] = useState<{
    id: number;
    type: "accept" | "reject" | "finish";
  } | null>(null);
  console.log(openModal);
  console.log(closeModal);
  console.log(initForm);
  console.log(selectedRequest);
  const columns: Column[] = [
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
  const [view, setView] = useState("table");
  const dispatch = useAppDispatch();
  const { orders, loading, error, totalPages } = useSelector(
    (state: RootState) => state.orders
  );
  console.log(totalPages);
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
    dispatch(fetchOrders({ API: apiUrl }));
  }, [dispatch, currentPage, showing]);

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
      dispatch(
        updateOrder({
          apiUrl: apiUrl,
          id: id,
          updatedData: { status },
        })
      );
      console.log(
        `تم ${
          type === "accept" ? "قبول" : type === "reject" ? "رفض" : "اكمال"
        } الطلب رقم ${id}`
      );
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الطلب:", error);
    }
  };

  const handleEdit = (order: Order) => {
    const mapOrderToFormInputs = (order: Order): AuctionsFormInputs => {
      return {
        auction_link: order.auction_link || "", // الرابط الخاص بالمزاد
        manufacturer: order.category?.manufacturer?.id || null, // تحويل category إلى manufacturer (في حال كان category يحتوي على id)
        category_id: order.category?.id || null, // نفس الشيء مع category
        year: order.year.toString() || "", // تحويل السنة إلى نص
        transmission_type: order.transmission_type.toString() || "", // نفس الشيء مع transmission_type
        drive_system: order.drive_system.toString() || "", // نفس الشيء مع drive_system
        fuel_type: order.fuel_type.toString() || "", // نفس الشيء مع fuel_type
        cylinders: order.cylinders.toString() || "", // نفس الشيء مع cylinders
        from_budget: order.from_budget.toString() || "", // تحويل القيمة إلى نص
        to_budget: order.to_budget.toString() || "", // تحويل القيمة إلى نص
        shipping_option: order.shipping_option.toString() || "", // نفس الشيء مع shipping_option
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
          <QuickFilter />
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
          columns={columns}
          apiUrl={apiUrl}
          actions={actions}
          initialData={orders}
          onTotalCountChange={setTotalCount}
          onChangeStatus={handleAcceptReject}
          sortBy={sortby}
          showing={showing}
          searchTerm={searchTerm}
        />
      ) : (
        <Grid_View
          loading={loading}
          data={orders}
          sortBy={sortby}
          showing={showing}
          onTotalCountChange={setTotalCount}
          searchTerm={searchTerm}
          onDelete={(id) => handleDelete(id)}
          onEdit={(order) => handleEdit(order)}
          onChangeStatus={handleAcceptReject}
        />
      )}
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {openDeleteModal && (
        <DeleteMessage
          API={apiUrl}
          open={openDeleteModal}
          id={deleteId}
          handleClose={() => setOpenDeleteModal(false)}
          onDeleteSuccess={() => dispatch(deleteOrderLocal(deleteId))}
        />
      )}
    </div>
  );
}
