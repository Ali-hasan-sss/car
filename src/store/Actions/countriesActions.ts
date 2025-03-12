import { Dispatch } from "@reduxjs/toolkit";
import {
  fetchCountriesSuccess,
  addCountry,
  updateCountry,
  deleteCountry,
} from "../slice/countriesSlice";
import { Country } from "../../Types/adminTypes";
import axiosInstance from "@/utils/axiosInstance";

const API_URL = "admin/countries";

export const fetchCountries = () => async (dispatch: Dispatch) => {
  try {
    const response = await axiosInstance.get(API_URL);
    dispatch(fetchCountriesSuccess(response.data.data));
  } catch (error) {
    console.error("فشل في جلب البيانات", error);
  }
};

export const createCountry =
  (newCountry: Omit<Country, "id">) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.post(API_URL, newCountry);
      dispatch(addCountry(response.data.data)); // الدولة المضافة تحتوي على id من السيرفر
    } catch (error) {
      console.error("فشل في إضافة البلد", error);
    }
  };

export const editCountry =
  (updatedCountry: Country) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.put(
        `${API_URL}/${updatedCountry.id}`,
        updatedCountry
      );
      dispatch(updateCountry(response.data.data));
    } catch (error) {
      console.error("فشل في تحديث البلد", error);
    }
  };

export const removeCountry = (id: number) => async (dispatch: Dispatch) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
    dispatch(deleteCountry(id));
  } catch (error) {
    console.error("فشل في حذف البلد", error);
  }
};
