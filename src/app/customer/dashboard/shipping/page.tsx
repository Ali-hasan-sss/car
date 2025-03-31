"use client";

// import { useLanguage } from "../../../../context/LanguageContext";
// import GeneralFilter from "@/components/DashboardComponernt/filters/generalFilter";
// import QuickFilter from "@/components/DashboardComponernt/filters/quickFillter";
// import TableHeader from "@/components/DashboardComponernt/titleBar/tableHeader";
// import ToolBar from "@/components/DashboardComponernt/toolbar";
// import Search_input from "@/components/inputs/search_input";
// import { Modal, Box } from "@mui/material";
// import { useEffect, useState } from "react";
// import GeneralTable, { Column } from "@/components/table";
// import Grid_View from "@/components/table/gridView";
// import { useAppDispatch } from "@/store/Reducers/hooks";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// //import ShippingForm from "../ordersForms/shipping";
// import CustomPagination from "@/components/pagination/extrnalPagenation";

export default function Shipping() {
  // const { t } = useLanguage();
  // const [openFilter, setOpenFilter] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  // const [showing, setShowing] = useState(10);
  // const [totalCount, setTotalCount] = useState(0);
  // const [sortby, setSortby] = useState("date");
  // const [currentPage, setCurrentPage] = useState(1);

  // const closeModal = () => {
  //   setOpenModal(false);
  // };
  // const [searchTerm, setSearchTerm] = useState("");
  // const handleTogleFilter = () => setOpenFilter(!openFilter);
  // const columns: Column[] = [
  //   {
  //     id: "category.manufacturer.title",
  //     label: "الشركة الصانعة",
  //     languageDisplay: "en",
  //     includeInForm: true,
  //   },
  //   {
  //     id: "category.title",
  //     label: "الموديل",
  //     languageDisplay: "en",
  //     includeInForm: true,
  //   },
  //   {
  //     id: "year",
  //     label: "سنة الصنع",
  //     languageDisplay: "en",
  //     includeInForm: true,
  //   },
  //   {
  //     id: "ex_color",
  //     label: "اللون",
  //     languageDisplay: "en",
  //     includeInForm: true,
  //   },
  //   {
  //     id: "country.title",
  //     label: "بلد الشحن",
  //     languageDisplay: "en",
  //     includeInForm: true,
  //   },
  //   {
  //     id: "created_at",
  //     label: "تاريخ انشاء الطلب",
  //     languageDisplay: "en",
  //     includeInForm: false,
  //   },
  //   {
  //     id: "status",
  //     label: "حالة الطلب",
  //     languageDisplay: "en",
  //     includeInForm: false,
  //   },
  // ];
  // const apiUrl = "customer/car-shippings";
  // const [view, setView] = useState("table");
  // const dispatch = useAppDispatch();
  // const { orders, loading, error, totalPages } = useSelector(
  //   (state: RootState) => state.orders
  // );

  // const [actions] = useState({
  //   edit: true,
  //   add: true,
  //   delete: true,
  //   view: true,
  // });
  // useEffect(() => {
  //   const apiUrl = `customer/car-shippings?page_size=${showing}&page=${currentPage}`;
  //   dispatch(fetchOrders({ API: apiUrl }));
  // }, [dispatch]);

  // if (error) return <div>{error}</div>;
  return (
    <div className="flex flex-col items-center w-full  gap-[5px]">
      {/* <TableHeader
        title={t("Auctions")}
        action={{
          filter: true,
          export: true,
          add: true,
          addNewActiom: () => setOpenModal(true),
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
              borderRadius: "8px",
              overflowY: "auto", // السماح بالتمرير عند زيادة المحتوى
              outline: "none",
            }}
          >
            <ShippingForm />
          </Box>
        </Modal>
      )} */}
    </div>
  );
}
