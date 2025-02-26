"use client";

import Footer from "@/components/footer";
import ContactForm from "@/components/forms/contact_form";
import Navbar from "@/components/header/navbar";
import CoverImage from "@/components/Hero_general/cover_image";
import Follow_us from "@/components/sucial_Midia/follow_us";
import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-secondary1">
        <div className="flex flex-col items-center justify-center pb-[50px] gap-[50px]">
          {/* Header Image */}
          <CoverImage label="Contact Us" />
          {/* Description */}
          <div className="flex flex-col items-center justify-center px-[50px] gap-[50px]">
            <div>
              <div className="text-xl text-text_des">
                At{" "}
                <span className="text-2xl font-bold text-text_title">
                  Soufan Global
                </span>
                , we are always here to help! Whether you have questions about
                our services, need assistance with your car auction, shipping,
                or sales, or just want to learn more about what we offer, feel
                free to get in touch with us.
                <p className="text-2xl font-bold text-text_title mt-[30px]">
                  {" "}
                  Our Contact Details
                </p>{" "}
                Phone:[Insert phone number] <br />
                Email: [Insert email address] <br />
                Office Address: [Insertfull office address]
                <p className="text-2xl font-bold text-text_title mt-[30px]">
                  {" "}
                  Business Hours
                </p>{" "}
                We’re available to serve you during the following hours:
                <ul className="list-disc pl-5 text-xl text-text_des">
                  <li> Monday – Friday: 9:00 AM – 6:00 PM</li>
                  <li> Saturday: 10:00 AM – 4:00 PM</li>
                  <li> Sunday: Closed</li>
                </ul>
              </div>
              <p className="text-xl text-text_title ">
                With years of experience and a dedicated team, we strive to
                deliver top-notch services backed by cutting-edge technology and
                global standards, ensuring our customers enjoy a seamless and
                satisfying experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ContactForm />
      <Follow_us />
      <div className="flex flex-col gap-[10px] py-[20px] px-[50px]">
        <h2 className="title">Visit US</h2>
        <p className="text-text_des text-xl">
          Stay connected with us on social media to get updates, news, and
          special offers:
        </p>
        <p className="text-text_des text-xl">
          We welcome you to visit our office during business hours to discuss
          your automotive needs in person. Our friendly team will be happy to
          assist you!
          <br /> Address:
          <br />
          [Insert office address with map or directions link]
          <br /> Let’s connect and drive forward together!
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
