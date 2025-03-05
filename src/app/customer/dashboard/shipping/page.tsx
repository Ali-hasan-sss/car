"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import GeneralFilter from "@/components/DashboardComponernt/filters/generalFilter";
import QuickFilter from "@/components/DashboardComponernt/filters/quickFillter";
import TableHeader from "@/components/DashboardComponernt/titleBar/tableHeader";
import ToolBar from "@/components/DashboardComponernt/toolbar";
import Search_input from "@/components/inputs/search_input";
import { Modal, Box } from "@mui/material";
import { useState } from "react";
import Shipping from "../ordersForms/shipping";
//import GeneralTable from "@/components/table";

export default function Shippingppage() {
  const { t } = useLanguage();
  const [openFilter, setOpenFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
  };

  const handleTogleFilter = () => setOpenFilter(!openFilter);
  /*const columns = [
    { id: "id", label: "Order Id", languageDisplay: "en", type: "text" },
    {
      id: "Manufacture",
      label: "Car Manufacture",
      languageDisplay: "en",
      type: "text",
    },
    { id: "Color", label: "Car Color", languageDisplay: "en", type: "text" },
    {
      id: "Model",
      label: "Car Model Name",
      languageDisplay: "en",
      type: "text",
    },
    {
      id: "Auction_no",
      label: "Car Auction No",
      languageDisplay: "en",
      type: "text",
    },
    { id: "Statu", label: "Statu", languageDisplay: "en", type: "text" },
  ];

  const data = [
    {
      id: "TEST23122024",
      Manufacture: "German",
      Color: "blue",
      Model: "KIA",
      Auction_no: "SLD123456789",
      Statu: "Active",
    },

    {
      id: "TEST23122024",
      Manufacture: "German",
      Color: "blue",
      Model: "KIA",
      Auction_no: "SLD123456789",
      Statu: "Active",
    },

    {
      id: "TEST23122024",
      Manufacture: "German",
      Color: "red",
      Model: "BMW",
      Auction_no: "SLD123456789",
      Statu: "Active",
    },
    {
      id: "TEST853122024",
      Manufacture: "German",
      Color: "white",
      Model: "Huondai",
      Auction_no: "SLD123456789",
      Statu: "Active",
    },
    {
      id: "TEST731220544",
      Manufacture: "German",
      Color: "blue",
      Model: "KIA",
      Auction_no: "SLD123456789",
      Statu: "Active",
    },
    {
      id: "TEST23122024",
      Manufacture: "German",
      Color: "blue",
      Model: "KIA",
      Auction_no: "SLD123456789",
      Statu: "Active",
    },
  ];*/

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
      <Search_input />
      {openFilter && (
        <>
          <GeneralFilter label="Filter & Sort Control" />
          <QuickFilter />
        </>
      )}
      <ToolBar />
      {/* <GeneralTable
        columns={columns}
        data={data}
        actions={{
          edit: true,
          delete: true,
          view: true,
        }}
        details={true}
      />*/}
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
            <Shipping />
          </Box>
        </Modal>
      )}
    </div>
  );
}
