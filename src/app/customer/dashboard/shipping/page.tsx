"use client";

import { useLanguage } from "../../../../context/LanguageContext";
import GeneralFilter from "@/components/DashboardComponernt/filters/generalFilter";
import QuickFilter from "@/components/DashboardComponernt/filters/quickFillter";
import TableHeader from "@/components/DashboardComponernt/titleBar/tableHeader";
import ToolBar from "@/components/DashboardComponernt/toolbar";
import Search_input from "@/components/inputs/search_input";
import { Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import GeneralTable, { Column } from "@/components/table";
import Grid_View from "@/components/table/gridView";
import { useAppDispatch } from "@/store/Reducers/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CustomPagination from "@/components/pagination/extrnalPagenation";
import ShippingForm from "../ordersForms/shipping";
import {
  deleteCarShipping,
  fetchCarShippings,
} from "@/store/slice/ShippingSlice";
import { CarShipping, ShippingFormInputs } from "@/Types/AuctionTypes";
import DeleteMessage from "@/components/messags/deleteMessage";

export default function Shipping() {
  const { t } = useLanguage();
  const [openFilter, setOpenFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [initForm, setInitForm] = useState<ShippingFormInputs | null>(null);
  const [showing, setShowing] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [sortby, setSortby] = useState("date");
  const [deleteId, setDeleteId] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
      id: "shipping_from",
      label: "مرفا الشحن",
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
  const apiUrl = "customer/car-shippings";
  const [view, setView] = useState("table");
  const dispatch = useAppDispatch();

  const [actions] = useState({
    edit: true,
    add: true,
    delete: true,
    view: true,
  });
  const { carShippings, loading, totalPages } = useSelector(
    (state: RootState) => state.carShippings
  );
  useEffect(() => {
    const apiUrl = `customer/car-shippings?page_size=${showing}&page=${currentPage}`;
    dispatch(fetchCarShippings({ API: apiUrl }));
  }, [dispatch, showing]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (order: any) => {
    const mapOrderToFormInputs = (order: CarShipping): ShippingFormInputs => {
      return {
        id: order.id ?? null,
        manufacturer: order.category?.manufacturer?.id ?? null,
        is_pickup: 0, // مبدئياً القيمة الافتراضية
        is_consolidate: 0,
        final_port: "",
        in_transit: 0,
        vin: order.vin ?? "",
        cmodel_id: order.cmodel?.id ?? null,
        category_id: order.category?.id ?? null,
        year: order.year?.toString() ?? "",
        mileage: order.mileage?.toString() ?? "",
        drive_system: order.drive_system ?? null,
        transmission_type: order.transmission_type ?? null,
        cylinders: order.cylinders ?? null,
        fuel_type: order.fuel_type ?? null,
        price: order.price?.toString() ?? "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        images: order.images?.map((img: any) => img.image) ?? [],
        ex_color: order.ex_color ?? "",
        in_color: order.in_color ?? "",
        shipping_from: order.shipping_from?.toString() ?? "",
        car_status: typeof order.status === "number" ? order.status : null,
        location_of_car: order.location_of_car ?? null,
        car_fax: order.car_fax ?? null,
        commodity_type: "",
        bill_pdf: "",
        title_pdf: "",
        consignee: "",
        apply_consignee: null,
        use_type: 0,
      };
    };

    const formData = mapOrderToFormInputs(order);
    setInitForm(formData);
    // console.log(formData);
    setOpenModal(true);
  };
  const handleDelete = (id: number) => {
    console.log("تم النقر على حذف، رقم الطلب:", id);
    setOpenDeleteModal(true);
    setDeleteId(id);
  };
  return (
    <div className="flex flex-col items-center w-full  gap-[5px]">
      <TableHeader
        title={t("Shipping")}
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
          initialData={carShippings}
          apiUrl={apiUrl}
          actions={actions}
          onTotalCountChange={setTotalCount}
          sortBy={sortby}
          showing={showing}
          searchTerm={searchTerm}
          customEditForm={(data, close) => (
            <ShippingForm
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
          data={carShippings}
          sortBy={sortby}
          showing={showing}
          onTotalCountChange={setTotalCount}
          searchTerm={searchTerm}
          onEdit={(order) => {
            if ("is_pickup" in order) {
              handleEdit(order);
            }
          }}
          onDelete={(id) => handleDelete(id)}
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
          onDeleteSuccess={() =>
            dispatch(deleteCarShipping({ id: deleteId, apiUrl: apiUrl }))
          }
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
            <ShippingForm
              close={() => setOpenModal(false)}
              onSubmit={(data) => console.log(`added data: ${data}`)}
              initialData={initForm}
            />
          </Box>
        </Modal>
      )}
    </div>
  );
}
