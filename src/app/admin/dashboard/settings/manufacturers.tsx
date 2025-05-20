"use client";
import Search_input from "@/components/inputs/search_input";
import Loader from "@/components/loading/loadingPage";
import DeleteMessage from "@/components/messags/deleteMessage";
import { useLanguage } from "@/context/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/store/Reducers/hooks";
import {
  addManufacturerToList,
  deleteManufacturerFromList,
  fetchManufacturers,
  updateManufacturerInList,
} from "@/store/slice/adminManufacturerSlice";
import { Manufacturer } from "@/Types/adminTypes";
import axiosInstance from "@/utils/axiosInstance";
import { IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import CModel from "./CarModel.tsx";
import AnimatedModal from "@/components/modal/AnimatedModal";
import LoadingBTN from "@/components/loading/loadingBTN";

const CarTypes: React.FC = () => {
  const apiUrl = "admin/manufacturers";
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [viewManufact, setViewManufact] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [deletId, setdeletId] = useState(0);
  const [editing, setEditing] = useState<Manufacturer | null>(null);
  const [actionloading, setActionLoading] = useState(false);
  const [newManufacturer, setNewManufacturer] = useState({ id: 0, title: "" });
  const [errors, setErrors] = useState<{ title?: string }>({});

  const dispatch = useAppDispatch();
  const { manufacturers } = useAppSelector((state) => state.adminManufacturer);
  useEffect(() => {
    setLoading(true);
    dispatch(fetchManufacturers())
      .unwrap()
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleOpen = (manufacturer?: Manufacturer) => {
    if (manufacturer) {
      setEditing(manufacturer);
      setNewManufacturer({ id: manufacturer.id, title: manufacturer.title });
    } else {
      setEditing(null);
      setNewManufacturer({ id: 0, title: "" });
    }
    setOpen(true);
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setNewManufacturer({ ...newManufacturer, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    const newErrors: { title?: string } = {};

    if (!newManufacturer.title) newErrors.title = t("Field_Required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setActionLoading(true);
      let response;
      if (editing) {
        response = await axiosInstance.put(
          `${apiUrl}/${editing.id}`,
          newManufacturer
        );
        if (response.data.success) {
          toast.success(t("Edit_Item"));
        } else toast.error(t("Error_Edit_Item"));
      } else {
        response = await axiosInstance.post(apiUrl, newManufacturer);
        if (response.data.success) {
          toast.success(t("Add_Item"));
        } else toast.error(t("Error_Add_Item"));
      }

      if (response.data.success) {
        const newData = response.data.data;

        if (editing) {
          dispatch(updateManufacturerInList(newData));
          toast.success(t("Edit_Item"));
        } else {
          dispatch(addManufacturerToList(newData));
          toast.success(t("Add_Item"));
        }

        setOpen(false);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء حفظ البلد :", error);
      toast.error(t("Error"));
    } finally {
      setActionLoading(false);
    }
  };
  const OpenDeleteMassage = (id: number) => {
    setdeletId(id);
    setOpenDelete(true);
  };
  const filteredCountries = manufacturers.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col  md:flex-row justify-between">
      <div className=" w-full md:w-1/2 p-2 border">
        <div className=" w-full">
          <Search_input value={searchTerm} onChange={setSearchTerm} />
        </div>
        <div className="w-full  ">
          <div className="flex items-center gap-2 justify-between">
            <h3 className="font-bold text-xl text-center">
              {t("Manufacturers")}
            </h3>
            <button
              onClick={() => handleOpen()}
              className="button_outline  py-1 px-2"
            >
              + {t("Add_New_Manufacturer")}
            </button>{" "}
          </div>
          <div className="space-y-4 h-[150px] overflow-y-auto  mt-5 bg-gray-50 rounded-xl e-w-full">
            {loading ? (
              <div className="w-full flex items-center justify-center">
                <Loader />
              </div>
            ) : filteredCountries.length > 0 ? (
              filteredCountries.map((item) => (
                <div
                  key={item.id}
                  className="flex px-3 items-center border-b border-gray-400 w-full gap-4"
                >
                  <div
                    className="w-full px-2 py-1 rounded-xl bg-gray-200 hover:bg-gray-300"
                    role="button"
                    onClick={() => setViewManufact(item.id)}
                  >
                    {item.title}
                  </div>
                  <div className="actions flex items-center justify-end w-full gap-3">
                    <IconButton onClick={() => handleOpen(item)}>
                      <FaEdit className="text-yellow-600 text-xl" />
                    </IconButton>
                    <IconButton onClick={() => OpenDeleteMassage(item.id)}>
                      <FaTrash className="text-red-500 text-xl" />
                    </IconButton>
                  </div>

                  <DeleteMessage
                    API={apiUrl}
                    open={openDelete}
                    handleClose={() => setOpenDelete(false)}
                    id={deletId}
                    onDeleteSuccess={() => {
                      if (deletId) {
                        dispatch(deleteManufacturerFromList(deletId));
                      }
                    }}
                  />
                </div>
              ))
            ) : (
              <Typography className="text-gray-500 text-center">
                {t("No_Manufacturer_Found")}
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div className=" w-full md:w-1/2 p-2 border">
        <CModel id={viewManufact} />
      </div>
      <AnimatedModal
        open={open}
        handleClose={() => setOpen(false)}
        className="w-[400px]"
      >
        <Typography variant="h6" className="font-bold mb-4">
          {editing ? t("Edit_Manufacturer") : t("Add_New_Manufacturer")}
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4 p-3">
          <TextField
            fullWidth
            label={t("Edit_Manufacturer")}
            name="title"
            value={newManufacturer.title}
            onChange={handleChange}
            variant="outlined"
            required
            error={!!errors.title}
            helperText={errors.title}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#008080",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "#008080",
                },
              },
            }}
          />
          <div className="flex justify-between gap-4 mt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="button_close  py-2 px-3"
            >
              {t("Close")}
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="button_outline  py-2 px-3"
              disabled={actionloading}
            >
              {actionloading ? <LoadingBTN /> : editing ? t("Save") : t("Add")}
            </button>
          </div>
        </form>
      </AnimatedModal>
    </div>
  );
};

export default CarTypes;
