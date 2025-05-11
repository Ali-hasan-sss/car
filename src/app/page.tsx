"use client";

import CTA from "@/components/common/CTA";
import Footer from "@/components/footer";
import Gallery from "@/components/homePage/gallery";
import Navbar from "@/components/NavBar/navbar";
import Hero from "@/components/homePage/hero/hero";
import HowItWorks from "@/components/homePage/HowItWorks";
import Reviwe from "@/components/homePage/reviwe/index";
import Store from "@/components/carStore";
import Success from "@/components/homePage/SuccessNO";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    document.title = "SOUFAN GLOBAL";
  }, []);
  const { isArabic } = useLanguage();
  return (
    <div>
      <Navbar />
      <Hero />
      <Store />
      <HowItWorks />
      <Success />
      <Gallery />
      <Reviwe />
      <CTA
        title={
          isArabic
            ? "شاهد خدمات شحن السيارات لدينا على أرض الواقع!"
            : "See Our Car Shipping Services in Action!"
        }
        des={
          isArabic
            ? "احجز عرضًا توضيحيًا مخصصًا لاستكشاف كيف نبسّط استيراد وشحن السيارات. جرّب سهولة العملية بنفسك!"
            : "Book a personalized demo to explore how we simplify car imports and shipping. Experience our seamless process firsthand!"
        }
        btnText={isArabic ? "احجز عرضك الآن" : "Book Your Demo Now"}
        onClick={() => router.push("/register")}
      />

      <Footer />
    </div>
  );
}
