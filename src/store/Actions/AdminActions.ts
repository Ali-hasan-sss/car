import { Admin } from "@/Types/adminTypes";
import axiosInstance from "@/utils/axiosInstance";

const API_BASE_URL = "admin/admins";

export const getAdmins = async () => {
  try {
    const response = await axiosInstance.get(API_BASE_URL);
    console.log("Response data:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
};

export const fetchAdminById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching admin by ID:", error);
    throw error;
  }
};

export const addAdmin = async (adminData: Admin) => {
  try {
    const response = await axiosInstance.post(API_BASE_URL, adminData);
    return response.data.data;
  } catch (error) {
    console.error("Error adding admin:", error);
    throw error;
  }
};

export const updateAdmin = async (id: number, adminData: Admin) => {
  try {
    const response = await axiosInstance.put(
      `${API_BASE_URL}/${id}`,
      adminData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw error;
  }
};

export const toggleAdminStatus = async (
  id: number,
  email: string,
  isActive: boolean
) => {
  try {
    const adminData = {
      email: email, // إرسال الإيميل
      is_active: isActive ? 1 : 0, // تحويل true إلى 1 و false إلى 0
    };

    const response = await axiosInstance.put(
      `${API_BASE_URL}/${id}`,
      adminData
    );

    return response.data.data;
  } catch (error) {
    console.error("Error toggling admin status:", error);
    throw error;
  }
};
