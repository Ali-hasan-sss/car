"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer";
import CoverImage from "@/components/Hero_general/cover_image";
import WellCome from "@/components/Hello_section/wellcome";
import Btn_outlin from "@/components/buttons/btn/outline_btn";
import InfoCard_cust from "@/components/cards/info_cardcust";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

const ServicesPage: React.FC = () => {
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | Info";
  }, []);
  const worksItem = [
    {
      image: "images/hummer.png",
      title: { ar: "مزادات السيارات", en: "Car Auctions" },
      des: {
        ar: "سجّل في منصتنا للوصول إلى مجموعة واسعة من السيارات، وابدأ بالمزايدة على السيارة التي ترغب بها، وأكمل عملية الشراء مع دعم كامل لعملية التسليم.",
        en: "Register on our platform to access a wide range of vehicles. Place your bids on the cars of your choice. Complete the purchase and receive assistance with delivery.",
      },
    },
    {
      image: "images/carSipping.png",
      title: { ar: "شحن السيارات", en: "Car Shipping" },
      des: {
        ar: "زوّدنا بتفاصيل السيارة والوجهة المطلوبة، واختر من خيارات الشحن المتاحة، وتتبع الشحنة حتى استلام السيارة في الوقت والمكان المحددين.",
        en: "Provide us with the details of the vehicle and destination. Choose from our flexible shipping options. Track your shipment and receive the vehicle at the agreed time and location.",
      },
    },
    {
      image: "images/carSelling.png",
      title: { ar: "بيع السيارات", en: "Car Selling" },
      des: {
        ar: "سجّل في منصتنا للوصول إلى مجموعة واسعة من المشترين، اعرض سيارتك بسهولة، واستفد من دعمنا لإتمام عملية البيع بنجاح.",
        en: "Register on our platform to access a wide range of buyers. List your car easily and get support to complete the sale successfully.",
      },
    },
  ];

  const trustItems = [
    {
      image: "images/glass.png",
      title: { ar: "الشفافية", en: "Transparency" },
      des: {
        ar: "إجراءات واضحة دون أي رسوم خفية.",
        en: "Clear processes and no hidden fees.",
      },
    },
    {
      image: "images/true.png",
      title: { ar: "الاحترافية", en: "Professionalism" },
      des: {
        ar: "فريق من الخبراء المكرّسين لخدمتك.",
        en: "A team of experts dedicated to serving you.",
      },
    },
    {
      image: "images/Group.png",
      title: { ar: "الأمان", en: "Security" },
      des: {
        ar: "تغطية تأمينية شاملة لشحنات ومعاملات السيارات.",
        en: "Full insurance coverage for car shipments and transactions.",
      },
    },
    {
      image: "images/headphons.png",
      title: { ar: "دعم العملاء", en: "Customer Support" },
      des: {
        ar: "مساعدة متوفرة على مدار الساعة للإجابة على جميع استفساراتك.",
        en: "24/7 assistance to address all your inquiries.",
      },
    },
  ];
  const { isArabic, t } = useLanguage();
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <div className="">
        <div className="flex bg-secondary1 flex-col items-center justify-center pb-[50px] ">
          <CoverImage label={isArabic ? "" : "Our Information"} />
          <WellCome
            title={isArabic ? "مرحبا" : "Welcome"}
            titleDes={
              isArabic
                ? "في سوفان جلوبال، شريكك الموثوق"
                : "to Soufan Global your trusted partner"
            }
            information={
              isArabic
                ? "لكل ما يتعلق باحتياجاتك في عالم السيارات. نحن متخصصون في تقديم تجربة سلسة للعملاء الراغبين في شراء أو بيع أو شحن المركبات محليًا ودوليًا. في الأسفل ستجد معلومات أساسية حول كيفية عمل خدماتنا وما يمكنك توقعه عند التعامل معنا."
                : "for all your automotive needs. We specialize in providing a seamless experience for customers looking to buy, sell, or ship vehicles locally and internationally. Below, you’ll find essential information about how our services work and what you can expect when working with us."
            }
          />
        </div>
        <div className="flex mt-[20px] bg-white flex-col items-start justify-center pb-[50px] gap-[50px]">
          <div className="flex  flex-col items-start justify-center px-[50px] gap-[50px]">
            <div className="  flex flex-col items-start gap-4 ">
              <div className="header ">
                <h3 className="text-3xl font-bold">
                  {isArabic ? "من نحن" : "Who We Are"}
                </h3>
              </div>
              <p className="text-lg text-text_des">
                {isArabic
                  ? "في سوفان جلوبال، نحن شغوفون بالسيارات وملتزمون بتقديم خدمات استثنائية. بخبرات تمتد لسنوات في صناعة السيارات، نهدف إلى تبسيط كل جوانب شراء وبيع وشحن المركبات. يضمن فريقنا المحترف أن تكون كل خطوة في العملية سلسة وآمنة ومصممة لتلبية احتياجاتك."
                  : "At Soufan Global, we are passionate about cars and committed to delivering exceptional services. With years of expertise in the automotive industry, we aim to simplify every aspect of buying, selling, and shipping vehicles. Our professional team ensures that every step of the process is smooth, secure, and tailored to your needs."}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 ">
              <div className="header ">
                <h3 className="text-3xl font-bold">
                  {isArabic ? "ماذا نقدم" : "What We Do"}
                </h3>
              </div>
              <p className="text-lg text-text_des">
                {isArabic
                  ? "نحن نقدم مجموعة متنوعة من الخدمات، بما في ذلك :"
                  : "We provide a variety of services, including :"}
              </p>
              <p className="text-xl text-text_des">
                <span className="text-black font-bold">
                  {isArabic ? "مزادات السيارات :" : " Car Auctions : "}
                </span>
                {isArabic
                  ? "منصة موثوقة تتيح لك المزايدة على سيارتك الحلم والفوز بها."
                  : "A reliable platform where you can bid on and win your dream car."}
              </p>
              <p className="text-xl text-text_des">
                <span className="text-black font-bold">
                  {isArabic ? "شحن المركبات :" : "Vehicle Shipping :"}
                </span>{" "}
                {isArabic
                  ? "توصيل آمن وفي الوقت المحدد للمركبات عبر الحدود أو داخل الدولة."
                  : "Safe and timely delivery of vehicles across borders or within the country."}
              </p>
              <p className="text-xl text-text_des">
                <span className="text-black font-bold">
                  {isArabic ? "بيع السيارات :" : " Car Sales :"}
                </span>{" "}
                {isArabic
                  ? "مساعدتك في بيع سيارتك بكفاءة وبأفضل سعر ممكن."
                  : "Helping you sell your vehicle efficiently and at the best possible price"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 bg-secondary1 py-10">
        <h1 className="title">
          {isArabic ? "كيف تعمل المنصة" : "How it works"}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-[20px] ">
          {worksItem.map((item, index) => (
            <InfoCard_cust
              key={index}
              height="300"
              width="300"
              image={item.image}
              title={item.title}
              des={item.des}
            />
          ))}
        </div>
        <Btn_outlin
          onClick={() => {
            router.push("/login");
          }}
          label={t("Start_Now")}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-1 bg-white py-10">
        <h1 className="text-3xl font-bold">
          {isArabic ? "لماذا تثق بنا؟" : "Why Trust Us?"}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-[20px] ">
          {trustItems.map((item, index) => (
            <InfoCard_cust
              key={index}
              height="300"
              width="250"
              image={item.image}
              title={item.title}
              des={item.des}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
