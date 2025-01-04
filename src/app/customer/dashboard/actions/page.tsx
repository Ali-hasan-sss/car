"use client";

import TableHeader from "@/components/headertitle/tableHeader";
import GeneralTable from "@/components/table";

export default function Actions() {
  const columns = [
    { id: "id", label: "Order Id" },
    { id: "Manufacture", label: "Car Manufacture" },
    { id: "Color", label: "Car Color" },
    { id: "Model", label: "Car Model Name" },
    { id: "Auction_no", label: "Car Auction No" },
    { id: "Statu", label: "Statu" },
  ];

  const data = [
    {
      id: "TEST23122024",
      Manufacture: "German",
      Color: "blue",
      Model: "KIA",
      Auction_no: "SLD123456789",
      Statu: "Active",
    },

    {
      id: "TEST23122024",
      Manufacture: "German",
      Color: "blue",
      Model: "KIA",
      Auction_no: "SLD123456789",
      Statu: "Active",
    },

    {
      id: "TEST23122024",
      Manufacture: "German",
      Color: "red",
      Model: "BMW",
      Auction_no: "SLD123456789",
      Statu: "Active",
    },
    {
      id: "TEST853122024",
      Manufacture: "German",
      Color: "white",
      Model: "Huondai",
      Auction_no: "SLD123456789",
      Statu: "Active",
    },
    {
      id: "TEST731220544",
      Manufacture: "German",
      Color: "blue",
      Model: "KIA",
      Auction_no: "SLD123456789",
      Statu: "Active",
    },
    {
      id: "TEST23122024",
      Manufacture: "German",
      Color: "blue",
      Model: "KIA",
      Auction_no: "SLD123456789",
      Statu: "Active",
    },
  ];
  return (
    <div className="fles flex-col gap-[20px]">
      <TableHeader
        title=" My List of Requests for a Car Auction"
        des="Track the status of your auction submissions below.
"
      />
      <GeneralTable
        columns={columns}
        data={data}
        actions={{
          edit: true,
          delete: true,
          view: true,
        }}
        details={true}
      />
    </div>
  );
}
