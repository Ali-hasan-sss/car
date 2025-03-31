// "use client";
// import Btn_borded from "@/components/buttons/btn/bordered_btn";
// import Checkbox from "@/components/inputs/checkBox";
// import Chooser from "@/components/inputs/chooser";
// import FullTextInput from "@/components/inputs/full_text_inbut";
// import Text_selector from "@/components/inputs/selectors/text_selector";
// import Text_input from "@/components/inputs/Text_input";
// import VIN_input from "@/components/inputs/VIN_input";
// import FileUploder from "@/components/uploders/Uploader/UploadFile";
// import { useState } from "react";

// interface ShippingFormInputs {
//   commodity: string;
//   finalPort: string;
//   pickupRequired: string; // جديد: للتخزين إذا كان الاستلام مطلوبًا
//   consolidateShipment: string; // جديد: للتخزين إذا كان الشحن مشتركًا
//   make: string;
//   model: string;
//   year: string;
//   vehicle: string;
//   vehhicelDate: string;
//   Consignee: string;
//   useType: string;
//   packageType: string;
//   Pieces: string;
//   dimension: string;
//   length: string;
//   height: string;
//   width: string;
// }

// /*interface ShippingProps {
//   close: () => void;
// }*/

// export default function ShippingForm() {
//   const PortOptions = [
//     { value: "masqat", label: "Masqat" },
//     { value: "SUV", label: "SUV" },
//     { value: "truck", label: "Truck" },
//   ];

//   const [formData, setFormData] = useState<ShippingFormInputs>({
//     commodity: "",
//     finalPort: "",
//     pickupRequired: "", // جديد: القيمة الأولية فارغة
//     consolidateShipment: "", // جديد: القيمة الأولية فارغة
//     make: "",
//     model: "",
//     year: "",
//     vehicle: "",
//     vehhicelDate: "",
//     Consignee: "",
//     useType: "",
//     packageType: "",
//     Pieces: "",
//     dimension: "",
//     length: "",
//     height: "",
//     width: "",
//   });

//   //const [previewUrls, setPreviewUrls] = useState<string[]>([]);

//   // تحديث الحالة بناءً على المفتاح والقيمة
//   const handleInputChange = <T extends keyof ShippingFormInputs>(
//     key: T,
//     value: ShippingFormInputs[T]
//   ): void => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   /* التعامل مع اختيار الملفات
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       const files = Array.from(event.target.files);
//       setFormData((prev) => ({ ...prev, images: files }));
//       const urls = files.map((file) => URL.createObjectURL(file));
//       setPreviewUrls(urls);
//     }
//   };*/
//   /*
//   // إرسال البيانات
//   const handleSubmit = () => {
//     console.log("Form Data Submitted:", formData);
//   };*/

//   return (
//     <div className="flex flex-col gap-[20px] p-[10px]">
//       {/* العنوان */}
//       <div className="flex items-center justify-start gap-1">
//         <img src="/images/information.png" alt="info" className="w-[20px]" />
//         <h2 className="text-text_title text-2xl font-bold">
//           General Information
//         </h2>
//       </div>

//       {/* حقل نوع السلعة */}
//       <div className="flex flex-col w-full items-start gap-3 pb-4 border-b">
//         <p className="text-text_des text-start font-bold text-lg">
//           Please select commodity type and sale origin of your order.
//         </p>
//         <FullTextInput
//           label="Commodity type"
//           id="1"
//           placeHolder="Vehicle"
//           value={formData.commodity}
//           onChange={(e) => handleInputChange("commodity", e.target.value)}
//         />
//       </div>

//       {/* الأسئلة الاختيارية */}
//       <div className="flex flex-col w-full items-start gap-4">
//         <p className="text-text_title text-start font-bold text-xl">
//           General Delivery and Shipping Information
//         </p>
//         <p className="text-text_des text-start text-xl">
//           Please select additional information for your order.
//         </p>

