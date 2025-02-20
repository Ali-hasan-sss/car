/*"use client";
import "./dashboard.css";
import { useState } from "react";
import { Modal, Box } from "@mui/material";
import Auctions from "./services/Auctions";
import Shipping from "./services/shipping";
import Salles from "./services/salles";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceKey, setServiceKey] = useState("");

  const services = [
    {
      title: "Auctions",
      des: "Bid on your favourite cars with ease",
      key: "Auctions",
    },
    {
      title: "Shipping",
      des: "Track your shipping progress easily",
      key: "Shipping",
    },
    {
      title: "Sell & Buy Cars",
      des: "Sell and buy cars effortlessly",
      key: "Sell",
    },
  ];

  const handleTabChange = (key: string) => {
    setServiceKey(key);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setServiceKey("");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[60px]">
      <div className="w-full flex flex-col items-start gap-[10px]">
        <h3 className="title text-gray-800">
          Welcome to Your Car Services Dashboard
        </h3>
        <p className="heading_des text-gray-400">
          Select a service below to get started: manage auctions, track
          shipping, or buy and sell cars with ease.
        </p>
      </div>
      <div className="services_boxs flex items-center justify-center py-[10px] gap-[20px] flex-wrap">
        {services.map((service) => (
          <div
            onClick={() => handleTabChange(service.key)}
            key={service.key}
            className="box flex flex-col items-center justify-center gap-[20px] py-[20px] px-[15px] cursor-pointer"
          >
            <h4 className="title text-gray-800">{service.title}</h4>
            <p className="heading_des text-gray-400">{service.des}</p>
          </div>
        ))}
      </div>

      
      <Modal open={isModalOpen} className="madal" onClose={closeModal}>
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%", // 80% من عرض الشاشة (يبقى 10% من الجوانب)
            maxWidth: "1000px", // الحد الأقصى لعرض المودال
            height: "80%", // 80% من ارتفاع الشاشة (يبقى 10% من الأعلى والأسفل)
            maxHeight: "90vh", // ضمان عدم تجاوز الشاشة
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: "8px",
            overflowY: "auto", // السماح بالتمرير عند زيادة المحتوى
            outline: "none",
          }}
        >
          {serviceKey === "Auctions" && (
            <Auctions close={() => setIsModalOpen(false)} />
          )}
          {serviceKey === "Shipping" && <Shipping />}
          {serviceKey === "Sell" && (
            <Salles close={() => setIsModalOpen(false)} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;*/
