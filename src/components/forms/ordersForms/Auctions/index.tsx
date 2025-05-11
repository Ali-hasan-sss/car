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
import { addAuction, updateAuction } from "@/store/slice/AuctionsSlice";
import { AuctionsFormInputs } from "@/Types/AuctionTypes";
import LoadingBTN from "@/components/loading/loadingBTN";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();
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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.auction_link) {
      // إذا لم يكن هناك رابط، تحقق من جميع الحقول الأخرى
      if (!formData.manufacturer) newErrors.manufacturer = " ";
      if (!formData.category_id) newErrors.category_id = " ";
      if (!formData.year) newErrors.year = " ";
      if (!formData.transmission_type) newErrors.transmission_type = " ";
      if (!formData.drive_system) newErrors.drive_system = " ";
      if (!formData.fuel_type) newErrors.fuel_type = " ";
      if (!formData.cylinders) newErrors.cylinders = " ";
      if (!formData.from_budget || !formData.to_budget) newErrors.budget = " ";
      if (!formData.shipping_option) newErrors.shipping_option = " ";
      if (!formData.ex_color) newErrors.ex_color = " ";
      if (!formData.in_color) newErrors.in_color = " ";
      if (!formData.country_id) newErrors.country_id = " ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
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
      setLoading(true);
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
          toast.success(t("Edit_Auction"));
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
          toast.success(t("Add_Auction"));
        } else return;
      }
      onSubmit(formData);
      close();
    } catch (error) {
      console.error(error);
      toast.error(t("Error"));
    } finally {
      setLoading(false);
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
    <div className="w-full items-center justify-center flex py-4 px-1 md:px-5 flex-col gap-4 ">
      <div className="heading_form flex item-center justify-center">
        <h2 className="text-xl">{t("Select_Auction")}</h2>
      </div>
      <Text_input
        value={formData.auction_link}
        id="link"
        placeholder="https://www.copart.com/dashboard"
        label={t("auction_link")}
        onChange={(e) => handleInputChange("auction_link", e.target.value)}
      />
      <div className="flex w-full items-center justify-between">
        <div className="w-1/2 flex items-center justify-start">
          <hr className="w-full text-gray-400" />
        </div>
        <div className="w-[50px] flex items-center justify-center">
          <p className="text-lg text-center w-[15px] text-gray-400">
            {t("or")}
          </p>
        </div>
        <div className="w-1/2 flex items-center justify-end">
          <hr className="w-full text-gray-400" />
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center justify-between  gap-[10px]">
        <div className="selector w-[250px]">
          <label>{t("Car_Manufacturer")} :</label>
          <DainamicSelector
            placeholder="BMW , Audi , kia ..."
            data={manufacturers}
            value={formData.manufacturer}
            onChange={handleManufacturerChange}
            error={errors.manufacturer}
            dataLoading={manufacturerLoading}
          />
        </div>
        <div className="selector w-[250px]">
          <label>{t("Car_Model")} :</label>
          <DainamicSelector
            placeholder={t("choes_Manufacturer_first")}
            data={categories}
            value={formData.category_id}
            onChange={handleCategoryChange}
            error={errors.category_id}
          />
        </div>
        <div className="selector w-[250px]">
          <label>{t("year")} :</label>
          <Text_selector
            options={yearOfMade}
            placeholder="2018"
            value={formData.year}
            onChange={(value) => handleInputChange("year", value)}
            error={errors.year}
          />
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center justify-between gap-[10px]">
        <div className="selector w-[250px]">
          <label>{t("Transmission_Type")} :</label>
          <Text_selector
            options={TransmissionTypeOptions}
            placeholder={t("Manual")}
            value={formData.transmission_type}
            onChange={(value) => handleInputChange("transmission_type", value)}
            error={errors.transmission_type}
          />
        </div>
        <div className="selector w-[250px]">
          <label> {t("Drive_System")} :</label>
          <Text_selector
            options={driveSystemOPtions}
            placeholder={t("FWD")}
            value={formData.drive_system}
            onChange={(value) => handleInputChange("drive_system", value)}
            error={errors.drive_system}
          />
        </div>
        <div className="selector w-[250px]">
          <label> {t("Fuel_Type")} :</label>
          <Text_selector
            options={fuelTypeOptions}
            placeholder={t("Petrole")}
            value={formData.fuel_type}
            onChange={(value) => handleInputChange("fuel_type", value)}
            error={errors.fuel_type}
          />
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center justify-between gap-[10px]">
        <div className="selector w-[250px]">
          <label>{t("Number_of_Cylinders")}:</label>
          <Text_selector
            options={NumberOfCylinders}
            placeholder="4,6,8,12..."
            value={formData.cylinders}
            onChange={(value) => handleInputChange("cylinders", value)}
            error={errors.cylinders}
          />
        </div>
        <div className="selector w-[250px]">
          <label>
            {t("Budget_Range")} ({t("From")} - {t("To")}):
          </label>
          <Budget_selector
            from_budget={formData.from_budget}
            to_budget={formData.to_budget}
            options={budgetOptions}
            placeholder={{ from: t("From"), to: t("To") }}
            onFromChange={(value) => handleInputChange("from_budget", value)}
            onToChange={(value) => handleInputChange("to_budget", value)}
            error={errors.budget}
          />
        </div>
        <div className="selector w-[250px]">
          <label>{t("Shipping_Option")} : </label>
          <Text_selector
            options={ShippingOption}
            placeholder={t("container")}
            value={formData.shipping_option}
            onChange={(value) => handleInputChange("shipping_option", value)}
            error={errors.shipping_option}
          />
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center justify-between gap-[10px]">
        <div className="selector w-[250px]">
          <label>{t("Exterior_Color")} :</label>
          <Text_selector
            options={ExteriorColor}
            placeholder={t("white")}
            value={formData.ex_color}
            onChange={(value) => handleInputChange("ex_color", value)}
            error={errors.ex_color}
          />
        </div>
        <div className="selector w-[250px]">
          <label>{t("Interior_Color")} : </label>
          <Text_selector
            options={InteriorColor}
            placeholder={t("white")}
            value={formData.in_color}
            onChange={(value) => handleInputChange("in_color", value)}
            error={errors.in_color}
          />
        </div>
        <div className="selector w-[250px]">
          <label>{t("Shipping_Country")} :</label>
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
      <div className="flex w-full flex-wrap actions w-full gap-[10px] mt-4 py-4 items-center justify-between">
        <button className="py-1 px-2 button_bordered" onClick={close}>
          {t("Cancel")}
        </button>
        <button
          className="py-1 px-2 flex items-center justify-center button_outline"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <LoadingBTN /> : t("Send_Car_Order")}
        </button>
      </div>
    </div>
  );
}
