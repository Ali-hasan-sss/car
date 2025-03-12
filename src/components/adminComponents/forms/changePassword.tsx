"use client";
import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import { useLanguage } from "@/app/context/LanguageContext";
import LoadingBTN from "@/components/loading/loadingBTN";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

interface PasswordFormProps {
  onClose: () => void;
}

interface PasswordState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ErrorState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordForm({ onClose }: PasswordFormProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState<PasswordState>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ErrorState>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: keyof PasswordState) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validatePasswords = (): boolean => {
    let valid = true;
    const newErrors: ErrorState = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (passwords.oldPassword === passwords.newPassword) {
      newErrors.newPassword = t(
        "New password must be different from the old password"
      );
      valid = false;
    }

    if (passwords.newPassword.length < 8) {
      newErrors.newPassword = t("Password must be at least 8 characters");
      valid = false;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = t("Passwords do not match");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validatePasswords()) return;

    try {
      setLoading(true);
      const data = {
        old_password: passwords.oldPassword,
        new_password: passwords.newPassword,
      };

      await axiosInstance.post("admin/password", data);
      toast.success(t("Password updated successfully"));
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data?.message === "Current Password not right") {
          setErrors((prev) => ({
            ...prev,
            oldPassword: t("Old password is incorrect"),
          }));
        } else {
          toast.error(t("Edit_Error"));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-5">
      <TextField
        fullWidth
        type={showPassword.oldPassword ? "text" : "password"}
        label={t("Old_Password")}
        value={passwords.oldPassword}
        onChange={(e) =>
          setPasswords({ ...passwords, oldPassword: e.target.value })
        }
        error={!!errors.oldPassword}
        helperText={errors.oldPassword}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => togglePasswordVisibility("oldPassword")}
              >
                {showPassword.oldPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        type={showPassword.newPassword ? "text" : "password"}
        label={t("New_Password")}
        value={passwords.newPassword}
        onChange={(e) =>
          setPasswords({ ...passwords, newPassword: e.target.value })
        }
        error={!!errors.newPassword}
        helperText={errors.newPassword}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                {showPassword.newPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        type={showPassword.confirmPassword ? "text" : "password"}
        label={t("Repeat_Password")}
        value={passwords.confirmPassword}
        onChange={(e) =>
          setPasswords({ ...passwords, confirmPassword: e.target.value })
        }
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {showPassword.confirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className="flex justify-between gap-4 mt-4">
        <button onClick={onClose} className="button_close py-2 px-3">
          {t("Close")}
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="button_outline py-2 px-3"
          disabled={loading}
        >
          {loading ? <LoadingBTN /> : t("Save")}
        </button>
      </div>
    </div>
  );
}
