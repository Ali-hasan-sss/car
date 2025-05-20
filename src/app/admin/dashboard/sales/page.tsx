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
import DeleteMessage from "@/components/messags/deleteMessage";
import CustomPagination from "@/components/pagination/extrnalPagenation";
import { CarSale, SallesFormInputs } from "@/Types/AuctionTypes";
import {
  deleteCarSaleLocal,
  fetchCarSales,
  updateCarSale,
} from "@/store/slice/carSalesSlice";
import { Box, Modal } from "@mui/material";
import Salles from "@/components/forms/ordersForms/salles";
import { toast } from "sonner";

export default function Sales() {
  const { t } = useLanguage();
  const [openFilter, setOpenFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [initForm, setInitForm] = useState<SallesFormInputs | null>(null);
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
  // console.log(openModal);
  // console.log(closeModal);
  // console.log(initForm);
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
  const apiUrl = `admin/car-sales`;
  const [view, setView] = useState("table");
  const dispatch = useAppDispatch();
  const { carSales, loading, actionLoadingIds, totalPages } = useSelector(
    (state: RootState) => state.carSales
  );
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
    const apiUrl = `admin/car-sales?page_size=${showing}&page=${currentPage}`;
    dispatch(fetchCarSales({ API: apiUrl }));
  }, [dispatch, currentPage, showing]);

  const handleAcceptReject = async (
    id: number,
    type: "accept" | "reject" | "finish"
  ) => {
    // console.log(`the id : ${id} the type: ${type}`);
    setSelectedRequest({ id, type });
    const status = type === "accept" ? 2 : type === "reject" ? 0 : 3;
    try {
      //await axiosInstance.put(`${apiUrl}/${id}`, { status });
      dispatch(
        updateCarSale({
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
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (order: any) => {
    const mapOrderToFormInputs = (order: CarSale): SallesFormInputs => {
      return {
        manufacturer: order.category?.manufacturer?.id ?? null,
        cmodel_id: order.cmodel?.id ?? null,
        category_id: order.category?.id ?? null,
        mileage: order.mileage ?? 0,
        year: order.year?.toString() ?? "",
        drive_system: order.drive_system ?? 1,
        transmission_type: order.transmission_type ?? 1,
        cylinders: order.cylinders ?? 4,
        fuel_type: order.fuel_type ?? 1,
        price: order.price?.toString() ?? "",
        shipping_from: order.shipping_from ?? "",
        car_status: typeof order.status === "number" ? order.status : 0,
        ex_color: order.ex_color ?? "",
        in_color: order.in_color ?? "",
        id: order.id,
        images: order.images?.map((img) => img.image) ?? [],
        not_shippedlocations: "",
        shipping_status: 0,
        carfax: null, // إذا كنت تحتاجها من order.car_fax، حولها لرقم أو غيّر النوع في الفورم
        location_port: "",
      };
    };

    const formData = mapOrderToFormInputs(order);
    setInitForm(formData);
    // console.log(initForm);
    setOpenModal(true);
  };

  const handleDelete = (id: number) => {
    setOpenDeleteModal(true);
    setDeleteId(id);
  };
  // if (error) return <div>{error}</div>;
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
          initialData={carSales}
          onTotalCountChange={setTotalCount}
          onChangeStatus={handleAcceptReject}
          sortBy={sortby}
          showing={showing}
          searchTerm={searchTerm}
          customEditForm={(data, close) => (
            <Salles
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
          data={carSales}
          sortBy={sortby}
          showing={showing}
          onTotalCountChange={setTotalCount}
          searchTerm={searchTerm}
          onDelete={(id) => handleDelete(id)}
          onEdit={(order) => {
            if ("images" in order) {
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
      {openDeleteModal && (
        <DeleteMessage
          API={apiUrl}
          open={openDeleteModal}
          id={deleteId}
          handleClose={() => setOpenDeleteModal(false)}
          onDeleteSuccess={() => dispatch(deleteCarSaleLocal(deleteId))}
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
            <Salles
              onSubmit={(data) => {
                console.log(data);
              }}
              initialData={initForm}
              close={() => setOpenModal(false)}
            />
          </Box>
        </Modal>
      )}
    </div>
  );
}
