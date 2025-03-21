"use client";

import Text_selector from "@/components/inputs/selectors/text_selector";
import Text_input from "@/components/inputs/Text_input";
import { useState } from "react";
import {
  mileageOptions,
  budgetOptions,
  CarStatusOptions,
  carLocations,
  CarfaxOptions,
  driveSystemOPtions,
  ExteriorColor,
  fuelTypeOptions,
  InteriorColor,
  NumberOfCylinders,
  yearOfMade,
} from "../data";
import { FaMinus } from "react-icons/fa";
import Chooser from "@/components/inputs/chooser";
import Budget_selector from "@/components/inputs/selectors/budget_selector";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DainamicSelector from "@/components/inputs/selectors/DainamicSelector";

interface SallesFormInputs {
  link: string;
  manufacturer: number | null;
  cmodel_id: number | null;
  category_id: number | null;
  Mileage: string;
  from_budget: string;
  to_budget: string;
  status: string;
  Carfax: string;
  yearOfMade: string;
  transmission: string;
  driveSystem: string;
  fuelType: string;
  cylinders: string;
  budget: { from: string; to: string };
  exteriorColor: string;
  interiorColor: string;
  destinationCountry: string;
  location: string;
  shippingOption: string;
  shippedlocations: string;
  not_shippedlocations: string;
  images: File[];
}

interface SallesProps {
  close: () => void;
}

