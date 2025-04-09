"use client";
import { useParams, useRouter } from "next/navigation";
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
import { Button, Dialog } from "@mui/material";
import UserForm from "@/components/adminComponents/forms/UserForm";

export default function User() {
  const params = useParams();
  const paramId = params?.id as string;
  const id = Number(paramId);
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = { get: `admin/users/${id}`, delete: "admin/users" };

  const fetchUserData = async () => {
    try {
      const res = await axiosInstance.get(apiUrl.get);
      setUserData(res.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const [formData, setFormData] = useState<{
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
    const initializeFormData = () => {
      if (userData) {
        const initialData = {
          email: userData?.email || "",
          type: Number(userData?.type) || 1, // تحويل type إلى string
          name: userData.name,
          user_id: String(userData?.id || ""), // تحويل user_id إلى string
          mobile: userData?.contact?.mobile || "",
          other_mobile: userData?.contact?.other_mobile || "",
          country_id: userData?.contact?.country_id ?? null, // التأكد من دعم null
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
      router.push("/customer/dashboard");
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

  const handleDelete = () => {
    setOpenDelete(true);
  };
  const handleDeleteSuccess = () => {
    console.log("User deleted successfully");
    router.push("/admin/dashboard/users");
  };
  const handleEdit = () => {
    setModalOpen(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        معلومات المستخدم
      </h2>

      {userData ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="flex items-center gap-2 text-gray-700 ">
              <FaUser className="text-blue-500" /> <strong>الاسم:</strong>{" "}
              {userData.name}
            </p>
            <p className="flex items-center gap-2 text-gray-700 ">
              <strong>البريد الإلكتروني:</strong> {userData.email}
            </p>
            {userData.contact?.mobile && (
              <p className="flex items-center gap-2 text-gray-700">
                <strong>رقم الجوال:</strong> {userData.contact.mobile}
              </p>
            )}
            {userData.contact?.other_mobile && (
              <p className="flex items-center gap-2 text-gray-700 ">
                <strong>رقم جوال اخر:</strong> {userData.contact.other_mobile}
              </p>
            )}
            <p className="flex items-center gap-2 text-gray-700 ">
              {userData.type === 1 ? (
                <>
                  <FaUser className="text-green-500" />{" "}
                  <strong>نوع الحساب:</strong> شخصي
                </>
              ) : (
                <>
                  <FaBuilding className="text-purple-500" />{" "}
                  <strong>نوع الحساب:</strong> شركة
                </>
              )}
            </p>

            {userData.contact?.address1 && (
              <p className="flex items-center gap-2 text-gray-700 ">
                <strong>العنوان:</strong> {userData.contact.address1}
              </p>
            )}
            {userData.contact?.city && (
              <p className="flex items-center gap-2 text-gray-700 ">
                <strong>المدينة:</strong> {userData.contact.city}
              </p>
            )}
            {userData.idDetail?.tax_info && (
              <p className="flex items-center gap-2 text-gray-700 ">
                <strong>الرقم الضريبي:</strong> {userData.idDetail.tax_info}
              </p>
            )}

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
              <FaTimesCircle className="text-red-500 text-xl" />
            )}
          </div>

          {/* أزرار التعديل والحذف */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={handleEdit}
            >
              <FaEdit />
              تعديل
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={handleDelete}
            >
              <FaTrash />
              حذف
            </Button>
          </div>
          <p className="flex items-center gap-2 text-gray-700 ">
            <strong>تاريخ الإنشاء::</strong>
            {createdDate?.toLocaleDateString("ar-EG", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500 ">جاري تحميل البيانات...</p>
      )}

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
            skip={false}
            initialData={formData}
            loading={loading}
          />
        </Dialog>
      )}
    </div>
  );
}
