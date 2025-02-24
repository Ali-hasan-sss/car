"use client";

import React from "react";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer";
import CoverImage from "@/components/Hero_general/cover_image";
import WellCome from "@/components/Hello_section/wellcome";
import InfoCard from "@/components/cards/info_card";
import Btn_outlin from "@/components/buttons/btn/outline_btn";

const ServicesPage: React.FC = () => {
  const worksItem = [
    {
      image: "images/hummer.png",
      title: "Car Auctions",
      des: "Register on our platform to access a wide range of vehicles. Place your bids on the cars of your choice. Complete the purchase and receive assistance with delivery.",
    },
    {
      image: "images/carSipping.png",
      title: "Car Auctions",
      des: "Provide us with the details of the vehicle and destination. Choose from our flexible shipping options. Track your shipment and receive the vehicle at the agreed time and location.",
    },
    {
      image: "images/carSelling.png",
      title: "Car Auctions",
      des: "Register on our platform to access a wide range of vehicles. Place your bids on the cars of your choice. Complete the purchase and receive assistance with delivery.",
    },
  ];
  const trustItems = [
    {
      image: "images/glass.png",
      title: "Transparency",
      des: "Clear processes and no hidden fees.",
    },
    {
      image: "images/true.png",
      title: "Professionalism",
      des: "A team of experts dedicated to serving you.",
    },
    {
      image: "images/Group.png",
      title: "Security",
      des: "Full insurance coverage for car shipments and transactions.",
    },
    {
      image: "images/headphons.png",
      title: "Customer Support",
      des: "24/7 assistance to address all your inquiries.",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="">
        <div className="flex bg-secondary1 flex-col items-center justify-center pb-[50px] ">
          <CoverImage label="Our Information" />{" "}
          <WellCome
            title="Welcome"
            titleDes="to Soufan Global your trusted partner"
            information="for all your automotive needs. We specialize in providing a seamless
          experience for customers looking to buy, sell, or ship vehicles
          locally and internationally. Below, you’ll find essential information
          about how our services work and what you can expect when working with
          us."
          />
        </div>
        <div className="flex mt-[20px] bg-white flex-col items-start justify-center pb-[50px] gap-[50px]">
          <div className="flex  flex-col items-start justify-center px-[50px] gap-[50px]">
            <div className="  flex flex-col items-start gap-4 ">
              <div className="header ">
                <h3 className="title">Who We Are</h3>
              </div>
              <p className="text-xl text-text_des">
                At Soufan Global, we are passionate about cars and committed to
                delivering exceptional services. With years of expertise in the
                automotive industry, we aim to simplify every aspect of buying,
                selling, and shipping vehicles. Our professional team ensures
                that every step of the process is smooth, secure, and tailored
                to your needs.
              </p>
            </div>
            <div className="  flex flex-col items-start gap-4 ">
              <div className="header ">
                <h3 className="title">What We Do</h3>
              </div>
              <p className="text-xl text-text_des">
                We provide a variety of services, including :{" "}
              </p>
              <p className="text-xl text-text_des">
                {" "}
                Car Auctions : A reliable platform where you can bid on and win
                your dream car.
              </p>
              <p className="text-xl text-text_des">
                Vehicle Shipping : Safe and timely delivery of vehicles across
                borders or within the country.
              </p>
              <p className="text-xl text-text_des">
                {" "}
                Car Sales : Helping you sell your vehicle efficiently and at the
                best possible price
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-[50px] bg-secondary1 py-[50px]">
        <h1 className="title">How it works</h1>
        <div className="flex flex-wrap items-center justify-center gap-[20px] ">
          {worksItem.map((item, index) => (
            <InfoCard
              key={index}
              height="300"
              width="300"
              image={item.image}
              title={item.title}
              des={item.des}
            />
          ))}
        </div>
        <img src="/images/Vector.png" alt="victor" className="w-2/3 py-1" />
        <Btn_outlin
          onClick={() => {
            console.log("start");
          }}
          label="Start Now"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-[50px] bg-white py-[50px]">
        <h1 className="title">Why Trust Us?</h1>
        <div className="flex flex-wrap items-center justify-center gap-[20px] ">
          {trustItems.map((item, index) => (
            <InfoCard
              key={index}
              height="300"
              width="250"
              image={item.image}
              title={item.title}
              des={item.des}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
