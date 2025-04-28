import Text_selector from "@/components/inputs/selectors/text_selector";
import {
  DimensionunitOptions,
  packageTypeOptions,
  WeightUnitOptions,
} from "../data";
import { packages } from "@/Types/AuctionTypes";
import { useEffect, useState } from "react";
import Number_input from "@/components/inputs/number_input";
import { useLanguage } from "@/context/LanguageContext";
interface PackageFormProps {
  onCancel: () => void;
  onAddPackage: (newPackage: packages) => void;
  onUpdatePackage: (updatedPackage: packages) => void;
  initialPackageData?: packages | null;
}

export default function PackageForm({
  onCancel,
  onAddPackage,
  onUpdatePackage,
  initialPackageData,
}: PackageFormProps) {
  const { t } = useLanguage();
  const [packageData, setPackageData] = useState<packages>({
    package_type: 0,
    pieces: 0,
    description: "",
    unit: 1,
    lenght: 0,
    width: 0,
    height: 0,
    Weight_unit: 0,
    item_weight: 0,
    item_value: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!packageData.package_type) newErrors.package_type = " ";
    if (!packageData.pieces) newErrors.pieces = " ";
    if (!packageData.height) newErrors.height = " ";
    if (!packageData.width) newErrors.width = " ";
    if (!packageData.lenght) newErrors.lenght = " ";
    if (!packageData.item_weight) newErrors.item_weight = " ";
    if (!packageData.item_value) newErrors.item_value = " ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (initialPackageData) {
      setPackageData(initialPackageData);
    }
  }, [initialPackageData]);

  const handleInputChange = <T extends keyof packages>(
    key: T,
    value: packages[T]
  ): void => {
    setPackageData((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = () => {
    if (initialPackageData) {
      if (validateForm()) {
        setPackageData(initialPackageData);
        onUpdatePackage(packageData);
        onCancel();
      }
    } else {
      if (validateForm()) {
        onAddPackage(packageData);
        onCancel();
      }
    }
    console.log("editing:", initialPackageData);
  };

  return (
    <div className="flex mt-4 flex-col w-full items-start gap-4">
      <div className="flex items-center justify-start gap-1">
        <img src="/images/package.png" alt="info" className="w-[20px]" />
        <h2 className="text-text_title text-xl font-bold">
          {t("Package_information")}
        </h2>
      </div>
      <p className="text-text_des text-start font-bold text-lg">
        {t("Package_information_des")}
      </p>

      <div className="flex flex-wrap items-center w-full justify-between">
        {/* Package Type */}
        <div className="py-[10px] w-full md:w-1/3">
          <label className="mb-1 block text-sm">{t("Package_type")} *</label>
          <Text_selector
            options={packageTypeOptions}
            placeholder={t("Battery")}
            value={packageData.package_type}
            onChange={(value) =>
              handleInputChange("package_type", Number(value))
            }
            error={errors.package_type}
          />
        </div>

        {/* Pieces */}
        <div className="py-[10px] w-full md:w-1/3">
          <label className="mb-1 block text-sm">{t("Pieces")} *</label>
          <Number_input
            placeholder="1 , 2 , 3 ..."
            value={packageData.pieces}
            onChange={(e) =>
              handleInputChange("pieces", Number(e.target.value))
            }
            error={errors.pieces}
          />
        </div>

        {/* Description */}
        <div className="py-[10px] w-full">
          <label className="mb-1 block text-sm">{t("Description")}</label>
          <textarea
            className="border border-gray-400 w-full outline-none rounded p-1"
            placeholder="Enter ..."
            value={packageData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>

        {/* Dimension Unit */}
        <div className="py-[10px] w-full md:w-1/5">
          <label className="mb-1 block text-sm">{t("Dimension_unit")}</label>
          <Text_selector
            options={DimensionunitOptions}
            placeholder="Select"
            value={packageData.unit}
            onChange={(value) => handleInputChange("unit", Number(value))}
          />
        </div>

        {/* Length */}
        <div className="py-[10px] w-full md:w-1/5">
          <label className="mb-1 block text-sm">{t("Length")}</label>
          <Number_input
            placeholder="Enter..."
            value={packageData.lenght}
            onChange={(e) =>
              handleInputChange("lenght", Number(e.target.value))
            }
            error={errors.lenght}
          />
        </div>

        {/* Width */}
        <div className="py-[10px] w-full md:w-1/5">
          <label className="mb-1 block text-sm">{t("Width")}</label>
          <Number_input
            placeholder="Enter..."
            value={packageData.width}
            onChange={(e) => handleInputChange("width", Number(e.target.value))}
            error={errors.width}
          />
        </div>

        {/* Height */}
        <div className="py-[10px] w-full md:w-1/5">
          <label className="mb-1 block text-sm">{t("Height")}</label>
          <Number_input
            placeholder="Enter..."
            value={packageData.height}
            onChange={(e) =>
              handleInputChange("height", Number(e.target.value))
            }
            error={errors.height}
          />
        </div>

        {/* Weight Section */}
        <div className="w-full items-center gap-4 md:flex">
          {/* Weight Unit */}
          <div className="py-[10px] w-full md:w-1/4">
            <label className="mb-1 block text-sm">{t("Weight_Unit")}</label>
            <Text_selector
              options={WeightUnitOptions}
              placeholder="Select"
              value={packageData.Weight_unit}
              onChange={(value) =>
                handleInputChange("Weight_unit", Number(value))
              }
            />
          </div>

          {/* Item Weight */}
          <div className="py-[10px] w-full md:w-1/4">
            <label className="mb-1 block text-sm">{t("Item_weight")}</label>
            <Number_input
              placeholder="Enter..."
              value={packageData.item_weight}
              onChange={(e) =>
                handleInputChange("item_weight", Number(e.target.value))
              }
              error={errors.item_weight}
            />
          </div>

          {/* Total Weight */}
          <div className="py-[10px] flex items-center mt-6 justify-center w-full md:w-1/4">
            <p className="text-sm">
              {"Total_weight"}:{" "}
              <span className="mx-1 py-1 px-2 rounded-full bg-yellow-400">
                {packageData.item_weight * packageData.pieces}{" "}
                {packageData.Weight_unit === 1 ? "Kg" : "Ton"}
              </span>
            </p>
          </div>
        </div>

        {/* Item Value */}
        <div className="py-[10px] gap-1 w-full md:w-1/2">
          <label className="mb-1 block text-sm">{t("Item_value")}</label>
          <div className="flex items-center">
            <Number_input
              placeholder="1000$"
              value={packageData.item_value}
              onChange={(e) =>
                handleInputChange("item_value", Number(e.target.value))
              }
              error={errors.item_value}
            />
            <div className="py-[10px] flex w-1/2 items-center justify-center">
              <p className="text-sm mt-3">
                {"Total_value"}:
                <span className="mx-1 py-1 px-2 rounded-full bg-green-400">
                  $ {packageData.item_value * packageData.pieces}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center mt-4 gap-5">
          <button className="button_outline px-3 py-1" onClick={handleSubmit}>
            + {t("add_package")}
          </button>
          <button className="button_bordered px-3 py-1" onClick={onCancel}>
            {t("Cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
