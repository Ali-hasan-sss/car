"use client";
import Chooser from "@/components/inputs/chooser";
import FullTextInput from "@/components/inputs/full_text_inbut";
import Text_selector from "@/components/inputs/selectors/text_selector";
import { useState } from "react";

interface ShippingFormInputs {
  commodity: string;
  finalPort: string;
  pickupRequired: string; // جديد: للتخزين إذا كان الاستلام مطلوبًا
  consolidateShipment: string; // جديد: للتخزين إذا كان الشحن مشتركًا
}

/*interface ShippingProps {
  close: () => void;
}*/

export default function Shipping() {
  const PortOptions = [
    { value: "masqat", label: "Masqat" },
    { value: "SUV", label: "SUV" },
    { value: "truck", label: "Truck" },
  ];

  const [formData, setFormData] = useState<ShippingFormInputs>({
    commodity: "",
    finalPort: "",
    pickupRequired: "", // جديد: القيمة الأولية فارغة
    consolidateShipment: "", // جديد: القيمة الأولية فارغة
  });

  //const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // تحديث الحالة بناءً على المفتاح والقيمة
  const handleInputChange = <T extends keyof ShippingFormInputs>(
    key: T,
    value: ShippingFormInputs[T]
  ): void => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /* التعامل مع اختيار الملفات
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setFormData((prev) => ({ ...prev, images: files }));
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };*/
  /*
  // إرسال البيانات
  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };*/

  return (
    <div className="flex flex-col gap-[20px] p-[10px]">
      {/* العنوان */}
      <div className="flex items-center justify-start gap-1">
        <img src="/images/information.png" alt="info" className="w-[20px]" />
        <h2 className="text-text_title text-2xl font-bold">
          General Information
        </h2>
      </div>

      {/* حقل نوع السلعة */}
      <div className="flex flex-col w-full items-start gap-3 pb-4 border-b">
        <p className="text-text_title text-start font-bold text-lg">
          Please select commodity type and sale origin of your order.
        </p>
        <FullTextInput
          label="Commodity type"
          id="1"
          placeHolder="Vehicle"
          value={formData.commodity}
          onChange={(e) => handleInputChange("commodity", e.target.value)}
        />
      </div>

      {/* الأسئلة الاختيارية */}
      <div className="flex flex-col w-full items-start gap-4">
        <p className="text-text_title text-start font-bold text-xl">
          General Delivery and Shipping Information
        </p>
        <p className="text-text_des text-start text-xl">
          Please select additional information for your order.
        </p>

        {/* السؤال الأول: هل تحتاج إلى استلام الطلب؟ */}
        <Chooser
          question="Do you require pickup for your order? *"
          option1="Yes"
          value1="yes"
          option2="No, I will arrange it myself"
          value2="no"
          value={formData.pickupRequired} // القيمة الحالية
          onChange={(value) => handleInputChange("pickupRequired", value)} // تحديث الحالة
        />

        {/* السؤال الثاني: هل تريد توحيد الشحنة؟ */}
        <Chooser
          question="Would you like to consolidate your shipment? *"
          option1="Yes - shared container"
          value1="yes"
          option2="No - separate container"
          value2="no"
          value={formData.consolidateShipment} // القيمة الحالية
          onChange={(value) => handleInputChange("consolidateShipment", value)} // تحديث الحالة
        />
      </div>

      {/* اختيار الموانئ */}
      <div className="flex flex-col w-full items-start gap-4">
        <p className="text-text_title text-start font-bold text-xl">
          What is the final port of the order?
        </p>
        <div className="selector">
          <label>Final port *</label>
          <Text_selector
            options={PortOptions}
            placeholder="Select"
            value={formData.finalPort}
            onChange={(value) => handleInputChange("finalPort", value)}
          />
        </div>
      </div>
    </div>
  );
}
