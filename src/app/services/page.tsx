"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/NavBar/navbar";
import Servic_box from "./sevice_box";
import Footer from "@/components/footer";
import CTA from "@/components/common/CTA";
import CoverImage from "@/components/common/cover_image";
import { useLanguage } from "../../context/LanguageContext";
import axiosInstance from "@/utils/axiosInstance";
import Loader from "@/components/loading/loadingPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchServicesUserSuccess } from "@/store/slice/servicesCustomer";

const ServicesPage: React.FC = () => {
  const { t, isArabic } = useLanguage();
  const [loadingPage, setLoadingPage] = useState(false);
  const dispatch = useDispatch();
  const services = useSelector(
    (state: RootState) => state.servicesUser.servicesList
  );
  const lastUpdated = useSelector(
    (state: RootState) => state.servicesUser.lastUpdated
  );
  const [lastLang, setLastLang] = useState(isArabic);
  const shouldFetch = () => {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    return (
      now - lastUpdated > fiveMinutes ||
      services.length === 0 ||
      isArabic !== lastLang
    );
  };

  useEffect(() => {
    document.title = "SOUFAN GLOBAL | Services";
  }, []);

  useEffect(() => {
    if (shouldFetch()) {
      const fetchServices = async () => {
        setLoadingPage(true);
        try {
          const response = await axiosInstance.get("/customer/services");
          dispatch(fetchServicesUserSuccess(response.data.data));
          setLastLang(isArabic);
        } catch (error) {
          console.error("فشل جلب الخدمات", error);
        } finally {
          setLoadingPage(false);
        }
      };
      fetchServices();
    }
  }, [isArabic]);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Section for Services */}
      <div className="bg-secondary1">
        <div className="flex flex-col items-center justify-center pb-[50px] gap-[50px]">
          {/* Header Image */}
          <CoverImage label={t("Our_Services")} />

          {/* Description */}
          <div className="flex flex-col items-center justify-center px-[50px] gap-[50px]">
            <div>
              <p className="text-lg text-text_des">
                {isArabic ? "في" : "At"}
                <span className="text-xl font-bold text-text_title">
                  Soufan Global
                </span>
                ,{" "}
                {isArabic
                  ? "، نفخر بتقديم مجموعة شاملة من الخدمات المصممة خصيصًا لقطاع السيارات. سواء كنت ترغب في المزايدة على سيارات مميزة، أو شحن مركبتك بأمان وكفاءة، أو بيع سيارتك بأفضل سعر، فنحن هنا لخدمتك."
                  : "we take pride in offering a comprehensive range of services tailored to the automotive industry. Whether you’re looking to bid on unique cars, ship vehicles safely and efficiently, or sell your car at the best price, we’ve got you covered."}
              </p>
              <p className="text-xl text-text_des ">
                {isArabic
                  ? "بفضل سنوات من الخبرة وفريق متخصص، نسعى لتقديم خدمات عالية الجودة مدعومة بأحدث التقنيات والمعايير العالمية، لضمان تجربة سلسة ومرضية لعملائنا."
                  : "With years of experience and a dedicated team, we strive to deliver top-notch services backed by cutting-edge technology and global standards, ensuring our customers enjoy a seamless and satisfying experience."}
              </p>
            </div>

            {/* Service Boxes */}
            {loadingPage ? (
              <Loader />
            ) : (
              <div className="items w-full flex flex-wrap items-center justify-center gap-[50px]">
                {services
                  .filter((service) => typeof service.title === "string")
                  .map((service, index) => (
                    <Servic_box
                      key={index}
                      image={service.image}
                      title={service.title}
                      isActive={selectedService === service.title}
                      showDetails={() => setSelectedService(service.title)}
                      hideDetails={() => setSelectedService(null)}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section for Service Details */}
      {selectedService && (
        <>
          <div className="flex flex-col items-start justify-start px-[50px] bg-secondary1">
            {
              services.find((service) => service.title === selectedService)
                ?.body
            }
          </div>
          <div className="flex flex-col items-start justify-start px-[50px] bg-secondary1">
            {
              services.find((service) => service.title === selectedService)
                ?.description
            }
          </div>
        </>
      )}

      {/* CTA Section */}
      <CTA
        title={t("servises_CTA_Title")}
        des={t("servises_CTA_Body")}
        btnText={t("Contact_Us")}
        onClick={() => window.location.replace("/contact")}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServicesPage;
