"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../../../context/LanguageContext";
import PasswordForm from "@/components/adminComponents/forms/changePassword";
import ProfileForm from "@/components/adminComponents/forms/ProfileForm";
import AnimatedModal from "@/components/modal/AnimatedModal";
import { Switch, Typography } from "@mui/material";
import { Admin } from "@/Types/adminTypes";
import { PulseLoader } from "react-spinners";

import {
  addAdmin,
  getAdmins,
  toggleAdminStatus,
  updateAdmin,
} from "@/store/Actions/AdminActions";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteMessage from "@/components/messags/deleteMessage";
import Loader from "@/components/loading/loadingPage";

export default function Accounts() {
  const [openModal, setOpenModal] = useState<
    "" | "profile" | "password" | "add-admin" | "edit-admin"
  >("");
  const [loadingToggle, setLoadingToggle] = useState<number | null>(null);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [adminsList, setAdminsList] = useState<Admin[]>([]);
  const { t } = useLanguage();
  const user = useSelector((state: RootState) => state.auth.user);

  // جلب قائمة المديرين عند تحميل الصفحة
  useEffect(() => {
    const fetchAdmins = async () => {
      setLoadingAdmins(true);
      try {
        const admins = await getAdmins();
        setAdminsList(admins);
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoadingAdmins(false);
      }
    };
    fetchAdmins();
  }, []);

  // إضافة أو تعديل مدير
  const handleAdminSubmit = async (adminData: Admin) => {
    try {
      if (selectedAdmin) {
        await updateAdmin(adminData.id, adminData);
      } else {
        await addAdmin(adminData);
      }
      const updatedAdmins = await getAdmins();
      setAdminsList(updatedAdmins);
      setOpenModal("");
      setSelectedAdmin(null);
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* معلومات الحساب */}
      <div className="bg-secondary1 p-4 rounded-lg shadow-md">
        <Typography variant="h6" className="mb-2">
          {t("Account Information")}
        </Typography>
        {/* تفاصيل الحساب */}
      </div>

      {/* أزرار التعديل */}
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
          onClick={() => {
            setSelectedAdmin(null);
            setOpenModal("add-admin");
          }}
        >
          {t("Add Admin")}
        </button>
      </div>

      {/* قائمة المديرين */}
      <div className="bg-secondary1 p-4 rounded-lg shadow-md">
        <Typography variant="h6" className="mb-2">
          {t("Admins List")}
        </Typography>

        {loadingAdmins ? (
          <Loader />
        ) : adminsList.length > 0 ? (
          <ul className="space-y-2">
            {adminsList.map((admin) => (
              <li
                key={admin.id}
                className="flex justify-between items-center p-2 border rounded-md"
              >
                <span>
                  {admin.first_name} - {admin.email}
                </span>
                <div className="space-x-2 flex items-center">
                  {/* عنصر ثابت للحجم */}
                  <div className="h-12 flex items-senter justify-center">
                    {loadingToggle === admin.id ? (
                      <PulseLoader size={6} color="#4A90E2" />
                    ) : (
                      <Switch
                        checked={admin.is_active === 1}
                        disabled={loadingToggle === admin.id}
                        onChange={async () => {
                          const newStatus =
                            admin.is_active === 1 ? false : true;
                          setLoadingToggle(admin.id);

                          try {
                            await toggleAdminStatus(
                              admin.id,
                              admin.email,
                              newStatus
                            );
                            setAdminsList((prev) =>
                              prev.map((item) =>
                                item.id === admin.id
                                  ? { ...item, is_active: newStatus ? 1 : 0 }
                                  : item
                              )
                            );
                          } catch (error) {
                            console.error(
                              "Error updating admin status:",
                              error
                            );
                          } finally {
                            setLoadingToggle(null);
                          }
                        }}
                        name="isActive"
                      />
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedAdmin(admin);
                      setOpenModal("edit-admin");
                    }}
                  >
                    <FaEdit className="text-yellow-500" />
                  </button>

                  <button onClick={() => setOpenDelete(true)}>
                    <FaTrash className="text-red-500" />
                  </button>
                  <DeleteMessage
                    API={`/admin/admins`}
                    open={openDelete}
                    handleClose={() => setOpenDelete(false)}
                    id={admin.id}
                    onDeleteSuccess={(id) => {
                      setAdminsList((prev) =>
                        prev.filter((admin) => admin.id !== id)
                      );
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>{t("No Admins Found")}</p>
        )}
      </div>

      {/* مودال التعديل */}
      <AnimatedModal
        open={openModal !== ""}
        handleClose={() => setOpenModal("")}
        className="w-[400px]"
      >
        <Typography variant="h6" className="mb-4">
          {openModal === "profile"
            ? t("Edit_Profile")
            : openModal === "password"
            ? t("Change") + " " + t("Password")
            : openModal === "add-admin"
            ? t("Add Admin")
            : t("Edit Admin")}
        </Typography>

        {openModal === "profile" && (
          <ProfileForm
            onSubmit={handleAdminSubmit}
            initialData={user as Admin}
            onClose={() => setOpenModal("")}
          />
        )}

        {openModal === "password" && (
          <PasswordForm onClose={() => setOpenModal("")} />
        )}

        {(openModal === "add-admin" || openModal === "edit-admin") && (
          <ProfileForm
            initialData={selectedAdmin ?? undefined} // لا يتم تمرير بيانات عند إضافة مدير جديد
            onSubmit={handleAdminSubmit}
            isNew={openModal === "add-admin"}
            onClose={() => {
              setOpenModal("");
              setSelectedAdmin(null);
            }}
          />
        )}
      </AnimatedModal>
    </div>
  );
}
