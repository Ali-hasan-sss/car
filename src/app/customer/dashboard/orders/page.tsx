"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import TitleBar from "@/components/DashboardComponernt/titleBar";
import Search_input from "@/components/inputs/search_input";

const Orders = () => {
  const { t } = useLanguage();
  const vv = () => {
    console.log("tt");
  };
  return (
    <div className="flex flex-col gap-4">
      <TitleBar
        title="Orders"
        btnLabel="+ Create New order"
        onClick={() => {
          vv();
        }}
        uploadBtn={true}
      />
      <Search_input placeholder={t("Search") + "..."} />
    </div>
  );
};

export default Orders;
