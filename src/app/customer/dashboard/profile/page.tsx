"use client";

import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { CircularProgress, Dialog } from "@mui/material";
import UserForm from "@/components/adminComponents/forms/UserForm";
import DeleteMessage from "@/components/messags/deleteMessage";
import {
  FaBuilding,
  FaCheckCircle,
  FaEdit,
  FaTimesCircle,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import Loader from "@/components/loading/loadingPage";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [userData, setUserData] = useState(user || null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [formData] = useState<{
    email: string;
    type: number;
    name: string;
    user_id: string;
    mobile: string;
    other_mobile: string;
    country_id: number | null; // Ensure this field supports both number and null
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
    country_id: null, // Default value is null
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
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const userId =
          user?.id || JSON.parse(localStorage.getItem("user") || "{}").id;
        if (userId) {
          const response = await axios.get(`/api/users/${userId}`);
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
  const handleDelete = () => {
    setOpenDelete(true);
  };
  const handleDeleteSuccess = () => {
    console.log("User deleted successfully");
  };
  const handleEdit = () => {
    setModalOpen(true);
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      //   const response = await axiosInstance.post("customer/profile", formData);
      // const { id, name, type, email, is_full_data, contact, idDetail } =
      //   response.data.data;

      // تقسيم الاسم إلى اسم أول واسم ثاني
      // const [first_name, last_name] = name.split(" ");
      // const userData = {
      //   id,
      //   email,
      //   first_name: first_name || "",
      //   last_name: last_name || "",
      //   userRole: type === 1 ? "USER" : "COMPANY",
      //   type, // نوع المستخدم (1 أو 2)
      //   is_full_data: is_full_data === 1,
      //   contact: contact || null,
      //   idDetail: idDetail || null,
      // };
    } catch (error) {
      console.error("خطأ أثناء التسجيل:", error);
      alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };
  if (!userData || loading) return <CircularProgress />;

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
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {userData?.first_name + " " + userData.last_name}
        </h2>

        {userData ? (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="flex items-center gap-2 text-gray-700 ">
                <strong>الاسم:</strong>{" "}
                {userData?.first_name + " " + userData.last_name}
              </p>
              <p className="flex items-center gap-2 text-gray-700 ">
                <strong>البريد الإلكتروني:</strong> {userData.email}
              </p>

              <p className="flex items-center gap-2 text-gray-700">
                <strong>رقم الجوال:</strong> {userData.contact?.mobile || "NA"}
              </p>

              <p className="flex items-center gap-2 text-gray-700 ">
                <strong>رقم جوال اخر:</strong>{" "}
                {userData.contact?.other_mobile || "NA"}
              </p>

              <p className="flex items-center gap-2 text-gray-700 ">
                {userData.type === 1 ? (
                  <>
                    <strong>نوع الحساب:</strong> شخصي{" "}
                    <FaUser className="text-green-500" />
                  </>
                ) : (
                  <>
                    <strong>نوع الحساب:</strong> شركة{" "}
                    <FaBuilding className="text-purple-500" />
                  </>
                )}
              </p>

              <p className="flex items-center gap-2 text-gray-700 ">
                <strong>العنوان:</strong> {userData.contact?.address1 || "NA"}
              </p>

              <p className="flex items-center gap-2 text-gray-700 ">
                <strong>المدينة:</strong> {userData.contact?.city || "NA"}
              </p>

              {userData.type === 2 && (
                <p className="flex items-center gap-2 text-gray-700 ">
                  <strong>الرقم الضريبي:</strong>{" "}
                  {userData.idDetail?.tax_info || "NA"}
                </p>
              )}

              {userData.type === 2 && (
                <p className="flex items-center gap-2 text-gray-700 ">
                  <strong>السجل التجاري:</strong>
                  {userData.idDetail?.cr_certificate ? (
                    <a
                      href={userData.idDetail?.cr_certificate}
                      className="text-blue-500 underline"
                      target="_blank"
                    >
                      عرض
                    </a>
                  ) : (
                    "غير متوفر"
                  )}
                </p>
              )}
            </div>

            {userData.idDetail?.id_file && (
              <div className="mt-4">
                <p className="text-gray-700  font-semibold">صورة الهوية</p>
                <img
                  src={userData.idDetail?.id_file}
                  alt="هوية المستخدم"
                  className="w-56 rounded-lg shadow-md mt-2"
                />
              </div>
            )}

            <div className="flex items-center gap-4 mt-4">
              <strong className="text-gray-700">البيانات مستكملة؟</strong>
              {userData.is_full_data ? (
                <FaCheckCircle className="text-green-500 text-xl" />
              ) : (
                <div className="flex items-center gap-3">
                  <FaTimesCircle className="text-red-500 text-xl" />
                  <button
                    className="text-blue-600 underline"
                    onClick={() => setModalOpen(true)}
                  >
                    استكمال
                  </button>
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
                تعديل
              </button>
              <button
                className="button_close py-1 px-2 flex items-center gap-2"
                onClick={handleDelete}
              >
                <FaTrash />
                حذف
              </button>
            </div>
            {/* <p className="flex text-xs items-center mt-6 gap-2 text-gray-400 ">
              <strong>تاريخ الإنشاء:</strong>
              {createdDate?.toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p> */}
          </div>
        ) : (
          <Loader />
        )}
      </div>

      {/* مودال الحذف */}
      <DeleteMessage
        API="ccc"
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        id={userData.id}
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
};

export default Profile;
