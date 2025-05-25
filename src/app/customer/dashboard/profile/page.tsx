"use client";

import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@mui/material";
import UserForm from "@/components/forms/UserForm";
import { FaBuilding, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import Loader from "@/components/loading/loadingPage";
import NotificationToggle from "@/components/notifications/notif_toggle";
import { setLogout, setUser } from "@/store/slice/authSlice";
import ActionComfirm from "@/components/messags/actionComfirm";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { capitalizeName } from "@/utils/orderUtils";

const Profile = () => {
  const { t } = useLanguage();
  const user = useSelector((state: RootState) => state.auth.user);
  const [userData, setUserData] = useState(user || null);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();
  const [formData] = useState<{
    email: string;
    type: number;
    name: string;
    user_id: number;
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
  }>({
    email: userData?.email || "",
    type: Number(userData?.type) || 0,
    name: userData?.first_name + " " + userData?.last_name || "",
    user_id: userData?.id || 0,
    mobile: userData?.contact?.mobile || "",
    other_mobile: userData?.contact?.other_mobile || "",
    country_id: userData?.contact?.country_id || null,
    language: userData?.contact?.language || "",
    address1: userData?.contact?.address1 || "",
    address2: userData?.contact?.address2 || "",
    city: userData?.contact?.city || "",
    zip_code: userData?.contact?.zip_code || "",
    id_number: userData?.idDetail?.id_number || "",
    id_file: userData?.idDetail?.id_file.split("/").pop() ?? "",
    tax_info: userData?.idDetail?.tax_info || "",
    cr_certificate: userData?.idDetail?.cr_certificate || "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const userId =
          user?.id || JSON.parse(localStorage.getItem("user") || "{}").id;
        if (userId) {
          const response = await axiosInstance.get(`customer/profile`);
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      setUserData(user);
      // fetchUserDetails();
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
        fetchUserDetails();
      }
    }
  }, [user]);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete("customer/deleteMyAccount");
      if (res.data.success) {
        toast.success("Account Deleted successfuly");
        localStorage.removeItem("user");
        dispatch(setLogout());
        window.location.replace("/");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء حذف الحساب");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setModalOpen(true);
  };
  const handleSubmit = async () => {
    try {
      setEditLoading(true);
      const response = await axiosInstance.post("customer/profile", formData);
      const {
        id,
        name,
        type,
        email,
        is_full_data,
        email_verified_at,
        contact,
        idDetail,
      } = response.data.data;
      const [first_name, last_name] = name.split(" ");
      const userData = {
        id,
        email,
        first_name: first_name || "",
        last_name: last_name || "",
        userRole: type === 1 ? "USER" : "USER",
        type,
        IsVerified: email_verified_at,
        is_full_data: is_full_data,
        contact: contact || null,
        idDetail: idDetail || null,
      };
      dispatch(setUser(userData));
      toast.success("edit_profile_success");
      setModalOpen(false);
    } catch (error) {
      console.error("خطأ أثناء التسجيل:", error);
    } finally {
      setEditLoading(false);
    }
  };
  if (!userData || loading) return <Loader />;

  return (
    <div className="p-1 md:p-6 w-full mx-auto bg-white rounded-lg shadow-lg">
      <div className="relative w-full">
        <img
          src="/images/cover.png"
          alt="cover"
          className="h-48 w-full object-cover rounded-t-lg"
        />

        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 z-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="user image"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>
      </div>

      {/* محتوى المستخدم */}
      <div className="mt-16">
        <h2 className="text-sm md:text-2xl font-semibold text-gray-800 mb-6 text-center">
          {capitalizeName(
            `${userData?.first_name ?? ""} ${userData?.last_name ?? ""}`
          )}
        </h2>

        {userData ? (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-sm md:text-xl flex items-center gap-2 text-gray-700 ">
                <strong>{t("Full_Name") + " "}:</strong>{" "}
                {capitalizeName(
                  `${userData?.first_name ?? ""} ${userData?.last_name ?? ""}`
                )}
              </p>
              <p className="text-sm md:text-xl flex items-center gap-2 text-gray-700 ">
                <strong>{t("Email") + " "}:</strong> {userData.email}
              </p>

              <p className="text-sm md:text-xl flex items-center gap-2 text-gray-700">
                <strong>{t("Phone_Num") + " "}:</strong>{" "}
                {userData.contact?.mobile || "-"}
              </p>

              <p className="text-sm md:text-xl flex items-center gap-2 text-gray-700 ">
                <strong>{t("Phone_Num") + "(2)" + " "} :</strong>{" "}
                {userData.contact?.other_mobile || "-"}
              </p>

              <p className="text-sm md:text-xl flex items-center gap-2 text-gray-700 ">
                {userData.type === 1 ? (
                  <>
                    <strong>{t("account_type") + " "}:</strong>{" "}
                    {" " + t("private")}
                    <FaUser className="text-green-500" />
                  </>
                ) : (
                  <>
                    <strong>{t("account_type") + " "}:</strong> {t("company")}
                    <FaBuilding className="text-purple-500" />
                  </>
                )}
              </p>

              <p className="text-sm md:text-xl flex items-center gap-2 text-gray-700 ">
                <strong>{t("Address") + " "}:</strong>{" "}
                {userData.contact?.address1 || "-"}
              </p>
              <p className="text-sm md:text-xl flex items-center gap-2 text-gray-700 ">
                <strong>{t("Address") + "(2)" + " "}:</strong>{" "}
                {userData.contact?.address2 || "-"}
              </p>

              <p className="text-sm md:text-xl flex items-center gap-2 text-gray-700 ">
                <strong>{t("City") + " "}:</strong>{" "}
                {capitalizeName(userData.contact?.city || "-")}
              </p>

              {userData.type === 2 && (
                <p className="text-sm md:text-xl flex items-center gap-2 text-gray-700 ">
                  <strong> {t("Tax") + " "}:</strong>{" "}
                  {userData.idDetail?.tax_info || "-"}
                </p>
              )}

              {userData.type === 2 && (
                <p className="text-sm md:text-xl flex items-center gap-2 text-gray-700 ">
                  <strong>{t("CR") + " "}:</strong>
                  {userData.idDetail?.cr_certificate ? (
                    <a
                      href={userData.idDetail?.cr_certificate}
                      className="text-blue-500 underline"
                      target="_blank"
                    >
                      {t("View")}
                    </a>
                  ) : (
                    "-"
                  )}
                </p>
              )}
            </div>

            {userData.idDetail?.id_file && (
              <div className="mt-4">
                <p className="text-sm md:text-xl text-gray-700  font-semibold">
                  {t("id")}
                </p>
                <img
                  src={userData.idDetail?.id_file}
                  alt="هوية المستخدم"
                  className="w-56 rounded-lg shadow-md mt-2"
                />
              </div>
            )}
            <NotificationToggle />

            {/* أزرار التعديل والحذف */}
            <div className="flex justify-between gap-4 mt-6">
              <button
                className="button_outline px-2 py-1 flex items-center gap-2"
                onClick={handleEdit}
              >
                <FaEdit />
                {t("Edit")}
              </button>
              <button
                className="button_close py-1 px-2 flex items-center gap-2"
                onClick={() => setOpenDelete(true)}
                disabled={loading}
              >
                <FaTrash />
                {t("delete_account")}
              </button>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>

      {/* مودال الحذف */}
      <ActionComfirm
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        message={t("dellete_account_message")}
        onActionSuccess={handleDelete}
      />
      {modalOpen && (
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          className="w-full"
        >
          <UserForm
            onSubmit={handleSubmit}
            handlClose={() => setModalOpen(false)}
            isNew={false}
            initialData={{
              ...formData,
              user_id: String(formData.user_id),
            }}
            loading={editLoading}
          />
        </Dialog>
      )}
    </div>
  );
};

export default Profile;
