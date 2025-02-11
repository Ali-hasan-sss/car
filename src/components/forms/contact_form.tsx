"use client";
import React, { useState } from "react";
import "./form_style.css";
import Text_input from "../inputs/full_text_inbut";
import Textarea from "../inputs/Textarea";
import Btn_outlin from "../buttons/btn/outline_btn";

interface ContactFormData {
  name: string;
  phoneNumber: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phoneNumber: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("Sending data to the server:", formData);

      const response = await fetch("https://your-api-endpoint.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Message sent successfully!");
        alert("Your message has been sent successfully!");
        setFormData({
          name: "",
          phoneNumber: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        console.error("Failed to send message.");
        alert("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="py-[25px] px-[50px] bg-white">
      <div className="flex flex-col gap-[20px]">
        <h1 className="title text-text_title">Online Inquiry Form</h1>
        <p className="text-text_des text-xl">
          If you have any questions or need specific information, please fill
          out the below, and one of our representatives will get back to you
          promptly.
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-[20px]"
        >
          <div className="w-full flex items-center justify-between">
            <Text_input
              name="name"
              placeHolder="Your Name *"
              onChange={handleChange}
              value={formData.name}
            />
            <Text_input
              name="email"
              placeHolder="Your Email *"
              onChange={handleChange}
              value={formData.email}
            />
            <Text_input
              name="phoneNumber"
              placeHolder="Phone Number *"
              onChange={handleChange}
              value={formData.phoneNumber}
            />
            <Text_input
              name="subject"
              placeHolder="Subject *"
              onChange={handleChange}
              value={formData.subject}
            />
          </div>
          <div>
            <Textarea
              name="message"
              className="message"
              placeholder="Your Message"
              onChange={handleChange}
              value={formData.message}
            />
          </div>
          <div className="flex items-center justify-end w-full">
            <Btn_outlin
              label="Send Message"
              onclick={() => {
                console.log(formData);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
