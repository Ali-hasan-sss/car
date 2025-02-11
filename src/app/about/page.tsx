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

export default function About() {
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | About Us";
  }, []);
  return (
    <div>
      <Navbar />
      <CoverImage label="About Us" />
      <WellCome
        title="Welcome"
        titleDes="to Soufan Global your trusted partner"
        information="
        in the automotive industry. We specialize in providing comprehensive solutions for car auctions, vehicle shipping, and car sales, ensuring a seamless experience for our customers.
        With years of experience and a passion for innovation, we’ve established ourselves as a reliable and efficient service provider, helping individuals and businesses achieve their automotive goals with ease and confidence."
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
