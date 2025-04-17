"use client";

import CTA from "@/components/CTA";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery";
import Navbar from "@/components/header/navbar";
import Hero from "@/components/hero/hero";
import HowItWorks from "@/components/HowItWorks";
import Reviwe from "@/components/reviwe/index";
import Store from "@/components/store";
import Success from "@/components/SuccessNO";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
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
      <CTA
        title="See Our Car Shipping Services in Action!"
        des="Book a personalized demo to explore how we simplify car imports and
            shipping. Experience our seamless process firsthand!"
        btnText="Book Your Demo Now"
        onClick={() => router.push("/register")}
      />
      <Footer />
    </div>
  );
}
