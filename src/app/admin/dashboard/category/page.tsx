"use client";
import GeneralTable, { Column } from "@/components/table";
import { useState } from "react";

const CategoriesList = () => {
  const apiUrl = "admin/categories";
  const columns: Column[] = [
    { id: "title", label: "الفئة", languageDisplay: "en" },
    { id: "manufacturer_id", label: "", languageDisplay: "en" },
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

export default CategoriesList;
