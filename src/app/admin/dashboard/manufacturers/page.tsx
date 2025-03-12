"use client";
import GeneralTable, { Column } from "@/components/table";
import React, { useState } from "react";

const CarTypes: React.FC = () => {
  const columns: Column[] = [
    { id: "title", label: "الماركة", languageDisplay: "en" },
  ];

  const apiUrl = "admin/manufacturers";

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

export default CarTypes;
