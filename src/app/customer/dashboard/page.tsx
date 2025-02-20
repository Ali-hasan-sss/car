"use client";
import TitleBar from "@/components/DashboardComponernt/titleBar";
import "./dashboard.css";
import Search_input from "@/components/inputs/search_input";
import GeneralFilter from "@/components/DashboardComponernt/filters/generalFilter";
import QuickFilter from "@/components/DashboardComponernt/filters/quickFillter";
import ToolBar from "@/components/DashboardComponernt/toolbar";
import GeneralTable from "@/components/table";

const Dashboard = () => {
  const columns = [
    { id: "id", label: "Order Id" },
    { id: "Statu", label: "Statu" },
    { id: "VIN", label: "VIN" },
    { id: "lot_no", label: "LOT No" },
    { id: "Description", label: "Description" },
    { id: "Buyer_code", label: "Buyer code" },
  ];

  const data = [
    {
      id: "TEST23122024",
      Statu: "New",
      VIN: "WBSPM9C52BE20****",
      lot_no: "00125400",
      Description: "KIA v2024",
      Buyer_code: "0000001452",
    },
    {
      id: "TEST23152027",
      Statu: "Old",
      VIN: "WBSPM9C52BE80****",
      lot_no: "00125700",
      Description: "BMW v2024",
      Buyer_code: "0050001952",
    },
  ];
  return (
    <div className="flex flex-col items-center w-full  gap-[10px]">
      <TitleBar title="Orders" btnLabel="+ Create New order" uploadBtn={true} />
      <Search_input />
      <GeneralFilter label="Filter & Sort Control" />
      <QuickFilter />
      <ToolBar />
      <div className="bg-white w-full p-4">
        <GeneralTable
          columns={columns}
          data={data}
          actions={{
            edit: true,
            delete: true,
            view: true,
            share: true,
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
