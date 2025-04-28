"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer";
import Loader from "@/components/loading/loadingPage";
import { useLanguage } from "@/context/LanguageContext";
import CarStoreCard from "@/components/cards/car_card";
const RegisterPage = () => {
  const [cars, setCars] = useState<[]>([]);
  const [loadingPage, setLoadingPage] = useState(false);
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | Car Store";
  }, []);
  useEffect(() => {
    const fetchServices = async () => {
      setLoadingPage(true);
      try {
        const response = await axiosInstance.get("/car-sales-all");
        setCars(response.data.data);
      } catch (error) {
        console.error("فشل جلب الخدمات", error);
      } finally {
        setLoadingPage(false);
      }
    };
    fetchServices();
  }, []);
  const { isArabic } = useLanguage();
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-full">
        <h1 className=" p-4 enimat_title">
          {isArabic ? "معرض السيارات" : "Cars Store"}
        </h1>
      </div>
      {loadingPage ? (
        <Loader />
      ) : (
        <div className="px-[10px] md:px-[50px] py-[50px] flex flex-wrap gap-6 w-full ">
          {cars.map((car, index) => (
            <CarStoreCard
              car={car}
              key={index}
              isloagedin={false}
              onDelete={() => console.log("")}
              onEdit={() => console.log("")}
              onChangeStatus={() => console.log("")}
            />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RegisterPage;
