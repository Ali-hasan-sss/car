"use client";

import CarDetails from "@/components/DashboardComponernt/ordersDetails/CarDetails";
import Footer from "@/components/footer";
import Navbar from "@/components/NavBar/navbar";

export default function Car() {
  return (
    <>
      <Navbar />

      <CarDetails isStore />

      <Footer />
    </>
  );
}
