"use client";
import TableHeader from "@/components/DashboardComponernt/titleBar/tableHeader";
import ToolBar from "@/components/DashboardComponernt/toolbar";
import Search_input from "@/components/inputs/search_input";
import GeneralTable, { Column } from "@/components/table";
import React, { useState } from "react";

const CarTypes: React.FC = () => {
  const columns: Column[] = [
    {
      id: "name",
      label: "الاسم",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "email",
      label: "الايميل",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "contact.mobile",
      label: "رقم الهاتف",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "type",
      label: "نوع الحساب",
      languageDisplay: "en",
      includeInForm: false,
    },
  ];
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showing, setShowing] = useState(10);

  const apiUrl = "admin/users";

  const [actions] = useState({
    edit: true,
    add: true,
    delete: true,
    view: true,
  });

  return (
    <div>
      <TableHeader
        title={"المستخدمين"}
        action={{
          filter: false,
          export: true,
          add: true,
          addNewActiom: () => console.log(true),
        }}
      />
      <Search_input value={searchTerm} onChange={setSearchTerm} />
      <ToolBar
        showing={showing}
        onShowingChange={setShowing}
        totalItems={totalCount}
      />
      <GeneralTable
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
