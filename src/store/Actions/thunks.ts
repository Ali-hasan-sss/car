import axiosInstance from "../../utils/axiosInstance";
import { Dispatch } from "redux";
import { fetchAdminsSuccess } from "./adminsActions";
import { Admin } from "../../Types/adminTypes";

export const fetchAdmins = () => async (dispatch: Dispatch) => {
  try {
    const response = await axiosInstance.get<Admin[]>("/admin/admins", {
      headers: {
        lang: "not",
      },
    });
    dispatch(fetchAdminsSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
};
