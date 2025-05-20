"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/NavBar/navbar";
import Section3 from "../../components/AboutPage/section3";
import Section4 from "../../components/AboutPage/section4";
import About_header from "../../components/AboutPage/header";
import About_section1 from "../../components/AboutPage/section1";
import About_section2 from "../../components/AboutPage/section2";

export default function About() {
  return (
    <div>
      <Navbar />
      <About_header />
      <About_section1 />
      <About_section2 />
      <Section3 />
      <Section4 />
      <Footer />
    </div>
  );
}