//         {/* السؤال الأول: هل تحتاج إلى استلام الطلب؟ */}
//         <Chooser
//           question="Do you require pickup for your order? *"
//           option1="Yes"
//           value1="yes"
//           option2="No, I will arrange it myself"
//           value2="no"
//           value={formData.pickupRequired} // القيمة الحالية
//           onChange={(value) => handleInputChange("pickupRequired", value)} // تحديث الحالة
//         />

//         {/* السؤال الثاني: هل تريد توحيد الشحنة؟ */}
//         <Chooser
//           question="Would you like to consolidate your shipment? *"
//           option1="Yes - shared container"
//           value1="yes"
//           option2="No - separate container"
//           value2="no"
//           value={formData.consolidateShipment} // القيمة الحالية
//           onChange={(value) => handleInputChange("consolidateShipment", value)} // تحديث الحالة
//         />
//       </div>

//       {/* اختيار الموانئ */}
//       <div className="flex flex-col w-full items-start gap-4">
//         <p className="text-text_title text-start font-bold text-xl">
//           What is the final port of the order?
//         </p>
//         <div className="selector">
//           <label>Final port *</label>
//           <Text_selector
//             options={PortOptions}
//             placeholder="Select"
//             value={formData.finalPort}
//             onChange={(value) => handleInputChange("finalPort", value)}
//           />
//         </div>
//         <Checkbox label="In transit to final destination" />
//         <div className="bg-text_des h-[1px] w-full"></div>
//       </div>
//       <div className="flex mt-4 flex-col w-full items-start gap-4">
//         <div className="flex items-center justify-start gap-1">
//           <img
//             src="/images/information_sec.png"
//             alt="info"
//             className="w-[20px]"
//           />
//           <h2 className="text-text_title text-2xl font-bold">
//             Commodity information
//           </h2>
//         </div>
//         <p className="text-text_des text-start font-bold text-lg">
//           Please provide details about your commodities and their shipping{" "}
//         </p>
//         <VIN_input />
//       </div>
//       <div className="flex mt-4  justify-center w-full items-center gap-4">
//         <Text_input
//           placeholder="Enter"
//           value={formData.make}
//           onChange={(e) => e.target.value}
//           label="Make*"
//         />
//         <Text_input
//           placeholder="Enter"
//           value={formData.model}
//           onChange={(e) => e.target.value}
//           label="Model**"
//         />
//         <Text_input
//           placeholder="Enter"
//           value={formData.year}
//           onChange={(e) => e.target.value}
//           label="Year*"
//         />
//       </div>
//       <div className="bg-text_des h-[1px] w-full"></div>

