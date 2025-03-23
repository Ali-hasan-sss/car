"use client";
import ToolBar from "@/components/DashboardComponernt/toolbar";
import Search_input from "@/components/inputs/search_input";
import GeneralTable, { Column } from "@/components/table";
import React, { useState } from "react";

const CarTypes: React.FC = () => {
  const columns: Column[] = [
    {
      id: "title",
      label: "الماركة",
      languageDisplay: "en",
      includeInForm: true,
    },
  ];

  const apiUrl = "admin/manufacturers";
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showing, setShowing] = useState(10);
  const [actions] = useState({
    edit: true,
    add: true,
    delete: true,
    view: true,
  });

  return (
    <div>
      <Search_input value={searchTerm} onChange={setSearchTerm} />

      <ToolBar
        showing={showing}
        onShowingChange={setShowing}
        totalItems={totalCount}
      />
      <GeneralTable
        title="انواع السيارات"
        AddButtonLabel="اضافة نوع جديد"
        columns={columns}
        apiUrl={apiUrl}
        actions={actions}
        onTotalCountChange={setTotalCount}
        showing={showing}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default CarTypes;
