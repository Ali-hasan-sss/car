import { languageOption } from "@/components/forms/ordersForms/data";
import DainamicSelector from "@/components/inputs/selectors/DainamicSelector";
import TextSelector from "@/components/inputs/selectors/text_selector";
import LoadingBTN from "@/components/loading/loadingBTN";
import UploadFile from "@/components/uploders/Uploader/UploadFile";
import { useLanguage } from "@/context/LanguageContext";
import { RootState } from "@/store/store";
import { Box, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
export interface UserFormProps {
  initialData: {
    email: string;
    type: number;
    name: string;
    user_id: string;
    mobile: string;
    other_mobile: string;
    country_id: number | null;
    language: string;
    address1: string;
    address2: string;
    city: string;
    zip_code: string;
    id_number: string;
    id_file: string;
    tax_info: string;
    cr_certificate: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  handlClose?: () => void;
  loading: boolean;
  isNew: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  handlClose,
  loading,
  isNew,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [idselect, setIdSelect] = useState(true);
  const { t } = useLanguage();
  const router = useRouter();
  const UserRole = useSelector((state: RootState) => state.auth.user?.userRole);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.includes("@")) newErrors.email = " ";
    if (!formData.type) newErrors.type = " ";
    if (formData.type === 2 && !formData.cr_certificate)
      newErrors.cr_certificate = " ";
    if (!formData.name) newErrors.name = " ";
    if (!formData.mobile) newErrors.mobile = " ";
    if (!formData.country_id) newErrors.country_id = " ";
    if (!formData.address1) newErrors.address1 = " ";
    if (!formData.city) newErrors.city = " ";
    if (!formData.language) newErrors.language = " ";
    if (!formData.id_number) newErrors.id_number = " ";
    if (!formData.id_file) newErrors.id_file = " ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (file: string) => {
    setFormData({ ...formData, id_file: file });
  };
  const handleSkip = async () => {
    router.push("/customer/dashboard");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData);
      onSubmit(formData);
    }
  };

  return (
    <Box className="py-10 px-[1px] md:px-[50px] bg-secondary1 flex items-center justify-center">
      <div className="flex  flex-col items-center justify-center  w-full gap-4">
        <div className="flex flex-col items-center justify-center   w-full gap-10">
          <div className="flex p-5 bg-white flex-col justify-center rounded-xl w-full md:w-3/4 gap-4">
            <h2 className="text-text_title text-xl font-bold">
              {t("Main_Information")}
            </h2>
            {/* Name */}
            <TextField
              label={t("Full_Name")}
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
            />
            {/* Email */}
            <TextField
              label={t("Email")}
              name="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
            />
          </div>
          <div className="flex p-5 bg-white flex-col justify-center rounded-xl w-full md:w-3/4 gap-4">
            <h2 className="text-text_title text-xl font-bold">
              {t("Contact_Information")}
            </h2>
            <div className="flex items-center justify-between gap-4 w-full">
              {/* Mobile */}
              <div className="flex flex-col items-center w-1/2 gap-4 justify-center">
                <TextField
                  label={t("Phone_Num")}
                  name="mobile"
                  fullWidth
                  margin="none"
                  value={formData.mobile}
                  onChange={handleChange}
                  error={!!errors.mobile}
                />
                {/* Address 1 */}
                <TextField
                  label={t("Address")}
                  name="address1"
                  fullWidth
                  margin="none"
                  value={formData.address1}
                  onChange={handleChange}
                  error={!!errors.address1}
                />
                {/* Country Selector */}
                <DainamicSelector
                  placeholder={t("Country")}
                  value={formData.country_id}
                  onChange={(value) =>
                    setFormData({ ...formData, country_id: value })
                  }
                  Api_URL={
                    UserRole === "ADMIN"
                      ? "admin/countries"
                      : "customer/countries"
                  }
                  error={errors.country_id}
                />
                {/* City */}
                <TextField
                  label={t("City")}
                  name="city"
                  fullWidth
                  margin="none"
                  value={formData.city}
                  onChange={handleChange}
                  error={!!errors.city}
                />
              </div>
              <div className="flex flex-col items-center w-1/2 gap-4 justify-center">
                <TextField
                  label={t("Another_mobile")}
                  name="other_mobile"
                  fullWidth
                  margin="none"
                  value={formData.other_mobile}
                  onChange={handleChange}
                  error={!!errors.other_mobile}
                />
                {/* Address 2 */}
                <TextField
                  label={t("Another_Address")}
                  name="address2"
                  fullWidth
                  margin="none"
                  value={formData.address2}
                  onChange={handleChange}
                />
                {/* Language */}
                <TextSelector
                  placeholder={t("language")}
                  options={languageOption}
                  onChange={(value) => {
                    setFormData({ ...formData, language: String(value) });
                  }}
                  value={formData.language}
                  error={errors.language}
                />
                {/* Zip Code */}
                <TextField
                  label={t("ZIP_Code")}
                  name="zip_code"
                  fullWidth
                  margin="none"
                  value={formData.zip_code}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex p-5 bg-white flex-col justify-center rounded-xl w-full md:w-3/4 gap-4">
            <h2 className="text-text_title text-xl font-bold">
              {t("ID_Details")}{" "}
            </h2>
            <div className="flex items-center gap-4 w-full">
              <button
                className={` px-5 py-1 ${
                  idselect ? "button_outline" : "button_bordered"
                }`}
                onClick={() => setIdSelect(true)}
              >
                {t("id")}
              </button>
              <button
                className={` px-5 py-1 ${
                  !idselect ? "button_outline" : "button_bordered"
                }`}
                onClick={() => setIdSelect(false)}
              >
                {t("Passport")}
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 w-full">
              <div className="flex flex-col items-center w-full  md:w-1/2 gap-4 justify-center">
                {/* ID Number */}

                <TextField
                  label={idselect ? t("id_NO") : t("Passport_NO")}
                  name="id_number"
                  fullWidth
                  margin="normal"
                  value={formData.id_number}
                  onChange={handleChange}
                  error={!!errors.id_number}
                />

                {/* ID File */}
                <UploadFile
                  label={idselect ? t("id_Scan") : t("Passport_Scan")}
                  onFileUpload={(file) => handleFileChange(file)}
                />
                {/* Tax Info (Optional for Type 2) */}
                {formData.type === 2 && (
                  <>
                    <UploadFile
                      label={t("CR")}
                      onFileUpload={(file) =>
                        setFormData({ ...formData, cr_certificate: file })
                      }
                    />
                    <TextField
                      label={t("Tax")}
                      name="tax_info"
                      fullWidth
                      margin="normal"
                      value={formData.tax_info}
                      onChange={handleChange}
                      error={!!errors.tax_info}
                    />
                  </>
                )}
              </div>
            </div>
            {/* Submit Button */}
            <div className="flex items-center justify-between mt-5 w-full">
              {isNew ? (
                <button
                  className="button_bordered py-2 px-5"
                  onClick={handleSkip}
                  disabled={loading}
                >
                  {t("Skip")}
                </button>
              ) : (
                <button
                  className="button_bordered py-2 px-5"
                  onClick={handlClose}
                  disabled={loading}
                >
                  {t("Close")}
                </button>
              )}
              <button
                type="submit"
                className="button_outline py-2 px-5"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <LoadingBTN /> : isNew ? t("Send") : t("Edit")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default UserForm;
