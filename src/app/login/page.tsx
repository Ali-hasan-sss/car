"use client";
import React, { useState, useEffect } from "react"; // إضافة useEffect
import Register_nav from "@/components/header/register_navbar";
import Register_footer from "@/components/footer/Register_footer";
import "./login.css";
import { useLanguage } from "../../context/LanguageContext";
import { useRouter } from "next/navigation";
import EmailInput from "@/components/inputs/EmailInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import axiosInstance from "@/utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken, setUser } from "@/store/slice/authSlice";
import { RootState } from "@/store/store";
import LoadingBTN from "@/components/loading/loadingBTN";
import { toast } from "sonner";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  // التحقق من حالة تسجيل الدخول عند تحميل المكون
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/customer/dashboard"); // إعادة توجيه المستخدم إلى لوحة التحكم
    }
  }, [isLoggedIn, router]);

  const handleBack = () => {
    router.push("/");
  };

  const [formData, setFormData] = useState<LoginFormInputs>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormInputs>>({});
  const { t } = useLanguage();

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormInputs> = {};
    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح.";
    }
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة.";
    } else if (formData.password.length < 8) {
      newErrors.password = "يجب أن تكون كلمة المرور 8 أحرف على الأقل.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        // محاولة تسجيل الدخول عبر API
        const response = await axiosInstance.post(`customer/login`, formData);
        const {
          id,
          name,
          type,
          email,
          token,
          is_full_data,
          contact,
          idDetail,
        } = response.data.data;

        // تقسيم الاسم إلى اسم أول واسم ثاني
        const [first_name, last_name] = name.split(" ");

        // تحويل البيانات إلى كائن يطابق واجهة User
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

        // تحديث رمز التوثيق في الحالة
        dispatch(setAuthToken(token));

        // تحديث بيانات المستخدم في الحالة
        dispatch(setUser(userData));
        toast.success("تم تسجيل الدخول بنجاح");
        // إعادة توجيه المستخدم إلى لوحة التحكم
        router.push("/customer/dashboard");
      } catch (error) {
        console.error(error);
        toast.error("حدث خطا اثناء تسجيل الدخول");
        setErrors({
          email: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
          password: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // إذا كان المستخدم مسجلًا بالفعل، لا يتم عرض المكون
  if (isLoggedIn) {
    return null; // أو يمكنك عرض رسالة أو إعادة توجيه مباشرة
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Register_nav handleBack={handleBack} />
      <div className="flex-grow flex items-center justify-center bg-secondary1 w-full">
        <div className="container w-full h-full flex items-center justify-center">
          <div className="form_content flex flex-col items-center justify-center gap-[24px] w-[350px] p-[20px] bg-white">
            <div className="header flex flex-col gap-[20px] text-center">
              <h1 className="title">{t("Login")}</h1>
              <p className="des">{t("login_des")}</p>
            </div>
            <form
              className="flex w-full flex-col gap-[24px]"
              onSubmit={handleSubmit}
            >
              <EmailInput
                value={formData.email}
                error={errors.email}
                onChange={handleInputChange}
              />
              <PasswordInput
                value={formData.password}
                error={errors.password}
                onChange={handleInputChange}
              />
              <div className="form_group flex flex-col gap-[8px] items-start justify-start">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center bg-primary1 submit"
                >
                  {loading ? <LoadingBTN /> : t("Login")}
                </button>
                <p className="dont_have">
                  {t("Dont_have_an_account")}
                  <a className="text-blue-500 mx-1" href="/register">
                    {t("Signup")}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Register_footer />
    </div>
  );
};

export default Login;
