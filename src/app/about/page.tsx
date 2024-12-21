import "./style.css";
import About_header from "./header";
import About_section1 from "./section1";
import About_section2 from "./section2";
import { Metadata } from "next";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer";
import Brands from "./brands";
import Team from "./team";
export const metadata: Metadata = {
  title: "SOUFAN GLOBAL | About Us",
};
export default function About() {
  return (
    <div>
      <Navbar />
      <About_header />
      <About_section1 />
      <About_section2 />
      <Brands />
      <Team />
      <Footer />
    </div>
  );
}
