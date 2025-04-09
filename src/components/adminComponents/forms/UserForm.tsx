import { languageOption } from "@/app/customer/dashboard/ordersForms/data";
import DainamicSelector from "@/components/inputs/selectors/DainamicSelector";
import TextSelector from "@/components/inputs/selectors/text_selector";
import LoadingBTN from "@/components/loading/loadingBTN";
import UploadFile from "@/components/uploders/Uploader/UploadFile";
import { Box, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
  skip: boolean;
}
const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  handlClose,
  loading,
  skip,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [idselect, setIdSelect] = useState(true);
  const router = useRouter();
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.includes("@")) newErrors.email = "بريد غير صالح";
    if (!formData.type) newErrors.type = "مطلوب";
    if (!formData.name) newErrors.name = "مطلوب";
    if (!formData.mobile) newErrors.mobile = "مطلوب";
    if (!formData.country_id) newErrors.country_id = "مطلوب";
    if (!formData.address1) newErrors.address1 = "مطلوب";
    if (!formData.city) newErrors.city = "مطلوب";
    if (!formData.language) newErrors.language = "مطلوب";
    if (!formData.id_number) newErrors.id_number = "مطلوب";
    if (!formData.id_file) newErrors.id_file = "مطلوب";

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
    <Box className="py-10 px-[20px] md:px-[50px] bg-secondary1 flex items-center justify-center">
      <div className="flex  flex-col items-center justify-center  w-full gap-4">
        <div className="flex flex-col items-center justify-center   w-full gap-10">
          <div className="flex p-5 bg-white flex-col justify-center rounded-xl w-full md:w-3/4 gap-4">
            <h2 className="text-text_title text-3xl font-bold">
              Main Information
            </h2>
            {/* Name */}
            <TextField
              label="الاسم"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            {/* Email */}
            <TextField
              label="البريد الإلكتروني"
              name="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>
          <div className="flex p-5 bg-white flex-col justify-center rounded-xl w-full md:w-3/4 gap-4">
            <h2 className="text-text_title text-3xl font-bold">
              Contact Information
            </h2>
            <div className="flex items-center justify-between gap-4 w-full">
              {/* Mobile */}
              <div className="flex flex-col items-center w-1/2 gap-4 justify-center">
                <TextField
                  label="رقم الجوال"
                  name="mobile"
                  fullWidth
                  margin="none"
                  value={formData.mobile}
                  onChange={handleChange}
                  error={!!errors.mobile}
                  helperText={errors.mobile}
                />
                {/* Address 1 */}
                <TextField
                  label="العنوان 1"
                  name="address1"
                  fullWidth
                  margin="none"
                  value={formData.address1}
                  onChange={handleChange}
                  error={!!errors.address1}
                  helperText={errors.address1}
                />
                {/* Country Selector */}
                <DainamicSelector
                  placeholder="Country"
                  value={formData.country_id}
                  onChange={(value) =>
                    setFormData({ ...formData, country_id: value })
                  }
                  Api_URL="customer/countries"
                />
                {/* City */}
                <TextField
                  label="المدينة"
                  name="city"
                  fullWidth
                  margin="none"
                  value={formData.city}
                  onChange={handleChange}
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </div>
              <div className="flex flex-col items-center w-1/2 gap-4 justify-center">
                <TextField
                  label="رقم جوال اخر (اختياري)"
                  name="other_mobile"
                  fullWidth
                  margin="none"
                  value={formData.other_mobile}
                  onChange={handleChange}
                  error={!!errors.other_mobile}
                  helperText={errors.other_mobile}
                />
                {/* Address 2 */}
                <TextField
                  label="العنوان 2 (اختياري)"
                  name="address2"
                  fullWidth
                  margin="none"
                  value={formData.address2}
                  onChange={handleChange}
                />
                {/* Language */}
                <TextSelector
                  placeholder="Language"
                  options={languageOption}
                  onChange={(value) => {
                    setFormData({ ...formData, language: String(value) });
                  }}
                  value={formData.language}
                />
                {/* Zip Code */}
                <TextField
                  label="الرمز البريدي (اختياري)"
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
            <h2 className="text-text_title text-3xl font-bold">ID Details </h2>
            <div className="flex items-center gap-4 w-full">
              <button
                className={` px-5 py-1 ${
                  idselect ? "button_outline" : "button_bordered"
                }`}
                onClick={() => setIdSelect(true)}
              >
                id
              </button>
              <button
                className={` px-5 py-1 ${
                  !idselect ? "button_outline" : "button_bordered"
                }`}
                onClick={() => setIdSelect(false)}
              >
                Passport
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 w-full">
              <div className="flex flex-col items-center w-1/2 gap-4 justify-center">
                {/* ID Number */}

                <TextField
                  label={idselect ? "رقم الهوية" : "رقم جواز السفر  NO"}
                  name="id_number"
                  fullWidth
                  margin="normal"
                  value={formData.id_number}
                  onChange={handleChange}
                  error={!!errors.id_number}
                  helperText={errors.id_number}
                />

                {/* ID File */}
                <UploadFile
                  label={
                    idselect
                      ? "Upload or scan your id "
                      : "Upload or scan your Passport "
                  }
                  onFileUpload={(file) => handleFileChange(file)}
                />
                {/* Tax Info (Optional for Type 2) */}
                {formData.type === 2 && (
                  <>
                    <UploadFile
                      label="السجل التجاري"
                      onFileUpload={(file) =>
                        setFormData({ ...formData, cr_certificate: file })
                      }
                    />
                    <TextField
                      label="المعلومات الضريبية (اختياري)"
                      name="tax_info"
                      fullWidth
                      margin="normal"
                      value={formData.tax_info}
                      onChange={handleChange}
                      error={!!errors.tax_info}
                      helperText={errors.tax_info}
                    />
                  </>
                )}
              </div>
            </div>
            {/* Submit Button */}
            <div className="flex items-center justify-between mt-5 w-full">
              {skip ? (
                <button
                  className="button_bordered py-2 px-5"
                  onClick={handleSkip}
                  disabled={loading}
                >
                  تخطي
                </button>
              ) : (
                <button
                  className="button_bordered py-2 px-5"
                  onClick={handlClose}
                  disabled={loading}
                >
                  أغلاق
                </button>
              )}
              <button
                type="submit"
                className="button_outline py-2 px-5"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <LoadingBTN /> : "إرسال"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default UserForm;
