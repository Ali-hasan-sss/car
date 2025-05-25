"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import DeleteMessage from "@/components/messags/deleteMessage";
import { UserData } from "@/Types/userTypes";
import {
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaBuilding,
  FaUser,
} from "react-icons/fa";
import { Dialog } from "@mui/material";
import UserForm from "@/components/forms/UserForm";
import Loader from "@/components/loading/loadingPage";
import { initialData } from "@/Types/adminTypes";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { capitalizeName } from "@/utils/orderUtils";

export default function User() {
  const { t } = useLanguage();
  const [id, setId] = useState(0);
  useEffect(() => {
    const storedid = localStorage.getItem("itemselected");
    if (storedid) {
      setId(Number(storedid));
    }
  }, []);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = { get: `admin/users/${id}`, delete: "admin/users" };

  const fetchUserData = async () => {
    if (id !== 0) {
      try {
        const res = await axiosInstance.get(apiUrl.get);
        setUserData(res.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };
  const [formData, setFormData] = useState<{
    email: string;
    type: number;
    name: string;
    user_id: string;
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
    email: "",
    type: 1,
    name: "",
    user_id: "",
    mobile: "",
    other_mobile: "",
    country_id: null,
    language: "",
    address1: "",
    address2: "",
    city: "",
    zip_code: "",
    id_number: "",
    id_file: "",
    tax_info: "",
    cr_certificate: "",
  });
  useEffect(() => {
    const initializeFormData = () => {
      if (userData) {
        const initialData = {
          email: userData?.email || "",
          type: Number(userData?.type) || 1,
          name: userData.name,
          user_id: String(userData?.id || ""),
          mobile: userData?.contact?.mobile || "",
          other_mobile: userData?.contact?.other_mobile || "",
          country_id: userData?.contact?.country_id ?? null,
          language: userData?.contact?.language || "",
          address1: userData?.contact?.address1 || "",
          address2: userData?.contact?.address2 || "",
          city: userData?.contact?.city || "",
          zip_code: userData?.contact?.zip_code || "",
          id_number: userData?.idDetail?.id_number || "",
          id_file: userData?.idDetail?.id_file.split("/").pop() ?? "",
          tax_info: userData?.idDetail?.tax_info || "",
          cr_certificate:
            userData?.idDetail?.cr_certificate?.split("/").pop() ?? "",
        };
        setFormData(initialData);
      }
    };

    if (userData) {
      initializeFormData();
    }
  }, [userData]);
  const handleSubmit = async (formData: initialData) => {
    try {
      setLoading(true);
      await axiosInstance.put(`admin/users/${formData.user_id}`, formData);
      toast.success(t("edit_user_success"));
    } catch (error) {
      console.error("خطأ أثناء التسجيل:", error);
      alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchUserData();
    }
  }, [id]);
  const createdDate = userData && new Date(userData.created_at);

  const handleDeleteSuccess = () => {
    console.log("User deleted successfully");
    window.location.replace("/admin/dashboard/users");
  };
  const handleEdit = () => {
    setModalOpen(true);
  };

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-lg">
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
          {capitalizeName(`${userData?.name ?? ""}`)}
        </h2>

        {userData ? (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-sm md:text-xl flex items-center gap-2 text-gray-700 ">
                <strong>{t("Full_Name") + " "}:</strong>{" "}
                {capitalizeName(`${userData?.name ?? ""}`)}
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

            <div className="flex items-center gap-4 mt-4">
              <strong className="text-gray-700"> full data?</strong>
              {userData.is_full_data ? (
                <FaCheckCircle className="text-green-500 text-xl" />
              ) : (
                <div className="flex items-center gap-3">
                  <FaTimesCircle className="text-red-500 text-xl" />
                </div>
              )}
            </div>

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
                {t("Delete")}
              </button>
            </div>
            <p className="flex text-xs items-center mt-6 gap-2 text-gray-400 ">
              <strong>created at:</strong>
              {createdDate?.toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ) : (
          <Loader />
        )}
      </div>

      {/* مودال الحذف */}
      <DeleteMessage
        API={apiUrl.delete}
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        id={id}
        onDeleteSuccess={handleDeleteSuccess}
      />
      {modalOpen && (
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
          <UserForm
            onSubmit={handleSubmit}
            handlClose={() => setModalOpen(false)}
            isNew={false}
            initialData={formData}
            loading={loading}
          />
        </Dialog>
      )}
    </div>
  );
}
