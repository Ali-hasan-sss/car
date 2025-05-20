"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import PasswordForm from "@/components/forms/changePassword";
import ProfileForm from "@/components/forms/ProfileForm";
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
  const [AdminId, setAdminId] = useState(0);
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
    <div className=" w-full gap-6 flex  px-5 ">
      <div className="flex h-[50vh] overflow-y-auto w-[500px] border py-2 px-4 flex-col gap-4">
        {/* معلومات الحساب */}
        <div className="bg-secondary1 font-bold p-4 rounded-sm shadow-md">
          <h3 className="mb-2 text-lg">{t("System_Adminstrator")}</h3>
          {/* تفاصيل الحساب */}
          <p className=" text-sm mt-3 text-gray-600">
            {t("name")}:
            <span className="text-black px-1">
              {user?.first_name + " " + user?.last_name}
            </span>
          </p>
          <p className=" text-sm mt-3 text-gray-600">
            {t("Email")}:<span className="text-black px-1">{user?.email}</span>
          </p>
        </div>

        {/* أزرار التعديل */}
        <div className=" flex items-center gap-4">
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
        </div>
      </div>
      <div className="flex h-[50vh] overflow-y-auto w-[450px] border py-2 px-4 flex-col gap-4">
        {/* قائمة المديرين */}
        <div className="bg-secondary1 flex flex-col gap-2 p-4 rounded-lg shadow-md">
          <Typography className="mb-2 text-3xl font-bold">
            {t("Admins_List")}
          </Typography>
          <button
            className="button_outline w-[200px] py-2 px-3"
            onClick={() => {
              setSelectedAdmin(null);
              setOpenModal("add-admin");
            }}
          >
            {t("Add_Admin")}
          </button>

          {loadingAdmins ? (
            <Loader />
          ) : adminsList.length > 0 ? (
            <ul className="space-y-2">
              {adminsList
                .filter(
                  (item) =>
                    item.email && !"admin@gmail.com".includes(item.email)
                )
                .map((admin) => (
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
                                      ? {
                                          ...item,
                                          is_active: newStatus ? 1 : 0,
                                        }
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

                      <button
                        onClick={() => {
                          setOpenDelete(true);
                          setAdminId(admin.id);
                        }}
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                      <DeleteMessage
                        API={`/admin/admins`}
                        open={openDelete}
                        handleClose={() => setOpenDelete(false)}
                        id={AdminId}
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
            <p>{t("No_Admins_Found")}</p>
          )}
        </div>
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
            ? t("Add_Admin")
            : t("Edit_Admin")}
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
            initialData={
              openModal === "add-admin"
                ? {
                    id: 0,
                    first_name: " ",
                    last_name: " ",
                    email: " ",
                    password: " ",
                    is_active: 1,
                  }
                : selectedAdmin
            }
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
