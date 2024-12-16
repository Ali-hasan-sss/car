"use client";

import CarDeals from "@/components/CarDeals";
import Hero from "@/components/hero/hero";
import HowItWorks from "@/components/HowItWorks";
import Store from "@/components/store";

export default function Home() {
  return (
    <div>
      <Hero />
      <Store />
      <CarDeals />
      <HowItWorks />
    </div>
  );
}
