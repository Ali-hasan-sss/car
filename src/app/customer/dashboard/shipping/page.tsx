"use client";

import { useLanguage } from "../../../../context/LanguageContext";
import GeneralFilter from "@/components/DashboardComponernt/filters/generalFilter";
import TableHeader from "@/components/common/titleBar/tableHeader";
import ToolBar from "@/components/common/toolbar";
import Search_input from "@/components/inputs/search_input";
import { Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import GeneralTable, { Column } from "@/components/table";
import Grid_View from "@/components/table/gridView";
import { useAppDispatch } from "@/store/Reducers/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CustomPagination from "@/components/pagination/extrnalPagenation";
import ShippingForm from "../../../../components/forms/ordersForms/shipping";
import {
  deleteCarShipping,
  fetchCarShippings,
} from "@/store/slice/ShippingSlice";
import { CarShipping, ShippingFormInputs } from "@/Types/AuctionTypes";
import DeleteMessage from "@/components/messags/deleteMessage";

export default function Shipping() {
  const { t } = useLanguage();
  const [openFilter, setOpenFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("");
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
      label: "brand",
      languageDisplay: "en",
    },
    {
      id: "category.title",
      label: "Car_Model",
      languageDisplay: "en",
    },
    {
      id: "year",
      label: "year",
      languageDisplay: "en",
    },
    {
      id: "ex_color",
      label: "Exterior_Color",
      languageDisplay: "en",
    },
    {
      id: "shipping_from",
      label: "shipping_from",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "status",
      label: "status",
      languageDisplay: "en",
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
  const { carShippings, loading, actionLoadingIds, totalPages } = useSelector(
    (state: RootState) => state.carShippings
  );
  useEffect(() => {
    const apiUrl = `customer/car-shippings?page_size=${showing}&page=${currentPage}${
      filterValue ? `&status=${filterValue}` : ""
    }`;
    dispatch(fetchCarShippings({ API: apiUrl }));
  }, [dispatch, showing, currentPage]);

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
        package_shippings: order.package_shippings ?? [],
      };
    };

    const formData = mapOrderToFormInputs(order);
    setInitForm(formData);
    setOpenModal(true);
  };
  const handleDelete = (id: number) => {
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
          <GeneralFilter
            label={t("Filter")}
            onFilterChange={(val) => setFilterValue(val)}
          />{" "}
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
          actionLoading={actionLoadingIds}
          data={carShippings}
          sortBy={sortby}
          showing={showing}
          onTotalCountChange={setTotalCount}
          searchTerm={searchTerm}
          onEdit={(order) => {
            console.log("edit:", order);
            handleEdit(order);
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
              width: "80%",
              maxWidth: "1000px",
              height: "80%",
              maxHeight: "90vh",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 3,
              borderRadius: "8px",
              overflowY: "auto",
              outline: "none",
            }}
          >
            <ShippingForm
              close={closeModal}
              onSubmit={(data) => console.log(`added data: ${data}`)}
              initialData={initForm}
            />
          </Box>
        </Modal>
      )}
    </div>
  );
}
