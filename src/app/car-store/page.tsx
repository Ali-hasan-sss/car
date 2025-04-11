"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import CarCard from "@/components/cards/carCard";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer";
import Loader from "@/components/loading/loadingPage";
const RegisterPage = () => {
  const [cars, setCars] = useState<[]>([]);
  const [loadingPage, setLoadingPage] = useState(false);
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
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-full">
        <h1 className=" p-4 enimat_title">Cars Store</h1>
      </div>
      {loadingPage ? (
        <Loader />
      ) : (
        <div className="px-[10px] md:px-[50px] py-[50px] flex flex-wrap gap-20 w-full  justify-center ">
          {cars.map((car, index) => (
            <CarCard
              car={car}
              key={index}
              isloagedin={false}
              onDelete={() => console.log("d")}
              onEdit={() => console.log("d")}
            />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RegisterPage;
