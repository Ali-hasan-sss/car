"use client";
import "./dashboard.css";
import { useState } from "react";
import { Modal, Box } from "@mui/material";

import { useLanguage } from "@/context/LanguageContext";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, isArabic } = useLanguage();
  const services = [
    {
      title: "Auctions",
      des: "Bid on your favourite cars with ease",
      key: "Auctions",
      link: "/customer/dashboard/auction",
    },
    {
      title: "Shipping",
      des: "Track your shipping progress easily",
      key: "Shipping",
      link: "/customer/dashboard/shipping",
    },
    {
      title: "Sales",
      des: "Sell and buy cars effortlessly",
      key: "Sell",
      link: "/customer/dashboard/salles",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-[60px]">
      <div className="w-full flex flex-col items-start gap-[10px]">
        <h3 className="title text-gray-800">
          {isArabic
            ? "مرحبا بك في لوحة تحكم خدمات السيارات !"
            : "Welcome to Your Car Services Dashboard !"}
        </h3>
        <p className="heading_des text-gray-400">
          {isArabic
            ? "اختر خدمة من الخدمات أدناه للبدء: إدارة المزادات، تتبع الشحن، أو بيع وشراء السيارات بسهولة."
            : "Select a service below to get started: manage auctions, track shipping  or buy and sell cars with ease."}
        </p>
      </div>
      <div className="services_boxs flex items-center justify-center py-[10px] gap-[20px] flex-wrap">
        {services.map((service) => (
          <div
            onClick={() => {
              window.location.replace(service.link);
            }}
            key={service.key}
            className="box flex flex-col items-center justify-center gap-[20px] py-[20px] px-[15px] cursor-pointer"
          >
            <h4 className="title text-gray-800">{t(service.title)}</h4>
            <p className="heading_des text-gray-400">{service.des}</p>
          </div>
        ))}
      </div>

      <Modal
        open={isModalOpen}
        className="madal"
        onClose={() => setIsModalOpen(false)}
      >
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
        ></Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
