import { useState, useEffect } from "react";
import { TextField, Switch, FormControlLabel, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import LoadingBTN from "@/components/loading/loadingBTN";
import { RootState } from "@/store/store";
import { Admin } from "@/Types/adminTypes";
import { useLanguage } from "@/app/context/LanguageContext";
import { Eye, EyeOff } from "lucide-react";

interface ProfileFormProps {
  onClose: () => void;
  onSubmit: (adminData: Admin) => Promise<void>;
  initialData?: Admin;
  isNew?: boolean;
}

export default function ProfileForm({
  onClose,
  onSubmit,
  initialData,
  isNew = false,
}: ProfileFormProps) {
  const { t } = useLanguage();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    firstName: initialData?.first_name || user?.first_name || "",
    lastName: initialData?.last_name || user?.last_name || "",
    email: initialData?.email || user?.email || "",
    password: "", // حقل كلمة المرور
    isActive: initialData?.is_active === 1, // تحويل الرقم إلى boolean (1 إلى true و 0 إلى false)
  });

  const [showPassword, setShowPassword] = useState(false); // حالة لإظهار كلمة المرور

  useEffect(() => {
    if (initialData) {
      setProfile({
        firstName: initialData.first_name,
        lastName: initialData.last_name,
        email: initialData.email,
        password: "", // عند التعديل لا يتم تحميل كلمة المرور
        isActive: initialData.is_active === 1, // تحويل الرقم إلى boolean (1 إلى true و 0 إلى false)
      });
    } else if (user) {
      setProfile({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        password: "",
        isActive: user.is_active === 1, // تحويل الرقم إلى boolean (1 إلى true و 0 إلى false)
      });
    }
  }, [initialData, user]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // التحقق من كلمة المرور
      if (profile.password.length < 8) {
        toast.error(t("Password_Length_Error"));
        return;
      }

      const adminData: Admin = {
        id: initialData?.id || 0, // تأكد من تحديد معرف عند التعديل
        first_name: profile.firstName,
        last_name: profile.lastName,
        email: profile.email,
        password: profile.password, // إضافة كلمة المرور
        is_active: profile.isActive ? 1 : 0, // تحويل القيمة إلى string (1 أو 0)
      };

      await onSubmit(adminData);
      toast.success(t("Edit_Success"));
      onClose();
    } catch (error) {
      toast.error(t("Edit_Error"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TextField
        fullWidth
        label={t("First_Name")}
        value={profile.firstName ?? ""}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label={t("Last_Name")}
        value={profile.lastName ?? ""}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label={t("Email")}
        value={profile.email ?? ""}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label={t("Password")}
        type={showPassword ? "text" : "password"}
        value={profile.password ?? ""}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </IconButton>
          ),
        }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={profile.isActive} // تأكد من أن القيمة هنا Boolean
            onChange={(e) =>
              setProfile({ ...profile, isActive: e.target.checked })
            }
            name="isActive"
          />
        }
        label={t("Active")}
      />

      <div className="flex justify-between gap-4 mt-4">
        <button onClick={onClose} className="button_close py-2 px-3">
          {t("Close")}
        </button>
        <button onClick={handleSubmit} className="button_outline py-2 px-3">
          {loading ? <LoadingBTN /> : isNew ? t("Add") : t("Save")}
        </button>
      </div>
    </>
  );
}