export default function Salles({ close }: SallesProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [models, setModels] = useState<any[]>([]);
  const [formData, setFormData] = useState<SallesFormInputs>({
    link: "",
    manufacturer: null,
    category_id: null,
    cmodel_id: null,
    Mileage: "",
    from_budget: "",
    to_budget: "",
    status: "",
    Carfax: "",
    yearOfMade: "",
    shippingOption: "",
    transmission: "",
    driveSystem: "",
    fuelType: "",
    cylinders: "",
    budget: { from: "", to: "" },
    exteriorColor: "",
    interiorColor: "",
    destinationCountry: "",
    location: "",
    shippedlocations: "",
    not_shippedlocations: "",
    images: [],
  });
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { manufacturers } = useSelector(
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
  const handleInputChange = <T extends keyof SallesFormInputs>(
    key: T,
    value: SallesFormInputs[T]
  ): void => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setFormData((prev) => ({ ...prev, images: files }));

      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };
  const handleRemoveImage = (index: number) => {
    // إزالة الصورة من previewUrls
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));

    // إزالة الصورة من formData.images
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex flex-col gap-[16px] px-[15px]">
      <div className="heading_form flex item-center justify-center">
        <h2 className="title">Car Shipping</h2>
      </div>
      <div className="carInfo flwx fles-col items-center justify-start gap-[15px]">
        <h3 className="">Car Information:</h3>
        <div className="flex flex-wrap items-center justify-between  gap-[15px]">
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
              value={formData.yearOfMade}
              onChange={(value) => handleInputChange("yearOfMade", value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between  gap-[10px]">
          <div className="selector">
            <label>Mileage:</label>
            <Text_selector
              options={mileageOptions}
              placeholder="Sedan, SUV, Truck"
              value={formData.Mileage}
              onChange={(value) => handleInputChange("Mileage", value)}
            />
          </div>
          <div className="selector">
            <label> Drive System:</label>
            <Text_selector
              options={driveSystemOPtions}
              placeholder="2018"
              value={formData.driveSystem}
              onChange={(value) => handleInputChange("driveSystem", value)}
            />
          </div>
        </div>
      </div>
      <div className="carInfo flwx fles-col items-center justify-start gap-[10px]">
        <h3 className="">Specifications:</h3>
        <div className="flex flex-wrap items-center justify-between  gap-[10px]">
          <div className="selector">
            <label>Number of Cylinders:</label>
            <Text_selector
              options={NumberOfCylinders}
              placeholder="toyota corola"
              value={formData.cylinders}
              onChange={(value) => handleInputChange("cylinders", value)}
            />
          </div>
          <div className="selector">
            <label>Fuel Type</label>
            <Text_selector
              options={fuelTypeOptions}
              placeholder="Sedan, SUV, Truck"
              value={formData.fuelType}
              onChange={(value) => handleInputChange("fuelType", value)}
            />
          </div>
          <div className="selector">
            <label>Price</label>
            <Budget_selector
              from_budget={formData.from_budget}
              to_budget={formData.to_budget}
              options={budgetOptions}
              placeholder={{ from: "اختر الحد الأدنى", to: "اختر الحد الأعلى" }}
              onFromChange={(value) => handleInputChange("from_budget", value)}
              onToChange={(value) => handleInputChange("to_budget", value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between  gap-[10px]">
          <div className="selector">
            <label>Number of Cylinders:</label>
            <Text_selector
              options={NumberOfCylinders}
              placeholder="toyota corola"
              value={formData.cylinders}
              onChange={(value) => handleInputChange("cylinders", value)}
            />
          </div>
          <div className="selector">
            <label>Exterior Color:</label>
            <Text_selector
              options={ExteriorColor}
              placeholder="white..."
              value={formData.exteriorColor}
              onChange={(value) => handleInputChange("exteriorColor", value)}
            />
          </div>
          <div className="selector">
            <label>Interior Color:</label>
            <Text_selector
              options={InteriorColor}
              placeholder="white..."
              value={formData.interiorColor}
              onChange={(value) => handleInputChange("interiorColor", value)}
            />
          </div>
        </div>
      </div>
      <div className="carInfo flwx fles-col items-center justify-start gap-[10px]">
        <h3 className="">Shipping & Location:</h3>
        <div className="flex flex-wrap items-center justify-between  gap-[10px]">
          <div className="selector">
            <label>Shipping From</label>
            <Text_input
              value={formData.location}
              id="link"
              placeholder="Canada..."
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>
          <div className="selector">
            <label>Car Status</label>
            <Text_selector
              options={CarStatusOptions}
              placeholder="In Stock, In Transit, Arrived"
              value={formData.status}
              onChange={(value) => handleInputChange("status", value)}
            />
          </div>
          <div className="selector">
            <label>Location of Car (If shipped)</label>
            <Text_selector
              options={carLocations}
              placeholder="2018"
              value={formData.shippedlocations}
              onChange={(value) => handleInputChange("shippedlocations", value)}
            />
          </div>
        </div>
        <Chooser
          question="Location of Car (If not shipped)"
          option1="On the way"
          value1="On the way"
          option2="In transit"
          value2="In transit"
          value={formData.not_shippedlocations}
          onChange={(value) => handleInputChange("not_shippedlocations", value)}
        />
      </div>
      <div className="carInfo flwx fles-col items-center justify-start gap-[10px]">
        <h3 className="">Additional Features:</h3>
        <div className="flex flex-wrap items-center justify-between  gap-[10px]">
          <div className="selector">
            <label>Carfax </label>
            <Text_selector
              options={CarfaxOptions}
              placeholder="Available or Not Available"
              value={formData.Carfax}
              onChange={(value) => handleInputChange("Carfax", value)}
            />
          </div>
          <div className="selector">
            <label>Car Status</label>
            <Text_selector
              options={CarStatusOptions}
              placeholder="In Stock, In Transit, Arrived"
              value={formData.status}
              onChange={(value) => handleInputChange("status", value)}
            />
          </div>
          <div className="selector">
            <label>Car Images</label>
            <input
              type="file"
              id="car-images"
              accept="image/*"
              placeholder="upload multiple images"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  {/* زر الإزالة */}
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 z-50 text-red-500  rounded-full border border-red-500 p-2 "
                  >
                    <FaMinus />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap actions w-full gap-[10px] mt-4 py-4 items-center justify-between">
        <button
          className="btn w-[200px] py-3 border-primary1 text-primary1 hover:bg-primary1 hover:text-light"
          onClick={close}
        >
          Cancel
        </button>
        <button
          className="btn w-[200px] py-3 bg-primary1 hover:bg-transparent hover:border-primary1 hover:text-black text-light"
          onClick={handleSubmit}
        >
          Save Car Details
        </button>
      </div>
    </div>
  );
}
