"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TextField, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import CountrySelector from "@/components/inputs/selectors/DainamicSelector";
import Register_nav from "@/components/header/register_navbar";
import Register_footer from "@/components/footer/Register_footer";
import UploadFile from "@/components/uploders/Uploader/UploadFile";
import LoadingBTN from "@/components/loading/loadingBTN";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slice/authSlice";
import { RootState } from "@/store/store";

const Registration: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [idselect, setIdSelect] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userData = useSelector((state: any) => state.auth.user);
  const is_full_data = useSelector(
    (state: RootState) => state.auth.user?.is_full_data
  );
  const dispatch = useDispatch();
  // Initialize form data with correct types
  const [formData, setFormData] = useState<{
    email: string;
    type: string;
    name: string;
    user_id: string;
    mobile: string;
    other_mobile: string;
    country_id: number | null; // Ensure this field supports both number and null
    language: string;
    address1: string;
    address2: string;
    city: string;
    zip_code: string;
    id_number: string;
    id_file: string;
    passport_file: string;
    tax_info: string;
    cr_certificate: string;
  }>({
    email: "",
    type: "",
    name: "",
    user_id: "",
    mobile: "",
    other_mobile: "",
    country_id: null, // Default value is null
    language: "",
    address1: "",
    address2: "",
    city: "",
    zip_code: "",
    id_number: "",
    id_file: "",
    passport_file: "",
    tax_info: "",
    cr_certificate: "",
  });
  useEffect(() => {
    if (is_full_data) {
      router.push("/customer/dashboard"); // إعادة توجيه المستخدم إلى لوحة التحكم
    }
  }, [router]);
  // Function to initialize form data with only the required fields
  useEffect(() => {
    const initializeFormData = () => {
      const initialData = {
        email: userData?.email || "",
        type: userData?.type || "",
        name: `${userData?.first_name || ""} ${
          userData?.last_name || ""
        }`.trim(),
        user_id: userData?.id || "",
        mobile: userData?.mobile || "",
        other_mobile: userData?.other_mobile || "",
        country_id: userData?.country_id || 0,
        language: userData?.language || "",
        address1: userData?.address1 || "",
        address2: userData?.address2 || "",
        city: userData?.city || "",
        zip_code: userData?.zip_code || "",
        id_number: userData?.id_number || "",
        id_file: userData?.id_file || "",
        passport_file: userData?.passport_file || "",
        tax_info: userData?.tax_info || "",
        cr_certificate: userData?.cr_certificate || "",
      };
      setFormData(initialData);
    };

    if (userData) {
      initializeFormData();
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (file: string) => {
    setFormData({ ...formData, id_file: file });
  };

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

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setLoading(true);
        const response = await axiosInstance.post("customer/profile", formData);
        const { id, name, type, email, is_full_data, contact, idDetail } =
          response.data.data;

        // تقسيم الاسم إلى اسم أول واسم ثاني
        const [first_name, last_name] = name.split(" ");
        const userData = {
          id,
          email,
          first_name: first_name || "",
          last_name: last_name || "",
          userRole: type === 1 ? "USER" : "COMPANY",
          type, // نوع المستخدم (1 أو 2)
          is_full_data: is_full_data === 1,
          contact: contact || null,
          idDetail: idDetail || null,
        };
        dispatch(setUser(userData));
        router.push("/customer/dashboard");
      } catch (error) {
        console.error("خطأ أثناء التسجيل:", error);
        alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSkip = async () => {
    router.push("/customer/dashboard");
  };
  return (
    <Box>
      <Register_nav />
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
                    margin="normal"
                    value={formData.mobile}
                    onChange={handleChange}
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                  />
                  {/* Country Selector */}
                  <CountrySelector
                    value={formData.country_id}
                    onChange={(value) =>
                      setFormData({ ...formData, country_id: value })
                    }
                    Api_URL="customer/countries"
                  />
                  {/* Address 1 */}
                  <TextField
                    label="العنوان 1"
                    name="address1"
                    fullWidth
                    margin="normal"
                    value={formData.address1}
                    onChange={handleChange}
                    error={!!errors.address1}
                    helperText={errors.address1}
                  />
                  {/* City */}
                  <TextField
                    label="المدينة"
                    name="city"
                    fullWidth
                    margin="normal"
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
                    margin="normal"
                    value={formData.other_mobile}
                    onChange={handleChange}
                    error={!!errors.other_mobile}
                    helperText={errors.other_mobile}
                  />
                  {/* Language */}
                  <TextField
                    label="اللغة"
                    name="language"
                    fullWidth
                    margin="normal"
                    value={formData.language}
                    onChange={handleChange}
                    error={!!errors.language}
                    helperText={errors.language}
                  />
                  {/* Address 2 */}
                  <TextField
                    label="العنوان 2 (اختياري)"
                    name="address2"
                    fullWidth
                    margin="normal"
                    value={formData.address2}
                    onChange={handleChange}
                  />
                  {/* Zip Code */}
                  <TextField
                    label="الرمز البريدي (اختياري)"
                    name="zip_code"
                    fullWidth
                    margin="normal"
                    value={formData.zip_code}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex p-5 bg-white flex-col justify-center rounded-xl w-full md:w-3/4 gap-4">
              <h2 className="text-text_title text-3xl font-bold">
                ID Details{" "}
              </h2>
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
                  {formData.type === "2" && (
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
                <button
                  className="button_bordered py-2 px-5"
                  onClick={handleSkip}
                  disabled={loading}
                >
                  تخطي
                </button>
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
      <Register_footer />
    </Box>
  );
};

export default Registration;
