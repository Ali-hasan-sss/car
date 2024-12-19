"use client";

import CarDeals from "@/components/CarDeals";
import Contact from "@/components/contact";
import CTA from "@/components/CTA";
import Gallery from "@/components/gallery";
import Hero from "@/components/hero/hero";
import HowItWorks from "@/components/HowItWorks";
import Reviwe from "@/components/reviwe/index";
import Store from "@/components/store";
import Success from "@/components/SuccessNO";

export default function Home() {
  return (
    <div>
      <Hero />
      <Store />
      <CarDeals />
      <HowItWorks />
      <Success />
      <Reviwe />
      <Gallery />
      <Contact />
      <CTA />
    </div>
  );
}
