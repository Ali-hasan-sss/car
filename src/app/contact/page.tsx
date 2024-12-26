"use client";

import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

// نوع البيانات المطلوبة لإرسال النموذج
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { isDarkMode, isArabic } = useContext(AppContext);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // دالة لتحديث الحقول في النموذج
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // دالة لإرسال النموذج
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكنك إضافة منطق إرسال النموذج مثل إرسال الطلب إلى API
    setFormSubmitted(true);
  };

  return (
    <div
      className={`p-4 min-h-screen ${isDarkMode ? "dark-bg-2" : "light-bg-2"}`}
    >
      <h1 className="text-center text-2xl font-bold mb-6">
        {isArabic ? "اتصل بنا" : "Contact Us"}
      </h1>

      {formSubmitted ? (
        <div className="text-center text-green-500">
          <p>
            {isArabic
              ? "تم إرسال رسالتك بنجاح!"
              : "Your message was sent successfully!"}
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={`max-w-lg mx-auto p-5 shadow rounded ${
            isDarkMode ? "dark-bg" : "light-bg"
          }`}
        >
          {/* حقل الاسم */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium">
              {isArabic ? "الاسم" : "Name"}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`input mt-1 p-2 rounded-md w-full  ${
                isDarkMode ? "dark-bg-2" : "light-bg-2"
              }`}
            />
          </div>

          {/* حقل البريد الإلكتروني */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium">
              {isArabic ? "البريد الإلكتروني" : "Email"}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`input mt-1 p-2 rounded-md w-full  ${
                isDarkMode ? "dark-bg-2" : "light-bg-2"
              }`}
            />
          </div>

          {/* حقل الرسالة */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-medium">
              {isArabic ? "الرسالة" : "Message"}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className={`input mt-1 p-2 rounded-md w-full  ${
                isDarkMode ? "dark-bg-2" : "light-bg-2"
              }`}
              rows={4}
            ></textarea>
          </div>

          {/* زر إرسال */}
          <div className="text-center">
            <button
              type="submit"
              className={` text-white py-2 px-4 rounded-md w-full ${
                isDarkMode ? "send-btn-dark" : "send-btn-light"
              }`}
            >
              {isArabic ? "إرسال" : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactPage;
