"use client";

import Budget_selector from "@/components/inputs/selectors/budget_selector";
import Text_selector from "@/components/inputs/selectors/text_selector";
import Text_input from "@/components/inputs/Text_input";
import { useState } from "react";
import {
  budgetoptions,
  carCategory,
  carModels,
  driveSystemOPtions,
  ExteriorColor,
  fuelTypeOptions,
  InteriorColor,
  NumberOfCylinders,
  ShippingCountry,
  ShippingOption,
  TransmissionTypeOptions,
  yearOfMade,
} from "../data";

interface AuctionsFormInputs {
  link: string;
  carModel: string;
  category: string;
  yearOfMade: string;
  transmission: string;
  driveSystem: string;
  fuelType: string;
  cylinders: string;
  budget: { from: string; to: string };
  exteriorColor: string;
  interiorColor: string;
  destinationCountry: string;
  shippingOption: string;
}
interface AuctionsProps {
  close: () => void;
}
export default function Auctions({ close }: AuctionsProps) {
  const [formData, setFormData] = useState<AuctionsFormInputs>({
    link: "",
    carModel: "",
    category: "",
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
  });
  const handleInputChange = <T extends keyof AuctionsFormInputs>(
    key: T,
    value: AuctionsFormInputs[T]
  ): void => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleBudgetChange = (newBudget: { from: string; to: string }) => {
    setFormData((prev) => ({ ...prev, budget: newBudget }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex flex-col gap-[16px] px-[15px]">
      <div className="heading_form flex item-center justify-center">
        <h2 className="title">Select a Car for Auction</h2>
      </div>
      <Text_input
        value={formData.link}
        id="link"
        placeholder="https://www.copart.com/dashboard"
        label="Please Enter Car Auction Link"
        onChange={(e) => handleInputChange("link", e.target.value)}
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
          <Text_selector
            options={carModels}
            placeholder="toyota corola"
            value={formData.carModel}
            onChange={(value) => handleInputChange("carModel", value)}
          />
        </div>
        <div className="selector">
          <label>Category:</label>
          <Text_selector
            options={carCategory}
            placeholder="Sedan, SUV, Truck"
            value={formData.category}
            onChange={(value) => handleInputChange("category", value)}
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
      <div className="flex flex-wrap items-center justify-between gap-[10px]">
        <div className="selector">
          <label>Transmission Type:</label>
          <Text_selector
            options={TransmissionTypeOptions}
            placeholder="Manual..."
            value={formData.transmission}
            onChange={(value) => handleInputChange("transmission", value)}
          />
        </div>
        <div className="selector">
          <label> Drive System:</label>
          <Text_selector
            options={driveSystemOPtions}
            placeholder="FWD..."
            value={formData.driveSystem}
            onChange={(value) => handleInputChange("driveSystem", value)}
          />
        </div>
        <div className="selector">
          <label> Fuel Type:</label>
          <Text_selector
            options={fuelTypeOptions}
            placeholder="Petrole...."
            value={formData.fuelType}
            onChange={(value) => handleInputChange("fuelType", value)}
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
            options={budgetoptions}
            value={formData.budget}
            placeholder={{ from: "Select Min Budget", to: "Select Max Budget" }}
            onChange={handleBudgetChange}
            error={
              formData.budget.from &&
              formData.budget.to &&
              Number(formData.budget.from) > Number(formData.budget.to)
                ? "Invalid Range"
                : undefined
            }
          />
        </div>
        <div className="selector">
          <label>Shipping Option: </label>
          <Text_selector
            options={ShippingOption}
            placeholder="container..."
            value={formData.shippingOption}
            onChange={(value) => handleInputChange("shippingOption", value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-[10px]">
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
          <label>Interior Color: </label>
          <Text_selector
            options={InteriorColor}
            placeholder="white..."
            value={formData.interiorColor}
            onChange={(value) => handleInputChange("interiorColor", value)}
          />
        </div>
        <div className="selector">
          <label>Shipping Destination Country:</label>
          <Text_selector
            options={ShippingCountry}
            placeholder="toyota corola"
            value={formData.destinationCountry}
            onChange={(value) => handleInputChange("destinationCountry", value)}
          />
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
