"use client";

import Text_selector from "@/components/inputs/selectors/text_selector";
import Text_input from "@/components/inputs/Text_input";
import { useEffect, useState } from "react";
import {
  mileageOptions,
  CarStatusOptions,
  driveSystemOPtions,
  fuelTypeOptions,
  NumberOfCylinders,
  TransmissionTypeOptions,
  InteriorColor,
  ExteriorColor,
  shippingStatusOptions,
  CarfaxOptions,
  location_port,
} from "../data";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import DainamicSelector from "@/components/inputs/selectors/DainamicSelector";
import { fetchManufacturers } from "@/store/slice/manufacturerSlice";
import { addCarSale, updateCarSale } from "@/store/slice/carSalesSlice";
import { SallesFormInputs } from "@/Types/AuctionTypes";
import { Checkbox } from "@mui/material";
import { ImageUp } from "lucide-react";
import Chooser from "@/components/inputs/chooser";
import { useLanguage } from "@/context/LanguageContext";
import ImageUploader from "@/components/uploders/Uploader/ImageUploader";
import { AnimatePresence, motion } from "framer-motion";
import LoadingBTN from "@/components/loading/loadingBTN";
import { toast } from "sonner";

interface SallesProps {
  close: () => void;
  initialData?: SallesFormInputs | null;
  onSubmit: (data: SallesFormInputs) => void;
}

