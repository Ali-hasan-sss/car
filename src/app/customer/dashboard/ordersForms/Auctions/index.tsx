"use client";

import Text_selector from "@/components/inputs/selectors/text_selector";
import Text_input from "@/components/inputs/Text_input";
import { useEffect, useState } from "react";
import {
  mileageOptions,
  driveSystemOPtions,
  ExteriorColor,
  CarStatusOptions,
  fuelTypeOptions,
  InteriorColor,
  NumberOfCylinders,
  ShippingOption,
  TransmissionTypeOptions,
  yearOfMade,
  budgetOptions,
} from "../data";
import DainamicSelector from "@/components/inputs/selectors/DainamicSelector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchManufacturers } from "@/store/slice/manufacturerSlice";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import Budget_selector from "@/components/inputs/selectors/budget_selector";
import { fetchTableData } from "@/store/slice/tableDataSlice";

interface AuctionsFormInputs {
  auction_link: string;
  manufacturer: number | null;
  cmodel_id: number | null;
  category_id: number | null;
  mileage: string;
  year: string;
  transmission_type: string;
  drive_system: string;
  fuel_type: string;
  cylinders: string;
  from_budget: string;
  country_id: number | null;
  to_budget: string;
  shipping_option: string;
  car_status: string;
  ex_color: string;
  in_color: string;
  destinationCountry: string;
  shipping_from: string;
}
interface AuctionsProps {
  close: () => void;
}
export default function Auctions({ close }: AuctionsProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [models, setModels] = useState<any[]>([]);

  const [formData, setFormData] = useState<AuctionsFormInputs>({
    auction_link: "",
    manufacturer: null,
    category_id: null,
    cmodel_id: null,
    mileage: "",
    year: "",
    shipping_from: "",
    transmission_type: "",
    drive_system: "",
    fuel_type: "",
    cylinders: "",
    country_id: null,
    from_budget: "",
    to_budget: "",
    shipping_option: "",
    car_status: "",
    ex_color: "",
    in_color: "",
    destinationCountry: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const { manufacturers, status } = useSelector(
    (state: RootState) => state.manufacturer
  );

  const handleManufacturerChange = (value: number | null) => {
    setFormData((prev) => ({
      ...prev,
      manufacturer: value,
      category_id: null,
      cmodel_id: null,
    }));

    const selectedManufacturer = manufacturers.find((m) => m.id === value);
    if (selectedManufacturer && selectedManufacturer.categories) {
      setCategories(selectedManufacturer.categories);
    } else {
      setCategories([]);
    }
    setModels([]); // Reset models
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
  // const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const handleInputChange = <T extends keyof AuctionsFormInputs>(
    key: T,
    value: AuctionsFormInputs[T]
  ): void => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post(`customer/car-auctions`, formData);

      // ✅ تحديث بيانات الجدول بعد الإضافة
      const apiUrl = "customer/car-auctions"; // نفس رابط API الذي تستخدمه لجلب بيانات الجدول
      dispatch(fetchTableData(apiUrl)); // إعادة تحميل البيانات

      toast.success("تم إرسال الطلب بنجاح");
      console.log("Form Data Submitted:", formData);
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء الإرسال");
    }
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchManufacturers());
    }
  }, [dispatch, status]);
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
          <label>Car Manufacturer and Model:</label>
          <DainamicSelector
            data={manufacturers}
            value={formData.manufacturer}
            onChange={handleManufacturerChange}
          />
        </div>
        <div className="selector">
          <label>Car Manufacturer and Model:</label>
          <DainamicSelector
            data={categories}
            value={formData.category_id}
            onChange={handleCategoryChange}
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
        <div className="selector">
          <label>Year of Manufacture:</label>
          <Text_selector
            options={yearOfMade}
            placeholder="2018"
            value={formData.year}
            onChange={(value) => handleInputChange("year", value)}
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
          />
        </div>
        <div className="selector">
          <label> Drive System:</label>
          <Text_selector
            options={driveSystemOPtions}
            placeholder="FWD..."
            value={formData.drive_system}
            onChange={(value) => handleInputChange("drive_system", value)}
          />
        </div>
        <div className="selector">
          <label> Fuel Type:</label>
          <Text_selector
            options={fuelTypeOptions}
            placeholder="Petrole...."
            value={formData.fuel_type}
            onChange={(value) => handleInputChange("fuel_type", value)}
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
          />
        </div>
        <div className="selector">
          <label>Budget Range (From - To):</label>
          <Budget_selector
            from_budget={formData.from_budget}
            to_budget={formData.to_budget}
            options={budgetOptions}
            placeholder={{ from: "اختر الحد الأدنى", to: "اختر الحد الأعلى" }}
            onFromChange={(value) => handleInputChange("from_budget", value)}
            onToChange={(value) => handleInputChange("to_budget", value)}
          />
        </div>
        <div className="selector">
          <label>Mileage:</label>
          <Text_selector
            placeholder="5000KM"
            options={mileageOptions}
            value={formData.mileage}
            onChange={(value) => {
              setFormData({ ...formData, mileage: value });
              console.log(categories);
            }}
          />
        </div>
        <div className="selector">
          <label>Car status:</label>
          <Text_selector
            placeholder="used"
            options={CarStatusOptions}
            value={formData.car_status}
            onChange={(value) => {
              setFormData({ ...formData, car_status: value });
              console.log(categories);
            }}
          />
        </div>
        <div className="selector">
          <label>Shipping Option: </label>
          <Text_selector
            options={ShippingOption}
            placeholder="container..."
            value={formData.shipping_option}
            onChange={(value) => handleInputChange("shipping_option", value)}
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
          />
        </div>
        <div className="selector">
          <label>Interior Color: </label>
          <Text_selector
            options={InteriorColor}
            placeholder="white..."
            value={formData.in_color}
            onChange={(value) => handleInputChange("in_color", value)}
          />
        </div>
        <div className="selector">
          <label>Shipping Destination Country:</label>
          <DainamicSelector
            value={formData.country_id}
            onChange={(value) =>
              setFormData({ ...formData, country_id: value })
            }
            Api_URL="customer/countries?is_shown_auction=1"
          />
        </div>
      </div>
      <div className="flex flex-wrap actions w-full gap-[10px] mt-4 py-4 items-center justify-between">
        <button className=" w-[150px] py-3 button_bordered" onClick={close}>
          Cancel
        </button>
        <button
          className=" w-[150px] py-3 button_outline"
          onClick={handleSubmit}
        >
          Save Car Details
        </button>
      </div>
    </div>
  );
}
