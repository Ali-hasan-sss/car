"use client";
import Checkbox from "@/components/inputs/checkBox";
import Chooser from "@/components/inputs/chooser";
import Text_selector from "@/components/inputs/selectors/text_selector";
import Text_input from "@/components/inputs/Text_input";
import FileUploder from "@/components/uploders/Uploader/UploadFile";
import { useEffect, useState } from "react";
import {
  CarfaxOptions,
  CarStatusOptions,
  driveSystemOPtions,
  ExteriorColor,
  fuelTypeOptions,
  InteriorColor,
  location_port,
  mileageOptions,
  NumberOfCylinders,
  TransmissionTypeOptions,
} from "../data";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import DainamicSelector from "@/components/inputs/selectors/DainamicSelector";
import { fetchManufacturers } from "@/store/slice/manufacturerSlice";
//import LoadingBTN from "@/components/loading/loadingBTN";
import { addCarShipping, updateCarShipping } from "@/store/slice/ShippingSlice";
import { ShippingFormInputs } from "@/Types/AuctionTypes";

interface ShippingProps {
  initialData?: ShippingFormInputs | null;
  close: () => void;
  onSubmit: (data: ShippingFormInputs) => void;
}

export default function ShippingForm({ initialData, onSubmit }: ShippingProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [models, setModels] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { manufacturers, status } = useSelector(
    (state: RootState) => state.manufacturer
  );
  const [manufacturerLoading, setManufacturerLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const yearOfMade = Array.from({ length: 30 }, (_, i) => {
    const yearString = (currentYear - i).toString();
    return { value: yearString, label: yearString };
  });
  useEffect(() => {
    if (status === "idle") {
      setManufacturerLoading(true);
      dispatch(fetchManufacturers());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      setManufacturerLoading(false);
    }
  }, [status]);
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      // تحميل الكاتيجوري والموديل بناءً على البيانات
      const selectedManufacturer = manufacturers.find(
        (m) => m.id === initialData.manufacturer
      );
      if (selectedManufacturer?.categories) {
        setCategories(selectedManufacturer.categories);
      }
    }
  }, [initialData, manufacturers]);
  const [formData, setFormData] = useState<ShippingFormInputs>({
    manufacturer: null,
    is_pickup: 1, // استلام الشحنة
    is_consolidate: 1, // توحيد الشحنة
    final_port: "", // الميناء النهائي
    in_transit: 1, // في الطريق
    vin: "", // رقم الهيكل
    cmodel_id: null, // موديل السيارة
    category_id: null, // الفئة
    year: "", // سنة الصنع
    mileage: "", // عدد الأميال
    drive_system: null, // نظام الدفع
    transmission_type: null, // ناقل الحركة
    cylinders: null, // عدد الأسطوانات
    fuel_type: null, // نوع الوقود
    price: "", // السعر
    ex_color: "",
    in_color: "",
    images: [],
    shipping_from: "", // الشحن من
    car_status: null, // حالة السيارة
    location_of_car: null, // موقع السيارة
    car_fax: null, // تقرير السيارة (CarFax)
    commodity_type: "vehicle", // نوع السلعة
    bill_pdf: "", // فاتورة الشراء (PDF أو رابط)
    title_pdf: "", // بيان الملكية (PDF أو رابط)
    consignee: "", // اسم المستلم
    apply_consignee: 0, // بيانات المستلم الرسمية
    use_type: 0, // نوع الاستخدام
  });
  const handleManufacturerChange = (value: number | null) => {
    setFormData((prev) => ({
      ...prev,
      manufacturer: value,
      category_id: null,
      cmodel_id: null,
    }));

    const selectedManufacturer = manufacturers.find((m) => m.id === value);
    if (selectedManufacturer?.categories) {
      setCategories(selectedManufacturer.categories);
    } else {
      setCategories([]);
    }
  };

  const handleCategoryChange = (value: number | null) => {
    setFormData((prev) => ({
      ...prev,
      category_id: value,
      cmodel_id: null,
    }));

    const selectedCategory = categories.find((c) => c.id === value);
    if (selectedCategory && selectedCategory.cmodels) {
      setModels(selectedCategory.cmodels);
    } else {
      setModels([]);
    }
  };
  const handleModelChange = (value: number | null) => {
    setFormData((prev) => ({
      ...prev,
      cmodel_id: value,
    }));
  };
  const handleInputChange = <T extends keyof ShippingFormInputs>(
    key: T,
    value: ShippingFormInputs[T]
  ): void => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.manufacturer)
      newErrors.manufacturer = "يرجى اختيار الشركة المصنعة.";
    if (!formData.category_id) newErrors.category_id = "يرجى اختيار الموديل.";
    if (!formData.year) newErrors.year = "يرجى تحديد سنة الصنع.";
    if (!formData.transmission_type)
      newErrors.transmission_type = "يرجى تحديد نوع ناقل الحركة.";
    if (!formData.drive_system)
      newErrors.drive_system = "يرجى اختيار نظام الدفع.";
    if (!formData.fuel_type) newErrors.fuel_type = "يرجى تحديد نوع الوقود.";
    if (!formData.cylinders) newErrors.cylinders = "يرجى تحديد عدد الأسطوانات.";
    if (!formData.price) newErrors.price = "يرجى إدخال سعر.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // إرسال البيانات
  const handleSubmit = async () => {
    try {
      if (initialData?.id) {
        // ✅ تعديل
        if (validateForm()) {
          await dispatch(
            updateCarShipping({
              apiUrl: "customer/car-shippings",
              id: initialData.id,
              updatedData: formData,
            })
          );
        } else return;
      } else {
        // ✅ إضافة
        if (validateForm()) {
          await dispatch(
            addCarShipping({
              apiUrl: "customer/car-shippings",
              carShippingData: formData,
            })
          );
        } else return;
      }
      // ✅ تحديث الحالة في المكون الأب
      onSubmit(formData);
      close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-[20px] p-[10px]">
      {/* العنوان */}
      <div className="flex items-center justify-start gap-1">
        <img src="/images/information.png" alt="info" className="w-[20px]" />
        <h2 className="text-text_title text-2xl font-bold">
          General Information
        </h2>
      </div>

      <div className="flex flex-col w-full items-start gap-4">
        <p className="text-text_title text-start font-bold text-xl">
          General Delivery and Shipping Information
        </p>
        <p className="text-text_des text-start text-xl">
          Please select additional information for your order.
        </p>
        <div className="selector">
          <label>Commodity Type *</label>
          <Text_selector
            options={[{ value: "vehicle", label: "Vehicle" }]}
            placeholder="Vehicle"
            value={formData.commodity_type}
            onChange={(value) =>
              handleInputChange("commodity_type", String(value))
            }
          />
        </div>

        {/* السؤال الأول: هل تحتاج إلى استلام الطلب؟ */}
        <Chooser
          question="Do you require pickup for your order? *"
          option1="Yes"
          value1={1}
          option2="No, I will arrange it myself"
          value2={0}
          value={formData.is_pickup} // القيمة الحالية
          onChange={(value) => handleInputChange("is_pickup", Number(value))} // تحديث الحالة
        />

        {/* السؤال الثاني: هل تريد توحيد الشحنة؟ */}
        <Chooser
          question="Would you like to consolidate your shipment? *"
          option1="Yes - shared container"
          value1={1}
          option2="No - separate container"
          value2={0}
          value={formData.is_consolidate} // القيمة الحالية
          onChange={(value) =>
            handleInputChange("is_consolidate", Number(value))
          } // تحديث الحالة
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
            options={location_port}
            placeholder="Select"
            value={formData.final_port}
            onChange={(value) => handleInputChange("final_port", String(value))}
          />
        </div>
        <Checkbox
          label="In transit to final destination"
          checkedValue={1}
          uncheckedValue={0}
          onChange={(val) => handleInputChange("in_transit", Number(val))}
        />
        <div className="bg-text_des h-[1px] w-full"></div>
      </div>
      <div className="flex mt-4 flex-col w-full items-start gap-4">
        <div className="flex items-center justify-start gap-1">
          <img
            src="/images/information_sec.png"
            alt="info"
            className="w-[20px]"
          />
          <h2 className="text-text_title text-2xl font-bold">
            Commodity information
          </h2>
        </div>
        <p className="text-text_des text-start font-bold text-lg">
          Please provide details about your commodities and their shipping{" "}
        </p>
        <div className="flex flex-wrap items-center justify-between  gap-[15px]">
          <div className="selector">
            <label>Car Manufacturer:</label>
            <DainamicSelector
              placeholder="BMW , Audi , kia ..."
              data={manufacturers}
              value={formData.manufacturer}
              onChange={handleManufacturerChange}
              //  error={errors.manufacturer}
              dataLoading={manufacturerLoading}
            />
          </div>
          <div className="selector">
            <label>Car Model:</label>
            <DainamicSelector
              data={categories}
              value={formData.category_id}
              onChange={handleCategoryChange}
              // error={errors.category_id}
            />
          </div>
          <div className="selector">
            <label>Category:</label>
            <DainamicSelector
              data={models}
              value={formData.cmodel_id}
              onChange={handleModelChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between  gap-[15px]">
          <div className="selector">
            <label>Year of Manufacture:</label>
            <Text_selector
              options={yearOfMade}
              placeholder="2018"
              value={formData.year}
              onChange={(value) => handleInputChange("year", String(value))}
              //error={errors.year}
            />
          </div>
          <div className="selector">
            <label> Drive System:</label>
            <Text_selector
              options={driveSystemOPtions}
              placeholder="auto..."
              value={formData.drive_system}
              onChange={(value) =>
                handleInputChange("drive_system", Number(value))
              }
              // error={errors.drive_system}
            />
          </div>
          <div className="selector">
            <label>Number of Cylinders:</label>
            <Text_selector
              options={NumberOfCylinders}
              placeholder="4,6,8..."
              value={formData.cylinders}
              onChange={(value) =>
                handleInputChange("cylinders", Number(value))
              }
              //    error={errors.cylinders}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between  gap-[15px]">
          <div className="selector">
            <label>Transmission Type:</label>
            <Text_selector
              options={TransmissionTypeOptions}
              placeholder="Manual..."
              value={formData.transmission_type}
              onChange={(value) =>
                handleInputChange("transmission_type", Number(value))
              }
              //error={errors.transmission_type}
            />
          </div>
          <div className="selector">
            <label>Fuel Type</label>
            <Text_selector
              options={fuelTypeOptions}
              placeholder="Petrol..."
              value={formData.fuel_type}
              onChange={(value) =>
                handleInputChange("fuel_type", Number(value))
              }
              //  error={errors.fuel_type}
            />
          </div>
          <div className="selector">
            <label>Exterior Color:</label>
            <Text_selector
              options={ExteriorColor}
              placeholder="white..."
              value={formData.ex_color}
              onChange={(value) => handleInputChange("ex_color", String(value))}
              error={errors.ex_color}
            />
          </div>
          <div className="selector">
            <label>Interior Color: </label>
            <Text_selector
              options={InteriorColor}
              placeholder="white..."
              value={formData.in_color}
              onChange={(value) => handleInputChange("in_color", String(value))}
              error={errors.in_color}
            />
          </div>
          <div className="selector">
            <label>Car Status</label>
            <Text_selector
              options={CarStatusOptions}
              placeholder="New..,Used.."
              value={formData.car_status}
              onChange={(value) =>
                handleInputChange("car_status", Number(value))
              }
              //     error={errors.car_status}
            />
          </div>
          <div className="selector">
            <label>Mileage:</label>
            <Text_selector
              options={mileageOptions}
              placeholder="50000 KM"
              value={formData.mileage}
              onChange={(value) => handleInputChange("mileage", String(value))}
              //  error={errors.mileage}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between  gap-[15px]">
          <div className="selector">
            <label>Price</label>
            <Text_input
              placeholder="2000 RO"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              //   error={errors.price}
            />
          </div>
          <div className="selector">
            <label>VIN NO</label>
            <Text_input
              placeholder="VIN..."
              value={formData.vin}
              onChange={(e) => handleInputChange("vin", e.target.value)}
              //   error={errors.price}
            />
          </div>
          <div className="selector">
            <label>Location of car</label>
            <DainamicSelector
              Api_URL="customer/countries?is_shown_auction=1"
              placeholder="Canada"
              value={formData.location_of_car}
              onChange={(value) => handleInputChange("location_of_car", value)}
            />
          </div>
          <div className="selector">
            <label>Shipping from</label>
            <Text_selector
              options={[{ value: "torento", label: "Torento" }]}
              placeholder="Port Shipping"
              value={formData.shipping_from}
              onChange={(value) =>
                handleInputChange("shipping_from", String(value))
              }
              //  error={errors.mileage}
            />
          </div>
          <div className="py-[10px] w-full md:w-2/5">
            <label className="mb-1 block font-semibold">Carfax</label>
            <Text_selector
              options={CarfaxOptions}
              placeholder="Available or Not available"
              value={formData.car_fax}
              onChange={(value) => handleInputChange("car_fax", Number(value))}
            />
          </div>
        </div>
      </div>

      <div className="flex  md:w-1/3 justify-start  items-center gap-4">
        <FileUploder
          onFileUpload={(fileName) =>
            setFormData((prev) => ({ ...prev, bill_pdf: fileName }))
          }
          label="Upload bill of sale in .pdf format *"
        />
      </div>
      <div className="flex  md:w-1/3 justify-start  items-center gap-4">
        <FileUploder
          label="Upload original title in .pdf format"
          onFileUpload={(fileName) =>
            setFormData((prev) => ({ ...prev, title_pdf: fileName }))
          }
        />
      </div>
      <div className="py-[10px] w-full md:w-2/5">
        <label className="mb-1 block font-semibold">Carfax</label>
        <Text_selector
          options={CarfaxOptions}
          placeholder="Available or Not available"
          value={formData.apply_consignee}
          onChange={(value) =>
            handleInputChange("apply_consignee", Number(value))
          }
        />
      </div>
      {formData.apply_consignee === 1 && (
        <div className="flex  md:w-1/2 justify-start  items-center gap-4">
          <FileUploder
            onFileUpload={(fileName) =>
              setFormData((prev) => ({ ...prev, consignee: fileName }))
            }
            label="Upload consignee details id or passport file* "
          />
        </div>
      )}
      <p className="text-text_title text-start font-bold text-xl"></p>
      <Chooser
        question="Please select end use type *"
        option1="Personal use"
        value1={0}
        option2="Resale/Wholesale/Business related use"
        value2={1}
        value={formData.use_type}
        onChange={(value) => handleInputChange("use_type", Number(value))}
      />
      <div className="flex flex-wrap actions w-full gap-[10px] mt-4 py-4 items-center justify-between">
        <button
          className="button_bordered w-[200px] py-3 border-primary1 text-primary1 hover:bg-primary1 hover:text-light"
          onClick={close}
        >
          Cancel
        </button>
        <button
          className="button_outline w-[200px] py-3 bg-primary1 hover:bg-transparent hover:border-primary1 hover:text-black text-light"
          onClick={handleSubmit}
        >
          {/* {loading ? <LoadingBTN /> : "Save Car Details"} */}Save Car
          Details
        </button>
      </div>
    </div>
  );
}
