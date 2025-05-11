"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/NavBar/navbar";
import CoverImage from "@/components/common/cover_image";
import { useEffect } from "react";

export default function Faq() {
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | FAQ";
  }, []);
  const Faqs = [
    {
      Q: "How do I participate in the car auction?",
      A: "Simply create an account on our platform, verify your information, and you’re ready to start bidding!",
    },
    {
      Q: "Are the vehicles inspected before shipping?",
      A: "Yes, we ensure every vehicle is thoroughly inspected to meet quality and safety standards.",
    },
    {
      Q: "How long does it take to ship a car internationally?",
      A: "Shipping times vary depending on the destination and shipping method, but we always strive to deliver as quickly as possible.",
    },
    {
      Q: "Can you help me find a buyer for my car?",
      A: "Absolutely! We’ll list your vehicle and connect you with potential buyers from our network.",
    },
  ];
  return (
    <div>
      <Navbar />
      <div>
        <CoverImage label="FAQS" />
        <div className="flex flex-col py-[20px] px-[50px]">
          <h1 className="secondarytitle">Frequently Asked Questions (FAQs)</h1>
          {Faqs.map((faq, index) => (
            <div key={index} className="my-2 text-text_des">
              <p>Q:{faq.Q}</p>
              <p>A:{faq.A}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
