import { useState, useEffect } from "react";
import { FaPhone, FaEdit, FaSave, FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";
import { IconButton } from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import axiosInstance from "@/utils/axiosInstance";

export default function ContactSection({
  addressItem,
  phoneItem,
  emailItem,
  whatsapplItem,
}) {
  const { t } = useLanguage();
  const [editField, setEditField] = useState<
    "address" | "phone" | "whatsapp" | "email" | null
  >(null);

  const [editValues, setEditValues] = useState({
    address: "",
    phone: "",
    email: "",
    whatsapp: "",
  });

  const [loadingField, setLoadingField] = useState<
    "address" | "phone" | "email" | "whatsapp" | null
  >(null);

  useEffect(() => {
    setEditValues({
      address: addressItem?.link || "",
      phone: phoneItem?.link || "",
      email: emailItem?.link || "",
      whatsapp:
        whatsapplItem?.link?.replace(
          "https://api.whatsapp.com/send/?phone=",
          ""
        ) || "",
    });
  }, [addressItem, phoneItem, emailItem, whatsapplItem]);

  const handleEditClick = (
    field: "address" | "phone" | "whatsapp" | "email"
  ) => {
    setEditField(field);
  };

  const handleChange = (field: string, value: string) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (
    field: "address" | "phone" | "whatsapp" | "email"
  ) => {
    const itemId =
      field === "address"
        ? addressItem?.id
        : field === "phone"
        ? phoneItem?.id
        : field === "whatsapp"
        ? whatsapplItem?.id
        : emailItem?.id;

    if (!itemId) return;

    try {
      setLoadingField(field);

      let linkValue = editValues[field];

      // تعديل رابط واتساب
      if (field === "whatsapp") {
        const phoneNumber = linkValue.replace(/\D/g, "");
        linkValue = `https://api.whatsapp.com/send/?phone=${phoneNumber}`;
      }

      const response = await axiosInstance.put(`/admin/socials/${itemId}`, {
        icon: field,
        link: linkValue,
      });

      if (response.data.success) {
        toast.success(t("Edit_Item"));
      } else {
        toast.error(t("Error_Edit_Item"));
      }

      setEditField(null);
    } catch (error) {
      console.error("حدث خطأ أثناء الحفظ:", error);
    } finally {
      setLoadingField(null);
    }
  };

  const renderRow = (
    label: string,
    icon: React.ReactNode,
    field: "address" | "phone" | "whatsapp" | "email",
    value: string
  ) => (
    <div className="flex flex-col w-full my-5">
      <div className={`flex items-center gap-3 ${value} flex-wrap `}>
        <div className="flex items-center gap-2 w-full sm:w-[30%]">
          {icon}
          <p className="text-sm font-bold whitespace-nowrap text-gray-700">
            {label}:
          </p>
        </div>

        <div className="flex-1 w-full sm:w-[60%]">
          {editField === field ? (
            <input
              className="w-full border-b border-gray-300 px-2 bg-transparent focus:outline-none focus:border-primary1 text-sm py-1 text-gray-800 "
              value={editValues[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              disabled={loadingField === field}
            />
          ) : (
            <span className="text-sm mx-2 text-gray-700  break-words">
              {editValues[field]}
            </span>
          )}
        </div>

        <div>
          <IconButton
            onClick={() =>
              editField === field ? handleSave(field) : handleEditClick(field)
            }
            disabled={loadingField === field}
            size="small"
          >
            {editField === field ? (
              loadingField === field ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-primary1 rounded-full animate-spin" />
              ) : (
                <FaSave className="text-green-600 text-base" />
              )
            ) : (
              <FaEdit className="text-yellow-600 text-base" />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full w-[400px]  mx-auto ">
      <h3 className="font-bold text-start text-xl mb-6 text-center text-gray-800">
        {t("contact_info")}
      </h3>

      {renderRow(
        t("Address"),
        <FaLocationDot className="text-primary1 text-xl min-w-[20px]" />,
        "address",
        editValues.address
      )}
      {renderRow(
        t("Phone_Num"),
        <FaPhone className="text-primary1 text-xl min-w-[20px]" />,
        "phone",
        editValues.phone
      )}
      {renderRow(
        t("Whatsapp_Num"),
        <FaWhatsapp className="text-green-500 text-xl min-w-[20px]" />,
        "whatsapp",
        editValues.whatsapp
      )}
      {renderRow(
        t("Email"),
        <Mail className="text-primary1 text-xl min-w-[20px]" />,
        "email",
        editValues.email
      )}
    </div>
  );
}
