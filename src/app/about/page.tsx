"use client";

import "./style.css";
import About_section1 from "./section1";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer";
import { useEffect } from "react";
import CoverImage from "@/components/Hero_general/cover_image";
import WellCome from "@/components/Hello_section/wellcome";
import Whay_us from "./whayUs";
import OurValues from "./ourValues";
import End_Section from "./section_end";
import Our_services from "./section2";
import { useLanguage } from "../../context/LanguageContext";

export default function About() {
  const { t, isArabic } = useLanguage();
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | About Us";
  }, []);
  return (
    <div>
      <Navbar />
      <CoverImage label={t("About_Us")} />
      <WellCome
        title={isArabic ? "مرحباً بك" : "Welcome"}
        titleDes={
          isArabic
            ? "في Soufan Global شريكك الموثوق"
            : "to Soufan Global your trusted partner"
        }
        information={
          isArabic
            ? "في قطاع السيارات. نحن متخصصون في تقديم حلول شاملة للمزادات، وشحن المركبات، وبيع السيارات، لضمان تجربة سلسة ومريحة لعملائنا. بفضل سنوات من الخبرة وشغفنا بالابتكار، رسّخنا مكانتنا كمزود خدمات موثوق وفعّال، نساعد الأفراد والشركات على تحقيق أهدافهم في عالم السيارات بكل سهولة وثقة."
            : "in the automotive industry. We specialize in providing comprehensive solutions for car auctions, vehicle shipping, and car sales, ensuring a seamless experience for our customers. With years of experience and a passion for innovation, we’ve established ourselves as a reliable and efficient service provider, helping individuals and businesses achieve their automotive goals with ease and confidence."
        }
      />

      <About_section1 />
      <Our_services />
      <Whay_us />
      <OurValues />
      <End_Section />
      <Footer />
    </div>
  );
}
