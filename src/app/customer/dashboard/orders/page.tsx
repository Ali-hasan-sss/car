"use client";
import "../dashboard.css";
import Search_input from "@/components/inputs/search_input";
import GeneralFilter from "@/components/DashboardComponernt/filters/generalFilter";
import QuickFilter from "@/components/DashboardComponernt/filters/quickFillter";
import ToolBar from "@/components/DashboardComponernt/toolbar";
import TableHeader from "@/components/DashboardComponernt/titleBar/tableHeader";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState } from "react";
import Auctions from "../ordersForms/Auctions";
import { Box, Modal } from "@mui/material";
//import GeneralTable from "@/components/table";

const Orders = () => {
  const { t } = useLanguage();
  const [openFilter, setOpenFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
  };

  const handleTogleFilter = () => setOpenFilter(!openFilter);
  /*
  const columns = [
    { id: "id", label: "Order Id" },
    { id: "Statu", label: "Statu" },
    { id: "VIN", label: "VIN" },
    { id: "lot_no", label: "LOT No" },
    { id: "Description", label: "Description" },
    { id: "Buyer_code", label: "Buyer code" },
  ];

  const data = [
    {
      id: "TEST23122024",
      Statu: "New",
      VIN: "WBSPM9C52BE20****",
      lot_no: "00125400",
      Description: "KIA v2024",
      Buyer_code: "0000001452",
    },
    {
      id: "TEST23152027",
      Statu: "Old",
      VIN: "WBSPM9C52BE80****",
      lot_no: "00125700",
      Description: "BMW v2024",
      Buyer_code: "0050001952",
    },
  ];*/
  return (
    <div className="flex flex-col items-center w-full  gap-[5px]">
      <TableHeader
        title={t("Orders")}
        action={{
          filter: true,
          export: true,
          add: true,
          addNewActiom: () => setOpenModal(true),
          filterActiom: handleTogleFilter,
        }}
      />{" "}
      <Search_input />
      {openFilter && (
        <>
          <GeneralFilter label="Filter & Sort Control" />
          <QuickFilter />
        </>
      )}
      <ToolBar />
      <div className="bg-white w-full p-4">
        {/** <GeneralTable
          columns={columns}
          data={data}
          actions={{
            edit: true,
            delete: true,
            view: true,
            share: true,
          }}
        />  */}
      </div>
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
              onSubmit={() => console.log("done")}
              close={() => setOpenModal(false)}
            />
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Orders;
