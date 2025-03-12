"use client";

import React, { useState } from "react";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance"; // تأكد من تعديل المسار حسب مكان ملفك

const steps = ["معلومات الحساب", "المعلومات الشخصية", "معلومات إضافية"];

const Registration: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "",
    name: "",
    mobile: "",
    country_id: "",
    language: "",
    address1: "",
    address2: "",
    city: "",
    zip_code: "",
    other_mobile: "",
    user_id: "",
    id_number: "",
    id_file: "",
    tax_info: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (activeStep === 0) {
      if (!formData.email.includes("@")) newErrors.email = "بريد غير صالح";
      if (formData.password.length < 8)
        newErrors.password = "يجب أن تكون 8 أحرف على الأقل";
      if (!formData.type) newErrors.type = "مطلوب";
      if (!formData.name) newErrors.name = "مطلوب";
      if (!formData.mobile) newErrors.mobile = "مطلوب";
    } else if (activeStep === 1) {
      if (!formData.country_id) newErrors.country_id = "مطلوب";
      if (!formData.language) newErrors.language = "مطلوب";
      if (!formData.address1) newErrors.address1 = "مطلوب";
      if (!formData.city) newErrors.city = "مطلوب";
      if (!formData.zip_code) newErrors.zip_code = "مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateStep()) {
      if (activeStep === steps.length - 1) {
        try {
          setLoading(true);
          const response = await axiosInstance.post("customer/login", formData);
          console.log("تم التسجيل بنجاح:", response.data);
          router.push("/success"); // توجيه المستخدم بعد نجاح الطلب
        } catch (error) {
          console.error("خطأ أثناء التسجيل:", error);
          alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
        } finally {
          setLoading(false);
        }
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box my={3}>
        {activeStep === 0 && (
          <>
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
            <TextField
              label="كلمة المرور"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label="النوع"
              name="type"
              fullWidth
              margin="normal"
              value={formData.type}
              onChange={handleChange}
              error={!!errors.type}
              helperText={errors.type}
            />
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
          </>
        )}

        {activeStep === 1 && (
          <>
            <TextField
              label="الدولة"
              name="country_id"
              fullWidth
              margin="normal"
              value={formData.country_id}
              onChange={handleChange}
              error={!!errors.country_id}
              helperText={errors.country_id}
            />
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
            <TextField
              label="الرمز البريدي"
              name="zip_code"
              fullWidth
              margin="normal"
              value={formData.zip_code}
              onChange={handleChange}
              error={!!errors.zip_code}
              helperText={errors.zip_code}
            />
          </>
        )}

        {activeStep === 2 && (
          <>
            <TextField
              label="جوال آخر"
              name="other_mobile"
              fullWidth
              margin="normal"
              value={formData.other_mobile}
              onChange={handleChange}
            />
            <TextField
              label="رقم المستخدم"
              name="user_id"
              fullWidth
              margin="normal"
              value={formData.user_id}
              onChange={handleChange}
            />
            <TextField
              label="رقم الهوية"
              name="id_number"
              fullWidth
              margin="normal"
              value={formData.id_number}
              onChange={handleChange}
            />
            <TextField
              label="ملف الهوية"
              name="id_file"
              fullWidth
              margin="normal"
              value={formData.id_file}
              onChange={handleChange}
            />
            <TextField
              label="معلومات ضريبية"
              name="tax_info"
              fullWidth
              margin="normal"
              value={formData.tax_info}
              onChange={handleChange}
            />
          </>
        )}
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={handleBack}>
          رجوع
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading
            ? "جارٍ الإرسال..."
            : activeStep === steps.length - 1
            ? "إرسال"
            : "التالي"}
        </Button>
      </Box>
    </Box>
  );
};

export default Registration;
