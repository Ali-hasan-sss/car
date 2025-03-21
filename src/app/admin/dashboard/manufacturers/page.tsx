"use client";
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

  const [actions] = useState({
    edit: true,
    add: true,
    delete: true,
    view: true,
  });

  return (
    <div>
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
