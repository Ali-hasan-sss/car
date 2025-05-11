"use client";
import ToolBar from "@/components/common/toolbar";
import Search_input from "@/components/inputs/search_input";
import GeneralTable, { Column } from "@/components/table";
import { useState } from "react";

const CountryList = () => {
  const apiUrl = "admin/countries";
  const columns: Column[] = [
    { id: "title", label: "البلد", languageDisplay: "en" },
    { id: "code", label: "الرمز البريدي", languageDisplay: "en" },
  ];
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showing, setShowing] = useState(10);
  const [actions] = useState({
    edit: true,
    add: true,
    delete: true,
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
        AddButtonLabel="اضافة بلد جديد"
        columns={columns}
        actionLoading={[]}
        apiUrl={apiUrl}
        actions={actions}
        onTotalCountChange={setTotalCount}
        showing={showing}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default CountryList;
