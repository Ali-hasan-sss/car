"use client";
import ToolBar from "@/components/common/toolbar";
import Search_input from "@/components/inputs/search_input";
import GeneralTable, { Column } from "@/components/table";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

const CountryList = () => {
  const { t } = useLanguage();
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
    <div className="w-full">
      <Search_input value={searchTerm} onChange={setSearchTerm} />

      <ToolBar
        showing={showing}
        onShowingChange={setShowing}
        totalItems={totalCount}
      />
      <GeneralTable
        title={t("countries")}
        AddButtonLabel={t("add_new_country")}
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
