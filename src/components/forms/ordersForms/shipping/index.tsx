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
import LoadingBTN from "@/components/loading/loadingBTN";
import { addCarShipping, updateCarShipping } from "@/store/slice/ShippingSlice";
import { packages, ShippingFormInputs } from "@/Types/AuctionTypes";
import Btn_borded from "@/components/buttons/btn/bordered_btn";
import PackageForm from "./packageForm";
import { Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

interface ShippingProps {
  initialData?: ShippingFormInputs | null;
  close: () => void;
  onSubmit: (data: ShippingFormInputs) => void;
}

export default function ShippingForm({
  initialData,
  onSubmit,
  close,
}: ShippingProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [models, setModels] = useState<any[]>([]);
  const [packageModal, setPackageModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [editingPackageIndex, setEditingPackageIndex] = useState<number | null>(
    null
  );
  const [editingPackageData, setEditingPackageData] = useState<packages | null>(
    null
  );
  const { t } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  const { manufacturers, status } = useSelector(
    (state: RootState) => state.manufacturer
  );
  const userRole = useSelector((state: RootState) => state.auth.user?.userRole);
  const [manufacturerLoading, setManufacturerLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const yearOfMade = Array.from({ length: 30 }, (_, i) => {
    const yearString = (currentYear - i).toString();
    return { value: yearString, label: yearString };
  });
  useEffect(() => {
    if (status === "idle") {
      if (userRole === "ADMIN" || userRole === "USER") {
        setManufacturerLoading(true);
        dispatch(fetchManufacturers(userRole));
      }
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
    package_shippings: [],
  });
  const addPackage = (newPackage: packages) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      package_shippings: [
        ...(prevFormData.package_shippings || []),
        newPackage,
      ],
    }));
    setPackageModal(false);
  };

  const handleEditPackage = (packageData: packages, index: number) => {
    setPackageModal(true);
    setEditingPackageData(packageData);
    setEditingPackageIndex(index);
  };
  const updatePackage = (updatedPackage: packages) => {
    if (editingPackageIndex !== null) {
      const processedUpdatedPackage = {
        ...updatedPackage,
        item_weight: updatedPackage.item_weight || 0,
        package_type: updatedPackage.package_type || 1,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFormData((prevFormData: any) => {
        const newPackages = [...prevFormData.package_shippings];
        newPackages[editingPackageIndex] = processedUpdatedPackage;
        return {
          ...prevFormData,
          package_shippings: newPackages,
        };
      });
      setEditingPackageIndex(null);
      setEditingPackageData(null);
    }
  };

  const removePackage = (index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      package_shippings: prevFormData.package_shippings.filter(
        (_, i) => i !== index
      ),
    }));
  };

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
      setLoading(true);
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
          toast.success(t("edit_car_shipping"));
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
          toast.success(t("add_car_shipping"));
        } else return;
      }
      onSubmit(formData);
      setLoading(false);
      close();
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(t("Error"));
    }
  };

  return (
    <div className="flex flex-col gap-[20px] px-1 py-[10px]">
      {/* العنوان */}
      <div className="flex items-center justify-start gap-1">
        <img src="/images/information.png" alt="info" className="w-[20px]" />
        <h2 className="text-text_title text-xl font-bold">
          {t("General_Information")}
        </h2>
      </div>

      <div className="flex flex-col w-full items-start gap-4">
        <p className="text-text_title text-start font-bold text-xl">
          {t("General_des1")}
        </p>
        <p className="text-text_des text-start text-xl">{t("General_des2")}</p>
        <div className="selector w-full">
          <label>{t("Commodity_Type")} *</label>
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
          question={t("is_pickup_question") + "*"}
          option1={t("Yes")}
          value1={1}
          option2={t("No") + "," + t("myself")}
          value2={0}
          value={formData.is_pickup} // القيمة الحالية
          onChange={(value) => handleInputChange("is_pickup", Number(value))} // تحديث الحالة
        />

        {/* السؤال الثاني: هل تريد توحيد الشحنة؟ */}
        <Chooser
          question={t("is_consolidate_q") + "*"}
          option1={t("Yes") + ", " + t("shared")}
          value1={1}
          option2={t("No") + ", " + t("separate")}
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
          {t("final_port_q")}
        </p>
        <div className="selector">
          <label>{t("Final_port")} *</label>
          <Text_selector
            options={location_port}
            placeholder="Select"
            value={formData.final_port}
            onChange={(value) => handleInputChange("final_port", String(value))}
          />
        </div>
        <Checkbox
          label={t("in_transit_q")}
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
            {t("Commodity_information")}
          </h2>
        </div>
        <p className="text-text_des text-start font-bold text-lg">
          {t("Commodity_des")}
        </p>
        <div className="flex flex-wrap w-full items-center justify-between  gap-3">
          <div className="selector w-full md:w-1/4">
            <label>{t("Car_Manufacturer")} :</label>
            <DainamicSelector
              placeholder="BMW , Audi , kia ..."
              data={manufacturers}
              value={formData.manufacturer}
              onChange={handleManufacturerChange}
              //  error={errors.manufacturer}
              dataLoading={manufacturerLoading}
            />
          </div>
          <div className="selector w-full md:w-1/4 ">
            <label>{t("Car_Model")} :</label>
            <DainamicSelector
              data={categories}
              value={formData.category_id}
              onChange={handleCategoryChange}
              // error={errors.category_id}
            />
          </div>
          <div className="selector w-full md:w-1/4">
            <label>{t("Category")} :</label>
            <DainamicSelector
              data={models}
              value={formData.cmodel_id}
              onChange={handleModelChange}
            />
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between  gap-3">
          <div className="selector w-full md:w-1/4">
            <label>{t("year")} :</label>
            <Text_selector
              options={yearOfMade}
              placeholder="2018"
              value={formData.year}
              onChange={(value) => handleInputChange("year", String(value))}
              //error={errors.year}
            />
          </div>
          <div className="selector w-full md:w-1/4">
            <label> {t("Drive_System")} :</label>
            <Text_selector
              options={driveSystemOPtions}
              placeholder={t("FWD")}
              value={formData.drive_system}
              onChange={(value) =>
                handleInputChange("drive_system", Number(value))
              }
              // error={errors.drive_system}
            />
          </div>
          <div className="selector w-full md:w-1/4">
            <label>{t("Number_of_Cylinders")} :</label>
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
        <div className="flex w-full flex-wrap items-center justify-between  gap-3">
          <div className="selector w-full md:w-1/4">
            <label>{t("Transmission_Type")} :</label>
            <Text_selector
              options={TransmissionTypeOptions}
              placeholder={t("manual")}
              value={formData.transmission_type}
              onChange={(value) =>
                handleInputChange("transmission_type", Number(value))
              }
              //error={errors.transmission_type}
            />
          </div>
          <div className="selector w-full md:w-1/4">
            <label>{t("Fuel_Type")} :</label>
            <Text_selector
              options={fuelTypeOptions}
              placeholder={t("Petrol")}
              value={formData.fuel_type}
              onChange={(value) =>
                handleInputChange("fuel_type", Number(value))
              }
              //  error={errors.fuel_type}
            />
          </div>
          <div className="selector w-full md:w-1/4">
            <label>{t("Exterior_Color")} :</label>
            <Text_selector
              options={ExteriorColor}
              placeholder={t("white")}
              value={formData.ex_color}
              onChange={(value) => handleInputChange("ex_color", String(value))}
              error={errors.ex_color}
            />
          </div>
        </div>
        <div className="flex flex-wrap w-full items-center justify-between  gap-3">
          <div className="selector w-full md:w-1/4">
            <label>{t("Interior_Color")} :</label>
            <Text_selector
              options={InteriorColor}
              placeholder={t("white")}
              value={formData.in_color}
              onChange={(value) => handleInputChange("in_color", String(value))}
              error={errors.in_color}
            />
          </div>
          <div className="selector w-full md:w-1/4">
            <label>{t("Car_Status")} :</label>
            <Text_selector
              options={CarStatusOptions}
              placeholder={t("New")}
              value={formData.car_status}
              onChange={(value) =>
                handleInputChange("car_status", Number(value))
              }
              //     error={errors.car_status}
            />
          </div>
          <div className="selector w-full md:w-1/4">
            <label>{t("Mileage")} :</label>
            <Text_selector
              options={mileageOptions}
              placeholder="50000 KM"
              value={formData.mileage}
              onChange={(value) => handleInputChange("mileage", String(value))}
              //  error={errors.mileage}
            />
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between  gap-3">
          <div className="selector w-full md:w-1/4">
            <label>Location of car</label>
            <DainamicSelector
              Api_URL={`${
                userRole === "ADMIN" ? "admin" : "customer"
              }/countries?is_shown_auction=1`}
              placeholder="Canada"
              value={formData.location_of_car}
              onChange={(value) => handleInputChange("location_of_car", value)}
            />
          </div>
          <div className="selector w-full md:w-1/4">
            <label>{t("Shipping_from")} :</label>
            <Text_selector
              options={[{ value: "torento", label: "Torento" }]}
              placeholder={t("Port_Shipping")}
              value={formData.shipping_from}
              onChange={(value) =>
                handleInputChange("shipping_from", String(value))
              }
              //  error={errors.mileage}
            />
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between  gap-3">
          <div className="selector w-full md:w-1/4">
            <label>{t("Price")} :</label>
            <Text_input
              placeholder="2000 RO"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              //   error={errors.price}
            />
          </div>
          <div className="selector w-full md:w-1/4">
            <label>{t("VIN_NO")}</label>
            <Text_input
              placeholder="UK02584...."
              value={formData.vin}
              onChange={(e) => handleInputChange("vin", e.target.value)}
              //   error={errors.price}
            />
          </div>
          <div className="py-[10px] w-full md:w-2/5">
            <label className="mb-1 block font-semibold">{t("Carfax")}</label>
            <Text_selector
              options={CarfaxOptions}
              placeholder={
                t("Available") + " " + t("or") + " " + t("Not_available")
              }
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
          label={t("Upload_bill") + "*"}
        />
      </div>
      <div className="flex  md:w-1/3 justify-start  items-center gap-4">
        <FileUploder
          label={t("Upload original")}
          onFileUpload={(fileName) =>
            setFormData((prev) => ({ ...prev, title_pdf: fileName }))
          }
        />
      </div>
      <div className="py-[10px] w-full md:w-2/5">
        <label className="mb-1 block font-semibold">{t("consignee")} :</label>
        <Text_selector
          options={CarfaxOptions}
          placeholder={
            t("Available") + " " + t("or") + " " + t("Not_available")
          }
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
            label={t("Upload_consignee")}
          />
        </div>
      )}
      <p className="text-text_title text-start font-bold text-xl"></p>
      <Chooser
        question={t("use_type_q") + "*"}
        option1={t("use_type_option1")}
        value1={0}
        option2={t("use_type_option2")}
        value2={1}
        value={formData.use_type}
        onChange={(value) => handleInputChange("use_type", Number(value))}
      />
      <div className="w-full md:flex items-center gap-2">
        <div className="w-1/2 flex items-center">
          <Btn_borded
            iconAdd
            onclick={() => {
              setPackageModal(!packageModal);
              setEditingPackageData(null);
            }}
            label={
              formData.package_shippings.length > 0
                ? t("add_another_package")
                : t("add_package")
            }
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-1/2">
          {formData.package_shippings.map((pkg: packages, index: number) => (
            <div
              key={index}
              className="flex gap-2 h-10 items-center justify-center rounded-full px-2 py-1 rounded bg-secondary1 "
            >
              <span
                onClick={() => handleEditPackage(pkg, index)}
                className="text-sm cursor-pointer"
              >
                {t("Package")} : {index + 1}
              </span>

              <Minus
                className="text-red-400 bg-red-200 rounded-full text-lg  cursor-pointer"
                onClick={() => removePackage(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {packageModal && (
        <PackageForm
          onCancel={() => setPackageModal(false)}
          onAddPackage={addPackage}
          initialPackageData={editingPackageData}
          onUpdatePackage={updatePackage}
        />
      )}
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
          {Loading ? (
            <LoadingBTN />
          ) : initialData ? (
            t("Edit_shipping_request")
          ) : (
            t("send_shipping_request")
          )}
        </button>
      </div>
    </div>
  );
}
