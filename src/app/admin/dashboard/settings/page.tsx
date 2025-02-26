"use client";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Box, Modal, TextField, Typography } from "@mui/material";
import SocialMediaSettings from "./socialMidia";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Settings() {
  const [openModal, setOpenModal] = useState("");
  const { t } = useLanguage();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [fireBase, setFireBase] = useState({
    oldFireBase: "",
    newFireBase: "",
  });

  const handleSubmit = async (action: string) => {
    try {
      let data = {};
      let endpoint = "";

      switch (action) {
        case "profile":
          data = {
            first_name: profile.firstName,
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

      await axiosInstance.post(endpoint, data);
      alert("تم التنفيذ بنجاح");
      setOpenModal("");
    } catch (error) {
      alert("حدث خطأ");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-md space-y-6">
      <Typography variant="h4" className="font-bold text-center">
        {t("Settings")}
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          className="button_outline  py-2 px-3"
          onClick={() => setOpenModal("profile")}
        >
          {t("Edit_Profile")}
        </button>
        <button
          className="button_outline  py-2 px-3"
          onClick={() => setOpenModal("password")}
        >
          {t("Change") + " " + t("Password")}
        </button>
        <button
          className="button_outline  py-2 px-3"
          onClick={() => setOpenModal("firebase")}
        >
          {t("Change") + " " + "Firebase Token"}
        </button>
      </div>
      <SocialMediaSettings />

      {/* مودال عام */}
      <Modal open={!!openModal} onClose={() => setOpenModal("")}>
        <Box className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20">
          <Typography variant="h6" className="mb-4">
            {openModal === "profile"
              ? "تعديل الملف الشخصي"
              : openModal === "password"
              ? "تغيير كلمة المرور"
              : "تغيير Firebase Token"}
          </Typography>

          {openModal === "profile" && (
            <>
              <TextField
                fullWidth
                label={t("First_Name")}
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
                className="mb-4"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#008080", // تغيير لون الإطار عند الفوكس
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#008080", // تغيير لون التسمية عند الفوكس
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("Last_Name")}
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
                className="mb-4"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#008080", // تغيير لون الإطار عند الفوكس
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#008080", // تغيير لون التسمية عند الفوكس
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("Email")}
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="mb-2"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#008080", // تغيير لون الإطار عند الفوكس
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#008080", // تغيير لون التسمية عند الفوكس
                    },
                  },
                }}
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
                className="mb-4"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#008080", // تغيير لون الإطار عند الفوكس
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#008080", // تغيير لون التسمية عند الفوكس
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                type="password"
                label={t("New_Password")}
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                className="mb-2"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#008080", // تغيير لون الإطار عند الفوكس
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#008080", // تغيير لون التسمية عند الفوكس
                    },
                  },
                }}
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
                className="mb-4"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#008080", // تغيير لون الإطار عند الفوكس
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#008080", // تغيير لون التسمية عند الفوكس
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="New Firebase Token"
                value={fireBase.newFireBase}
                onChange={(e) =>
                  setFireBase({ ...fireBase, newFireBase: e.target.value })
                }
                className="mb-2"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#008080", // تغيير لون الإطار عند الفوكس
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#008080", // تغيير لون التسمية عند الفوكس
                    },
                  },
                }}
              />
            </>
          )}

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => setOpenModal("")}
              className="button_bordered py-2 bg-red-300 px-3"
            >
              {t("Close")}
            </button>
            <button
              onClick={() => handleSubmit(openModal)}
              className="button_outline  py-2 px-3"
            >
              {t("Save")}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