export default function Salles({ close, initialData, onSubmit }: SallesProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [models, setModels] = useState<any[]>([]);
  const [showUploader, setShowUploader] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [manufacturerLoading, setManufacturerLoading] = useState(false);
  const { t } = useLanguage();
  const [formData, setFormData] = useState<SallesFormInputs>({
    manufacturer: null,
    category_id: null,
    cmodel_id: null,
    mileage: 0,
    year: "",
    drive_system: 1,
    transmission_type: 1,
    cylinders: 4,
    fuel_type: 1,
    price: "",
    shipping_from: 0,
    car_status: 1,
    carfax: null,
    shipping_status: 0,
    ex_color: "",
    in_color: "",
    not_shippedlocations: "",
    location_port: "",
    images: [],
  });
  const dispatch = useDispatch<AppDispatch>();
  const { manufacturers, status } = useSelector(
    (state: RootState) => state.manufacturer
  );
  const currentYear = new Date().getFullYear();
  const yearOfMade = Array.from({ length: 30 }, (_, i) => {
    const yearString = (currentYear - i).toString();
    return { value: yearString, label: yearString };
  });
  const loading = useSelector((state: RootState) => state.carSales.loading);

  useEffect(() => {
    if (initialData) {
      const imageNames = Array.isArray(initialData.images)
        ? typeof initialData.images[0] === "string"
          ? initialData.images
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            initialData.images.map((image: any) => image.image)
        : [];

      setFormData({
        ...initialData,
        images: imageNames,
      });
      //add catedory when select manifacturer
      const selectedManufacturer = manufacturers.find(
        (m) => m.id === initialData.manufacturer
      );
      if (selectedManufacturer?.categories) {
        setCategories(selectedManufacturer.categories);

        //add models when select catigory
        const selectedCategory = selectedManufacturer.categories.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (c: any) => c.id === initialData.category_id
        );
        if (selectedCategory?.cmodels) {
          setModels(selectedCategory.cmodels);
        }
      }
    }
  }, [initialData, manufacturers]);

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

  const handleFileChange = (images: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images,
    }));
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.manufacturer) newErrors.manufacturer = " ";
    if (!formData.category_id) newErrors.category_id = " ";
    if (!formData.year) newErrors.year = " ";
    if (!formData.transmission_type) newErrors.transmission_type = " ";
    if (!formData.drive_system) newErrors.drive_system = " ";
    if (!formData.fuel_type) newErrors.fuel_type = " ";
    if (!formData.cylinders) newErrors.cylinders = " ";
    if (!formData.price) newErrors.price = " ";
    if (!formData.ex_color) newErrors.ex_color = " ";
    if (!formData.in_color) newErrors.in_color = " ";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    try {
      if (initialData?.id) {
        // ✅ تعديل
        if (validateForm()) {
          await dispatch(
            updateCarSale({
              apiUrl: "customer/car-sales",
              id: initialData.id,
              updatedData: formData,
            })
          );
          toast.success(t("Edit_sales"));
        } else return;
      } else {
        // ✅ إضافة
        if (validateForm()) {
          await dispatch(
            addCarSale({ apiUrl: "customer/car-sales", carSaleData: formData })
          );
          toast.error(t("Add_sales"));
        } else return;
      }
      // ✅ تحديث الحالة في المكون الأب
      onSubmit(formData);
      close();
    } catch (error) {
      console.error(error);
      toast.error(t("Error"));
    }
  };

  return (
    <div className="flex flex-col gap-[16px] px-[15px]">
      <div className="heading_form flex item-center justify-center">
        <h2 className="text-xl">{t("Car_Sales")}</h2>
      </div>
      <div className="carInfo flwx fles-col items-center justify-start gap-[15px]">
        <h3 className="text-xl">{t("Car_Information")} :</h3>
        <div className="flex flex-wrap items-center justify-between  gap-[15px]">
          <div className="selector">
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
          <div className="selector">
            <label>{t("Car_Model")} :</label>
            <DainamicSelector
              data={categories}
              placeholder={t("choes_Manufacturer_first")}
              value={formData.category_id}
              onChange={handleCategoryChange}
              error={errors.category_id}
            />
          </div>
          <div className="selector">
            <label>{t("Category")} :</label>
            <DainamicSelector
              placeholder={t("choes_category_first")}
              data={models}
              value={formData.cmodel_id}
              onChange={handleModelChange}
            />
          </div>
          <div className="selector">
            <label>{t("year")} :</label>
            <Text_selector
              options={yearOfMade}
              placeholder="2018"
              value={formData.year}
              onChange={(value) => handleInputChange("year", String(value))}
              error={errors.year}
            />
          </div>
          <div className="selector">
            <label>{t("Mileage")} :</label>
            <Text_selector
              options={mileageOptions}
              placeholder="50000 KM"
              value={formData.mileage}
              onChange={(value) => handleInputChange("mileage", Number(value))}
              error={errors.mileage}
            />
          </div>
          <div className="selector">
            <label> {t("Drive_System")} :</label>
            <Text_selector
              options={driveSystemOPtions}
              placeholder={t("auto")}
              value={formData.drive_system}
              onChange={(value) =>
                handleInputChange("drive_system", Number(value))
              }
              error={errors.drive_system}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between  gap-[10px]"></div>
      </div>
      <div className="carInfo flwx fles-col items-center justify-start gap-[10px]">
        <h3 className="text-xl">{t("Specifications")} :</h3>
        <div className="flex flex-wrap items-center justify-between  gap-[10px]">
          <div className="selector">
            <label>{t("Number_of_Cylinders")} :</label>
            <Text_selector
              options={NumberOfCylinders}
              placeholder="4 , 6 , 8 ..."
              value={formData.cylinders}
              onChange={(value) =>
                handleInputChange("cylinders", Number(value))
              }
              error={errors.cylinders}
            />
          </div>
          <div className="selector">
            <label>{t("Transmission_Type")} :</label>
            <Text_selector
              options={TransmissionTypeOptions}
              placeholder={t("Manual")}
              value={formData.transmission_type}
              onChange={(value) =>
                handleInputChange("transmission_type", Number(value))
              }
              error={errors.transmission_type}
            />
          </div>
          <div className="selector">
            <label>{t("Fuel_Type")} :</label>
            <Text_selector
              options={fuelTypeOptions}
              placeholder={t("Petrol")}
              value={formData.fuel_type}
              onChange={(value) =>
                handleInputChange("fuel_type", Number(value))
              }
              error={errors.fuel_type}
            />
          </div>
          <div className="selector">
            <label>{t("Price")}</label>
            <Text_input
              placeholder="2500 RO"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              error={errors.price}
            />
          </div>
          <div className="selector">
            <label>{t("Exterior_Color")} :</label>
            <Text_selector
              options={ExteriorColor}
              placeholder={t("white")}
              value={formData.ex_color}
              onChange={(value) => handleInputChange("ex_color", String(value))}
              error={errors.ex_color}
            />
          </div>
          <div className="selector">
            <label>{t("Interior_Color")} :</label>
            <Text_selector
              options={InteriorColor}
              placeholder={t("white")}
              value={formData.in_color}
              onChange={(value) => handleInputChange("in_color", String(value))}
              error={errors.in_color}
            />
          </div>
          <div className="selector">
            <label>{t("Car_Status")} :</label>
            <Text_selector
              options={CarStatusOptions}
              placeholder={t("Used")}
              value={formData.car_status}
              onChange={(value) =>
                handleInputChange("car_status", Number(value))
              }
              error={errors.car_status}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between  gap-[10px]"></div>
      </div>
      <div className="flex items-center">
        <Checkbox
          id="shepping"
          value={shipping}
          onChange={() => setShipping(!shipping)}
        />
        <label htmlFor="shepping">{t("shipping_quastion")}</label>
      </div>

      {shipping && (
        <div className="carInfo flwx fles-col items-center justify-start gap-[10px]">
          <h3 className="text-xl">{t("Shipping_Location")} :</h3>
          <div className="flex flex-wrap items-center justify-between  gap-[10px]">
            <div className="selector">
              <label>{t("Shipping_from")} :</label>
              <DainamicSelector
                Api_URL="customer/countries?is_shown_auction=1"
                placeholder="Canada"
                value={formData.shipping_from}
                onChange={(value) => handleInputChange("shipping_from", value)}
              />
            </div>
            <div className="selector">
              <label>{t("Shipping_Status")} :</label>
              <Text_selector
                options={shippingStatusOptions}
                placeholder={t("In_Stock")}
                value={formData.shipping_status}
                onChange={(value) =>
                  handleInputChange("shipping_status", Number(value))
                }
              />
            </div>
            <div className="selector mb-10">
              <label>
                {t("Location_of_Car")} ({t("If_shipped")})
              </label>
              <Text_selector
                options={location_port}
                placeholder="Duqm, Sohar"
                value={formData.location_port}
                onChange={(value) =>
                  handleInputChange("location_port", String(value))
                }
              />
            </div>
          </div>
          <Chooser
            question={t("Location_of_Car") + "(" + t("if_not_shipped") + ")"}
            option1={t("On_the_way")}
            value1="On the way"
            option2={t("In_transit")}
            value2="In transit"
            value={formData.not_shippedlocations}
            onChange={(value) =>
              handleInputChange("not_shippedlocations", String(value))
            }
          />
        </div>
      )}
      <div className="carInfo flwx fles-col items-center justify-start gap-[10px]">
        <h3 className="text-xl">{t("Additional_Features")} :</h3>
        <div className="flex flex-wrap items-center justify-between  gap-[10px]">
          <div className="py-[10px] w-full md:w-2/5">
            <label className="mb-1 block font-semibold">{t("Carfax")} :</label>
            <Text_selector
              options={CarfaxOptions}
              placeholder={t("Available") + " or " + t("Not_available")}
              value={formData.carfax}
              onChange={(value) => handleInputChange("carfax", Number(value))}
            />
          </div>
          <div className="py-[10px] w-full md:w-2/5">
            <label className="mb-1 block font-semibold">
              {t("Car_Images")}
            </label>
            <div
              className="w-full h-[40px] rounded-lg border flex items-center px-2 justify-between cursor-pointer hover:bg-secondary1 transition-all"
              onClick={() => setShowUploader((prev) => !prev)}
            >
              <p>{t("Upload_multiple_images")}</p>
              <ImageUp className="text-text_des" />
            </div>

            {/* أنيميشن framer-motion */}
            <AnimatePresence>
              {showUploader && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3">
                    <ImageUploader
                      multiple
                      onImagesUpload={handleFileChange}
                      initialImages={initialData?.images}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap actions w-full gap-[10px] mt-4 py-4 items-center justify-between">
        <button
          className="button_bordered py-1 px-2 border-primary1 text-primary1 hover:bg-primary1 hover:text-light"
          onClick={close}
        >
          {t("Cancel")}
        </button>
        <button
          className="button_outline py-1 px-2 bg-primary1 hover:bg-transparent hover:border-primary1 hover:text-black text-light"
          onClick={handleSubmit}
        >
          {loading ? <LoadingBTN /> : t("Send_Offer")}
        </button>
      </div>
    </div>
  );
}
