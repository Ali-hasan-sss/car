"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { TextField, Typography } from "@mui/material";
import SocialMediaSettings from "./socialMidia";
import { useLanguage } from "@/app/context/LanguageContext";
import { toast } from "sonner";
import LoadingBTN from "../../../../components/loading/loadingBTN";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/slice/authSlice";
import { UpdatedProfile } from "@/Types/adminTypes";
import { RootState } from "@/store/store";
import AnimatedModal from "@/components/modal/AnimatedModal";

export default function Settings() {
  const [openModal, setOpenModal] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const dispatch = useDispatch();

  // جلب بيانات المستخدم من Redux
  const user = useSelector((state: RootState) => state.auth.user);

  // حالة تخزين بيانات المستخدم عند فتح الصفحة
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [fireBase, setFireBase] = useState({
    oldFireBase: "",
    newFireBase: "",
  });

  // تحديث بيانات الملف الشخصي عند تعديل Redux
  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName, // تأكد أن Redux يخزنها بنفس الصيغة
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user]);

  const handleSubmit = async (action: string) => {
    try {
      setLoading(true);
      let data = {};
      let endpoint = "";

      switch (action) {
        case "profile":
          data = {
            first_name: profile.firstName, // تحويل الاسم هنا
            last_name: profile.lastName,
            email: profile.email,
          };
          endpoint = "admin/profile";
          break;
        case "password":
          data = {
            old_password: passwords.oldPassword,
            new_password: passwords.newPassword,
          };
          endpoint = "admin/password";
          break;
        case "firebase":
          data = {
            old_firebase_token: fireBase.oldFireBase,
            firebase_token: fireBase.newFireBase,
          };
          endpoint = "admin/editFirebaseToken";
          break;
      }

      const response = await axiosInstance.post(endpoint, data);

      if (action === "profile") {
        const updatedProfile: UpdatedProfile = {
          ...user,
          firstName: response.data.data.first_name, // تأكد من تحويلها عند التحديث
          lastName: response.data.data.last_name,
          email: response.data.data.email,
        };

        dispatch(setUser(updatedProfile));
        localStorage.setItem("user", JSON.stringify(updatedProfile));
        setProfile(updatedProfile);
      }

      toast.success(t("Edit_Success"));
      setOpenModal("");
    } catch (error) {
      toast.error(t("Edit_Error"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md space-y-6">
      <Typography variant="h4" className="font-bold text-center">
        {t("Settings")}
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          className="button_outline py-2 px-3"
          onClick={() => setOpenModal("profile")}
        >
          {t("Edit_Profile")}
        </button>
        <button
          className="button_outline py-2 px-3"
          onClick={() => setOpenModal("password")}
        >
          {t("Change") + " " + t("Password")}
        </button>
        <button
          className="button_outline py-2 px-3"
          onClick={() => setOpenModal("firebase")}
        >
          {t("Change") + " " + "Firebase Token"}
        </button>
      </div>
      <SocialMediaSettings />

      {/* مودال عام */}
      <AnimatedModal
        open={
          openModal === "profile" ||
          openModal === "password" ||
          openModal === "firebase"
        }
        handleClose={() => setOpenModal("")}
        className="w-[400px]"
      >
        <Typography variant="h6" className="mb-4">
          {openModal === "profile"
            ? t("Edit_Profile")
            : openModal === "password"
            ? t("Change") + " " + t("Password")
            : t("Change") + " " + "Firebase Token"}
        </Typography>

        {openModal === "profile" && (
          <>
            <TextField
              fullWidth
              label={t("First_Name")}
              value={profile.firstName} // تأكد من استخدام نفس المفتاح هنا
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label={t("Last_Name")}
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("Email")}
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              sx={{ mb: 2 }}
            />
          </>
        )}

        {openModal === "password" && (
          <>
            <TextField
              fullWidth
              type="password"
              label={t("Old_Password")}
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label={t("New_Password")}
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              sx={{ mb: 2 }}
            />
          </>
        )}

        {openModal === "firebase" && (
          <>
            <TextField
              fullWidth
              label="Old Firebase Token"
              value={fireBase.oldFireBase}
              onChange={(e) =>
                setFireBase({ ...fireBase, oldFireBase: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="New Firebase Token"
              value={fireBase.newFireBase}
              onChange={(e) =>
                setFireBase({ ...fireBase, newFireBase: e.target.value })
              }
              sx={{ mb: 2 }}
            />
          </>
        )}

        <div className="flex justify-between gap-4 mt-4">
          <button
            onClick={() => setOpenModal("")}
            className="button_close py-2  px-3"
          >
            {t("Close")}
          </button>
          <button
            type="submit"
            onClick={() => handleSubmit(openModal)}
            className="button_outline py-2 px-3"
          >
            {loading ? <LoadingBTN /> : t("Save")}
          </button>
        </div>
      </AnimatedModal>
    </div>
  );
}