//       <div className="flex w-1/4 justify-start  items-center gap-4">
//         <Text_input
//           labelIkon="USD"
//           value={formData.vehicle}
//           onChange={(e) => e.target.value}
//           label="Vehicle value*"
//           placeholder="Enter"
//         />
//       </div>
//       <div className="flex  w-1/4 justify-start  items-center gap-4">
//         <Text_selector
//           label="Vehicle purchase date"
//           value={formData.vehhicelDate}
//           placeholder="Select"
//           onChange={(value) => handleInputChange("vehhicelDate", value)}
//           options={PortOptions}
//         />
//       </div>
//       <div className="flex  w-1/3 justify-start  items-center gap-4">
//         <FileUploder
//           onFileUpload={() => console.log("done")}
//           label="Upload bill of sale in .pdf format *"
//         />
//       </div>
//       <div className="flex  w-1/3 justify-start  items-center gap-4">
//         <FileUploder
//           label="Upload original title in .pdf format"
//           onFileUpload={() => console.log("done")}
//         />
//       </div>
//       <div className="bg-text_des h-[1px] w-full"></div>
//       <div className="flex  w-1/4 justify-start  items-center gap-4">
//         <Text_selector
//           label="Consignee *"
//           value={formData.Consignee}
//           placeholder="Select"
//           onChange={(value) => handleInputChange("Consignee", value)}
//           options={PortOptions}
//         />
//       </div>
//       <p className="text-text_title text-start font-bold text-xl"></p>
//       <Chooser
//         question="Please select end use type *"
//         option1="Personal use"
//         value1="Personal"
//         option2="Resale/Wholesale/Business related use"
//         value2="Business"
//         value={formData.useType}
//         onChange={(value) => handleInputChange("useType", value)}
//       />
//       <Checkbox label="Apply consignee and end use type to all vehicles" />
//       <div className="w-1/4 flex items-center gap-2">
//         <Btn_borded
//           label="Add package"
//           className="bg-transparent"
//           iconAdd={true}
//         ></Btn_borded>
//       </div>
//       <div className="bg-text_des h-[1px] w-full"></div>
//       <div className="flex items-center justify-start gap-2">
//         <img src="/images/box.png" alt="info" className="w-[20px]" />
//         <h2 className="text-text_title text-2xl font-bold">
//           Package information
//         </h2>
//       </div>
//       <p className="text-text_des text-start font-bold text-lg">
//         Please provide details about your packages{" "}
//       </p>
//       <p className="text-text_title text-start font-bold text-xl">Package 1</p>
//       <div className="flex flex-col items-start w-full">
//         <div className="flex items-start gap-4 w-full">
//           <Text_selector
//             label="Package type *"
//             value={formData.packageType}
//             options={PortOptions}
//             onChange={(value) => handleInputChange("packageType", value)}
//             placeholder="Package type *"
//           />
//           <Text_input
//             label="Pieces *"
//             value={formData.Pieces}
//             onChange={(e) => e.target.value}
//             placeholder="Pieces *"
//           />
//         </div>
//         <label className="mt-4 text-text_des">Description</label>
//         <textarea
//           placeholder="Enter"
//           className="w-full rounded p-2 border border-gray-400 h-[70px]"
//         />
//         <div className="flex w-full mt-4 items-center justify-between gap-3">
//           <Text_selector
//             placeholder="Select"
//             label="Dimension unit"
//             options={PortOptions}
//             value={formData.dimension}
//             onChange={(value) => handleInputChange("packageType", value)}
//           />
//           <Text_input
//             value={formData.length}
//             onChange={(e) => e.target.value}
//             label="Length*"
//             placeholder="Enter"
//           />
//           <Text_input
//             value={formData.width}
//             onChange={(e) => e.target.value}
//             label="Width*"
//             placeholder="Enter"
//           />
//           <Text_input
//             value={formData.height}
//             onChange={(e) => e.target.value}
//             label="Height*"
//             placeholder="Enter"
//           />
//         </div>
//         <div className="flex w-full mt-4 items-center  gap-3">
//           <div className="w-1/3">
//             <Text_selector
//               placeholder="Select"
//               label="Weight unit"
//               options={PortOptions}
//               value={formData.dimension}
//               onChange={(value) => handleInputChange("packageType", value)}
//             />
//           </div>
//           <div className="w-1/3">
//             <Text_input
//               value={formData.length}
//               onChange={(e) => e.target.value}
//               label="Item weightt"
//               placeholder="Enter"
//             />
//           </div>
//           <h3 className="text-text_title text-xl mt-4 ">Total weight: -</h3>
//         </div>
//         <div className="flex w-full mt-4 items-center gap-3">
//           <div className="w-1/3">
//             <Text_input
//               value={formData.length}
//               onChange={(e) => e.target.value}
//               label="Item value"
//               placeholder="Enter"
//             />
//           </div>
//           <h3 className="text-text_title text-xl mt-4 ">Total value: -</h3>
//         </div>
//         <div className="w-1/4 flex mt-4 items-center gap-2">
//           <Btn_borded
//             label="Add another package"
//             className="bg-transparent"
//             iconAdd={true}
//           ></Btn_borded>
//         </div>
//       </div>
//     </div>
//   );
// }
