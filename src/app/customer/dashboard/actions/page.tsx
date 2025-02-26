"use client";

import TableHeader from "@/components/headertitle/tableHeader";
//import GeneralTable from "@/components/table";

export default function Actions() {
  /*const columns = [
    { id: "id", label: "Order Id", languageDisplay: "en", type: "text" },
    {
      id: "Manufacture",
      label: "Car Manufacture",
      languageDisplay: "en",
      type: "text",
    },
    { id: "Color", label: "Car Color", languageDisplay: "en", type: "text" },
    {
      id: "Model",
      label: "Car Model Name",
      languageDisplay: "en",
      type: "text",
    },
    {
      id: "Auction_no",
      label: "Car Auction No",
      languageDisplay: "en",
      type: "text",
    },
    { id: "Statu", label: "Statu", languageDisplay: "en", type: "text" },
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
  ];*/

  return (
    <div className="fles flex-col gap-[20px]">
      <TableHeader
        title=" My List of Requests for a Car Auction"
        des="Track the status of your auction submissions below.
"
      />
      {/* <GeneralTable
        columns={columns}
        data={data}
        actions={{
          edit: true,
          delete: true,
          view: true,
        }}
        details={true}
      />*/}
    </div>
  );
}
