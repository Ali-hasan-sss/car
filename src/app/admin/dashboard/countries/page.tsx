"use client";
import GeneralTable, { Column } from "@/components/table";
import { useState } from "react";

const CountryList = () => {
  const apiUrl = "admin/countries";
  const columns: Column[] = [
    { id: "title", label: "البلد", languageDisplay: "en" },
    { id: "code", label: "الرمز البريدي", languageDisplay: "en" },
  ];
  const [actions] = useState({
    edit: true,
    add: true,
    delete: true,
  });
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">أنواع السيارات</h1>
      <GeneralTable
        title="انواع السيارات"
        AddButtonLabel="اضافة نوع جديد"
        columns={columns}
        apiUrl={apiUrl}
        actions={actions}
      />
    </div>
  );
};

export default CountryList;
