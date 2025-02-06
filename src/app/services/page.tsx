"use client";
import React, { useState } from "react";
import Navbar from "@/components/header/navbar";
import Servic_box from "./sevice_box";
import Footer from "@/components/footer";
import CTA from "@/components/CTA";

const ServicesPage: React.FC = () => {
  // حالة لتخزين الخدمة المحددة
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // بيانات الخدمات مع تفاصيلها (تفاصيل كمكونات JSX)
  const services = [
    {
      image: "images/hummer.png",
      title: "Car Auction Services",
      details: (
        <div>
          <h3 className="text-xl font-bold mb-2">Car Auction Services :</h3>
          <p>
            Are you searching for your dream car or an opportunity to acquire a
            unique vehicle at the right price? Our car auction platform allows
            you to access a wide variety of cars, both locally and
            internationally, catering to all preferences and needs.
          </p>
          <p>What Makes Our Auction Services Stand Out?</p>
          <ul className="list-disc pl-5">
            <li>
              Full Transparency: A fair and reliable bidding system to ensure
              you get the best deal.
            </li>
            <li>
              Real-Time Updates: Instant notifications about bidding progress
              and pricing.
            </li>
            <li>
              Wide Selection: From classic to luxury cars, we offer vehicles for
              every taste.
            </li>
            <li>
              Comprehensive Support: Our team assists you every step of the way,
              from registration to car delivery.
            </li>
          </ul>
        </div>
      ),
    },
    {
      image: "images/carSelling.png",
      title: "Car Selling Services",
      details: (
        <div>
          <h3 className="text-xl font-bold mb-2">Car Selling Services :</h3>
          <p>
            If you’re looking to sell your car effortlessly and at the best
            possible price, our platform offers the ideal solution. We connect
            sellers with potential buyers quickly and efficiently.
          </p>
          <p>How We Help You Sell Your Car:</p>
          <ul className="list-disc pl-5">
            <li>
              Professional Listings: Assistance in preparing detailed and
              attractive listings with professional photos.
            </li>
            <li>
              Wide Buyer Network: Access to a large database of interested
              buyers for competitive offers.
            </li>
            <li>
              Complete Support: From negotiations to closing the deal, we guide
              you throughout the process.
            </li>
          </ul>
        </div>
      ),
    },
    {
      image: "images/carSipping.png",
      title: "Car Shipping Services",
      details: (
        <div>
          <h3 className="text-xl font-bold mb-2">Car Shipping Services</h3>
          <p>
            We understand that shipping vehicles requires utmost care. That’s
            why we offer safe, fast, and reliable car shipping services. Whether
            it’s a single vehicle or a fleet, we ensure smooth transportation to
            your desired destination.
          </p>
          <p>Key Features of Our Shipping Services:</p>
          <ul className="list-disc pl-5">
            <li>
              Customized Solutions: Flexible options tailored to your shipping
              needs, whether local or international.
            </li>
            <li>
              Global Network: Strong partnerships with leading logistics
              companies to deliver vehicles anywhere in the world.
            </li>
            <li>
              Full Insurance: All shipments are fully insured, guaranteeing the
              safety of your vehicle during transit.
            </li>
            <li>
              Timely Delivery: We ensure your car reaches its destination on
              schedule.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Section for Services */}
      <div className="bg-secondary1">
        <div className="flex flex-col items-center justify-center pb-[50px] gap-[50px]">
          {/* Header Image */}
          <img src="images/services.png" alt="services" />

          {/* Description */}
          <div className="flex flex-col items-center justify-center px-[50px] gap-[50px]">
            <div>
              <p className="text-l">
                At <span className="text-xl font-bold">Soufan Global</span>, we
                take pride in offering a comprehensive range of services
                tailored to the automotive industry. Whether you’re looking to
                bid on unique cars, ship vehicles safely and efficiently, or
                sell your car at the best price, we’ve got you covered. With
                years of experience and a dedicated team, we strive to deliver
                top-notch services backed by cutting-edge technology and global
                standards, ensuring our customers enjoy a seamless and
                satisfying experience.
              </p>
            </div>

            {/* Service Boxes */}
            <div className="items w-full flex flex-wrap items-center justify-center gap-[50px]">
              {services.map((service, index) => (
                <Servic_box
                  key={index}
                  image={service.image}
                  title={service.title}
                  isActive={selectedService === service.title} // تحديد الخدمة النشطة
                  showDetails={() => setSelectedService(service.title)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section for Service Details */}
      {selectedService && (
        <div className="flex flex-col items-start justify-start p-[50px] bg-secondary1">
          {
            services.find((service) => service.title === selectedService)
              ?.details
          }
        </div>
      )}
      <CTA
        title="Get Started with Us Today!

"
        des="Whether you’re bidding on your dream car, shipping a vehicle with care, or selling a car seamlessly, we are here to provide solutions tailored to your needs.Contact us now to learn more and take the first step toward a hassle-free automotive experience!"
        btnText="Contact Us"
      />
      {/* Footer */}
      <Footer />
    </div>
  );
};

// تصدير واحد فقط للمكون الرئيسي
export default ServicesPage;
