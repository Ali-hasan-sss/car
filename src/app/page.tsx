"use client";

import Contact from "@/components/contact";
import CTA from "@/components/CTA";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery";
import Navbar from "@/components/header/navbar";
import Hero from "@/components/hero/hero";
import HowItWorks from "@/components/HowItWorks";
import Reviwe from "@/components/reviwe/index";
import Store from "@/components/store";
import Success from "@/components/SuccessNO";
import TrackingMap from "@/components/traking";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "SOUFAN GLOBAL";
  }, []);
  return (
    <div>
      <Navbar />
      <Hero />
      <Store />
      <HowItWorks />
      <Success />
      <Reviwe />
      <Gallery />
      <Contact />
      <TrackingMap />
      <CTA
        title="See Our Car Shipping Services in Action!"
        des="Book a personalized demo to explore how we simplify car imports and
            shipping. Experience our seamless process firsthand!"
        btnText="Book Your Demo Now"
      />
      <Footer />
    </div>
  );
}
