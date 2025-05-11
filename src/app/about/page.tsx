"use client";

import "./style.css";
import Footer from "@/components/footer";
import Navbar from "@/components/NavBar/navbar";
import Section3 from "./section3";
import Section4 from "./section4";
import About_header from "./header";
import About_section1 from "./section1";
import About_section2 from "./section2";

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
