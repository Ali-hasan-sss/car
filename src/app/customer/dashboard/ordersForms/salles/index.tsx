"use client";

import Text_selector from "@/components/inputs/selectors/text_selector";
import Text_input from "@/components/inputs/Text_input";
import { useEffect, useState } from "react";
import {
  mileageOptions,
  CarStatusOptions,
  //CarfaxOptions,
  driveSystemOPtions,
  fuelTypeOptions,
  NumberOfCylinders,
  TransmissionTypeOptions,
  InteriorColor,
  ExteriorColor,
} from "../data";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import DainamicSelector from "@/components/inputs/selectors/DainamicSelector";
import { fetchManufacturers } from "@/store/slice/manufacturerSlice";
import { addCarSale, updateCarSale } from "@/store/slice/carSalesSlice";
import { SallesFormInputs } from "@/Types/AuctionTypes";

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
  const [manufacturerLoading, setManufacturerLoading] = useState(false);
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
    //Carfax: "",
    //shippingOption: "",
    //budget: { from: "", to: "" },
    ex_color: "",
    in_color: "",
    // destinationCountry: "",
    // location: "",

    // not_shippedlocations: "",
    // images: [],
  });
  // const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { manufacturers, status } = useSelector(
    (state: RootState) => state.manufacturer
  );
  const currentYear = new Date().getFullYear();
  const yearOfMade = Array.from({ length: 30 }, (_, i) => {
    const yearString = (currentYear - i).toString();
    return { value: yearString, label: yearString };
  });
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

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const files = Array.from(event.target.files);
  //     setFormData((prev) => ({ ...prev, images: files }));

  //     const urls = files.map((file) => URL.createObjectURL(file));
  //     setPreviewUrls(urls);
  //   }
  // };
  // const handleRemoveImage = (index: number) => {
  //   // إزالة الصورة من previewUrls
  //   setPreviewUrls((prev) => prev.filter((_, i) => i !== index));

  //   // إزالة الصورة من formData.images
  //   setFormData((prev) => ({
  //     ...prev,
  //     images: prev.images.filter((_, i) => i !== index),
  //   }));
  // };
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
    // if (!formData.ex_color)
    //   newErrors.ex_color = "يرجى تحديد لون السيارة الخارجي.";
    // if (!formData.in_color)
    //  newErrors.in_color = "يرجى تحديد لون السيارة الداخلي.";
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
        } else return;
      } else {
        // ✅ إضافة
        if (validateForm()) {
          await dispatch(
            addCarSale({ apiUrl: "customer/car-sales", carSaleData: formData })
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
    <div className="flex flex-col gap-[16px] px-[15px]">
      <div className="heading_form flex item-center justify-center">
        <h2 className="title">Car Sales</h2>
      </div>
      <div className="carInfo flwx fles-col items-center justify-start gap-[15px]">
        <h3 className="">Car Information:</h3>
        <div className="flex flex-wrap items-center justify-between  gap-[15px]">
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
              onChange={(value) => handleInputChange("year", String(value))}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between  gap-[10px]">
          <div className="selector">
            <label>Mileage:</label>
            <Text_selector
              options={mileageOptions}
              placeholder="Sedan, SUV, Truck"
              value={formData.mileage}
              onChange={(value) => handleInputChange("mileage", Number(value))}
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
              onChange={(value) =>
                handleInputChange("cylinders", Number(value))
              }
            />
          </div>
          <div className="selector">
            <label>Transmission Type:</label>
            <Text_selector
              options={TransmissionTypeOptions}
              placeholder="Manual..."
              value={formData.transmission_type}
              onChange={(value) =>
                handleInputChange("transmission_type", Number(value))
              }
              error={errors.transmission_type}
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
            />
          </div>
          <div className="selector">
            <label>Price</label>
            <Text_input
              placeholder="Sedan, SUV, Truck"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
          </div>
        </div>
        {/* <div className="flex flex-wrap items-center justify-between  gap-[10px]">
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
        </div> */}
      </div>
      <div className="carInfo flwx fles-col items-center justify-start gap-[10px]">
        <h3 className="">Shipping & Location:</h3>
        <div className="flex flex-wrap items-center justify-between  gap-[10px]">
          {/* <div className="selector">
            <label>Shipping From</label>
            <Text_input
              value={formData.shipping_from}
              id="link"
              placeholder="Canada..."
              onChange={(e) =>
                handleInputChange("shipping_from", e.target.value)
              }
            />
          </div> */}
          <div className="selector">
            <label>Car Status</label>
            <Text_selector
              options={CarStatusOptions}
              placeholder="In Stock, In Transit, Arrived"
              value={formData.car_status}
              onChange={(value) =>
                handleInputChange("car_status", Number(value))
              }
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
            <label>Location of Car (If shipped)</label>
            <DainamicSelector
              Api_URL="customer/countries"
              placeholder="Canada"
              value={formData.shipping_from}
              onChange={(value) => handleInputChange("shipping_from", value)}
            />
          </div>
        </div>
        {/* <Chooser
          question="Location of Car (If not shipped)"
          option1="On the way"
          value1="On the way"
          option2="In transit"
          value2="In transit"
          value={formData.not_shippedlocations}
          onChange={(value) => handleInputChange("not_shippedlocations", value)}
        /> */}
      </div>
      {/* <div className="carInfo flwx fles-col items-center justify-start gap-[10px]">
        <h3 className="">Additional Features:</h3>
        <div className="flex flex-wrap items-center justify-between  gap-[10px]">
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
            /> }
            <div className="grid grid-cols-2 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
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
      </div> */}

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
