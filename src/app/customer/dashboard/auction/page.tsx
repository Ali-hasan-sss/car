"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import GeneralFilter from "@/components/DashboardComponernt/filters/generalFilter";
import QuickFilter from "@/components/DashboardComponernt/filters/quickFillter";
import TableHeader from "@/components/DashboardComponernt/titleBar/tableHeader";
import ToolBar from "@/components/DashboardComponernt/toolbar";
import Search_input from "@/components/inputs/search_input";
import { Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Auctions from "../ordersForms/Auctions";
import GeneralTable, { Column } from "@/components/table";
import Grid_View from "@/components/table/gridView";
import { deleteOrderLocal, fetchOrders } from "@/store/slice/orderSlice";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [sortby, setSortby] = useState("date");
  const closeModal = () => {
    setOpenModal(false);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleTogleFilter = () => setOpenFilter(!openFilter);
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
  const [view, setView] = useState("table");
  const dispatch = useAppDispatch();
  const apiUrl = "customer/car-auctions";
  const { orders, loading, error, totalPages } = useSelector(
    (state: RootState) => state.orders
  );

  const [actions] = useState({
    edit: true,
    add: true,
    delete: true,
    view: true,
  });
  useEffect(() => {
    const apiUrl = `customer/car-auctions?page_size=${showing}&page=${currentPage}`;
    dispatch(fetchOrders({ API: apiUrl }));
  }, [dispatch]);
  const handleDelete = (id: number) => {
    console.log("تم النقر على حذف، رقم الطلب:", id);
    setOpenDeleteModal(true);
    setDeleteId(id);
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
              borderRadius: "8px",
              overflowY: "auto", // السماح بالتمرير عند زيادة المحتوى
              outline: "none",
            }}
          >
            <Auctions
              close={closeModal}
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
