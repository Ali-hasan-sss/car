"use client";

import Text_selector from "@/components/inputs/selectors/text_selector";
import Text_input from "@/components/inputs/Text_input";
import { useEffect, useState } from "react";
import {
  driveSystemOPtions,
  ExteriorColor,
  fuelTypeOptions,
  InteriorColor,
  NumberOfCylinders,
  ShippingOption,
  TransmissionTypeOptions,
  budgetOptions,
} from "../data";
import DainamicSelector from "@/components/inputs/selectors/DainamicSelector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchManufacturers } from "@/store/slice/manufacturerSlice";
import Budget_selector from "@/components/inputs/selectors/budget_selector";
import {
  addAuction,
  selectAuctionsLoading,
  updateAuction,
} from "@/store/slice/AuctionsSlice";
import { AuctionsFormInputs } from "@/Types/AuctionTypes";
import LoadingBTN from "@/components/loading/loadingBTN";

interface AuctionsProps {
  close: () => void;
  initialData?: AuctionsFormInputs | null;
  onSubmit: (data: AuctionsFormInputs) => void;
}

export default function Auctions({
  close,
  initialData,
  onSubmit,
}: AuctionsProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  // const [models, setModels] = useState<any[]>([]);

  const [formData, setFormData] = useState<AuctionsFormInputs>({
    auction_link: "",
    manufacturer: null,
    category_id: null,
    year: "",
    shipping_from: "",
    transmission_type: 1,
    drive_system: 1,
    fuel_type: 1,
    cylinders: 4,
    country_id: null,
    from_budget: "",
    to_budget: "",
    shipping_option: 1,
    car_status: "",
    ex_color: "",
    in_color: "",
  });
  const currentYear = new Date().getFullYear();
  const yearOfMade = Array.from({ length: 30 }, (_, i) => {
    const yearString = (currentYear - i).toString();
    return { value: yearString, label: yearString };
  });

  const dispatch = useDispatch<AppDispatch>();
  const { manufacturers, status } = useSelector(
    (state: RootState) => state.manufacturer
  );
  const loading = useSelector(selectAuctionsLoading);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.auction_link) {
      // إذا لم يكن هناك رابط، تحقق من جميع الحقول الأخرى
      if (!formData.manufacturer)
        newErrors.manufacturer = "يرجى اختيار الشركة المصنعة.";
      if (!formData.category_id) newErrors.category_id = "يرجى اختيار الموديل.";
      if (!formData.year) newErrors.year = "يرجى تحديد سنة الصنع.";
      if (!formData.transmission_type)
        newErrors.transmission_type = "يرجى تحديد نوع ناقل الحركة.";
      if (!formData.drive_system)
        newErrors.drive_system = "يرجى اختيار نظام الدفع.";
      if (!formData.fuel_type) newErrors.fuel_type = "يرجى تحديد نوع الوقود.";
      if (!formData.cylinders)
        newErrors.cylinders = "يرجى تحديد عدد الأسطوانات.";
      if (!formData.from_budget || !formData.to_budget)
        newErrors.budget = "يرجى إدخال الميزانية.";
      if (!formData.shipping_option)
        newErrors.shipping_option = "يرجى اختيار خيار الشحن.";
      if (!formData.ex_color)
        newErrors.ex_color = "يرجى تحديد لون السيارة الخارجي.";
      if (!formData.in_color)
        newErrors.in_color = "يرجى تحديد لون السيارة الداخلي.";
      if (!formData.country_id) newErrors.country_id = "يرجى تحديد بلد الوجهة.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // ✅ تحميل البيانات في حالة التعديل
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
  };
  const handleInputChange = <T extends keyof AuctionsFormInputs>(
    key: T,
    value: string | number
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (initialData?.id) {
        // ✅ تعديل
        if (validateForm()) {
          await dispatch(
            updateAuction({
              apiUrl: "customer/car-auctions",
              id: initialData.id,
              updatedData: formData,
            })
          );
        } else return;
      } else {
        // ✅ إضافة
        if (validateForm()) {
          await dispatch(
            addAuction({
              apiUrl: "customer/car-auctions",
              auctionData: formData,
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
  const [manufacturerLoading, setManufacturerLoading] = useState(false);

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

  return (
    <div className="flex w-full flex-col gap-[16px] px-[15px]">
      <div className="heading_form flex item-center justify-center">
        <h2 className="title">Select a Car for Auction</h2>
      </div>
      <Text_input
        value={formData.auction_link}
        id="link"
        placeholder="https://www.copart.com/dashboard"
        label="Please Enter Car Auction Link"
        onChange={(e) => handleInputChange("auction_link", e.target.value)}
      />
      <div className="flex items-center justify-between">
        <div className="w-1/2 flex items-center justify-start">
          <hr className="w-full text-gray-400" />
        </div>
        <div className="w-[50px] flex items-center justify-center">
          <p className="text-lg text-center w-[15px] text-gray-400">or</p>
        </div>
        <div className="w-1/2 flex items-center justify-end">
          <hr className="w-full text-gray-400" />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between  gap-[10px]">
        <div className="selector">
          <label>Car Manufacturer:</label>
          <DainamicSelector
            placeholder="BMW , Audi , kia ..."
            data={manufacturers}
            value={formData.manufacturer}
            onChange={handleManufacturerChange}
            error={errors.manufacturer}
            dataLoading={manufacturerLoading}
          />
        </div>
        <div className="selector">
          <label>Car Model:</label>
          <DainamicSelector
            placeholder="choes Manufacturer first"
            data={categories}
            value={formData.category_id}
            onChange={handleCategoryChange}
            error={errors.category_id}
          />
        </div>
        <div className="selector">
          <label>Year of Manufacture:</label>
          <Text_selector
            options={yearOfMade}
            placeholder="2018"
            value={formData.year}
            onChange={(value) => handleInputChange("year", value)}
            error={errors.year}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-[10px]">
        <div className="selector">
          <label>Transmission Type:</label>
          <Text_selector
            options={TransmissionTypeOptions}
            placeholder="Manual..."
            value={formData.transmission_type}
            onChange={(value) => handleInputChange("transmission_type", value)}
            error={errors.transmission_type}
          />
        </div>
        <div className="selector">
          <label> Drive System:</label>
          <Text_selector
            options={driveSystemOPtions}
            placeholder="FWD..."
            value={formData.drive_system}
            onChange={(value) => handleInputChange("drive_system", value)}
            error={errors.drive_system}
          />
        </div>
        <div className="selector">
          <label> Fuel Type:</label>
          <Text_selector
            options={fuelTypeOptions}
            placeholder="Petrole...."
            value={formData.fuel_type}
            onChange={(value) => handleInputChange("fuel_type", value)}
            error={errors.fuel_type}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-[10px]">
        <div className="selector">
          <label>Number of Cylinders:</label>
          <Text_selector
            options={NumberOfCylinders}
            placeholder="4,6,8,12..."
            value={formData.cylinders}
            onChange={(value) => handleInputChange("cylinders", value)}
            error={errors.cylinders}
          />
        </div>
        <div className="selector">
          <label>Budget Range (From - To):</label>
          <Budget_selector
            from_budget={formData.from_budget}
            to_budget={formData.to_budget}
            options={budgetOptions}
            placeholder={{ from: "From", to: "To" }}
            onFromChange={(value) => handleInputChange("from_budget", value)}
            onToChange={(value) => handleInputChange("to_budget", value)}
            error={errors.budget}
          />
        </div>
        <div className="selector">
          <label>Shipping Option: </label>
          <Text_selector
            options={ShippingOption}
            placeholder="container..."
            value={formData.shipping_option}
            onChange={(value) => handleInputChange("shipping_option", value)}
            error={errors.shipping_option}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-[10px]">
        <div className="selector">
          <label>Exterior Color:</label>
          <Text_selector
            options={ExteriorColor}
            placeholder="white..."
            value={formData.ex_color}
            onChange={(value) => handleInputChange("ex_color", value)}
            error={errors.ex_color}
          />
        </div>
        <div className="selector">
          <label>Interior Color: </label>
          <Text_selector
            options={InteriorColor}
            placeholder="white..."
            value={formData.in_color}
            onChange={(value) => handleInputChange("in_color", value)}
            error={errors.in_color}
          />
        </div>
        <div className="selector">
          <label>Shipping Destination Country:</label>
          <DainamicSelector
            placeholder="Canada"
            value={formData.country_id}
            onChange={(value) =>
              setFormData({ ...formData, country_id: value })
            }
            Api_URL="customer/countries?is_shown_auction=1"
            error={errors.country_id}
          />
        </div>
      </div>
      <div className="flex flex-wrap actions w-full gap-[10px] mt-4 py-4 items-center justify-between">
        <button className="py-1 px-2 button_bordered" onClick={close}>
          Cancel
        </button>
        <button
          className="py-1 px-2 flex items-center justify-center button_outline"
          onClick={handleSubmit}
        >
          {loading ? <LoadingBTN /> : "Send Car Order"}
        </button>
      </div>
    </div>
  );
}
