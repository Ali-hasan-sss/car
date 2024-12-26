"use client";

import "./style.css";
import About_header from "./header";
import About_section1 from "./section1";
import About_section2 from "./section2";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer";
import Brands from "./brands";
import Team from "./team";
import Section3 from "./section3";
import Section4 from "./section4";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | About Us";
  }, []);
  return (
    <div>
      <Navbar />
      <About_header />
      <About_section1 />
      <About_section2 />
      <Brands />
      <Team />
      <Section3 />
      <Section4 />
      <Footer />
    </div>
  );
}
