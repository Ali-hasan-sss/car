"use client";
import Search_input from "@/components/inputs/search_input";
import LoadingBTN from "@/components/loading/loadingBTN";
import Loader from "@/components/loading/loadingPage";
import DeleteMessage from "@/components/messags/deleteMessage";
import AnimatedModal from "@/components/modal/AnimatedModal";
import { useLanguage } from "@/context/LanguageContext";
import { fetchCountriesSuccess } from "@/store/slice/countriesSlice";
import { RootState } from "@/store/store";
import { Country } from "@/Types/adminTypes";
import axiosInstance from "@/utils/axiosInstance";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import PortsList from "./ports";

const CountryList = () => {
  const { t } = useLanguage();
  const apiUrl = "admin/countries";

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deletId, setdeletId] = useState(0);
  const [editing, setEditing] = useState<Country | null>(null);
  const [actionloading, setActionLoading] = useState(false);
  const [newCountry, setNewCountry] = useState({ title: "", code: "" });
  const [errors, setErrors] = useState<{ title?: string; code?: string }>({});

  const dispatch = useDispatch();
  const { countriesList, lastUpdated } = useSelector(
    (state: RootState) => state.countries
  );
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(apiUrl);
        if (response.data.success) {
          dispatch(fetchCountriesSuccess(response.data.data));
        }
      } catch (error) {
        console.error("حدث خطأ في جلب بيانات السوشيال ميديا:", error);
      } finally {
        setLoading(false);
      }
    };
    const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 دقائق

    const currentTime = Date.now();
    if (currentTime - lastUpdated >= UPDATE_INTERVAL) {
      fetchCountries();
    }
  }, [dispatch, lastUpdated]);

  const handleOpen = (country?: Country) => {
    if (country) {
      setEditing(country);
      setNewCountry({ title: country.title, code: country.code });
    } else {
      setEditing(null);
      setNewCountry({ title: "", code: "" });
    }
    setOpen(true);
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setNewCountry({ ...newCountry, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    const newErrors: { title?: string; code?: string } = {};

    if (!newCountry.title) newErrors.title = t("Field_Required");
    if (!newCountry.code) newErrors.title = t("Field_Required");
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
          newCountry
        );
        if (response.data.success) {
          toast.success(t("Edit_Item"));
        } else toast.error(t("Error_Edit_Item"));
      } else {
        response = await axiosInstance.post(apiUrl, newCountry);
        if (response.data.success) {
          toast.success(t("Add_Item"));
        } else toast.error(t("Error_Add_Item"));
      }

      if (response.data.success) {
        const updatedList = editing
          ? countriesList.map((item) =>
              item.id === editing.id ? response.data.data : item
            )
          : [...countriesList, response.data.data];

        dispatch(fetchCountriesSuccess(updatedList));
        setOpen(false);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء حفظ البلد :", error);
      toast.error(t("Error"));
    } finally {
      setActionLoading(false);
    }
  };
  const handleDelete = (id) => {
    setdeletId(id);
    setOpenDelete(true);
  };
  const filteredCountries = countriesList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Box className="p-6 bg-white w-full flex  gap-5 items-center justify-between ">
      <div className="w-[400px] h-[300px] border p-2  ">
        <div className="flex items-center gap-2 justify-between">
          <h3 className="font-bold text-xl mb-1 text-start">
            {t("Countries")}
          </h3>
          <button
            onClick={() => handleOpen()}
            className="button_outline  py-1 px-2"
          >
            + {t("Add_New_country")}
          </button>{" "}
        </div>
        <Search_input value={searchTerm} onChange={setSearchTerm} />
        <div className="space-y-4 mt-5 bg-gray-50 h-[150px] overflow-y-auto rounded-xl e-w-full">
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
                {item.title}

                <div className="actions flex items-center justify-end w-full gap-3">
                  <IconButton onClick={() => handleOpen(item)}>
                    <FaEdit className="text-yellow-600 text-xl" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <FaTrash className="text-red-500 text-xl" />
                  </IconButton>
                </div>
                <DeleteMessage
                  API={apiUrl}
                  open={openDelete}
                  handleClose={() => setOpenDelete(false)}
                  id={deletId}
                  onDeleteSuccess={(id) => {
                    dispatch(
                      fetchCountriesSuccess(
                        countriesList.filter((item) => item.id !== id)
                      )
                    );
                  }}
                />
              </div>
            ))
          ) : (
            <Typography className="text-gray-500 text-center">
              {t("No_Countries_Found")}
            </Typography>
          )}
        </div>
      </div>
      <PortsList />
      <AnimatedModal
        open={open}
        handleClose={() => setOpen(false)}
        className="w-[400px]"
      >
        <Typography variant="h6" className="font-bold mb-4">
          {editing ? t("Edit_Country") : t("Add_New_country")}
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4 p-3">
          <TextField
            fullWidth
            label={t("Enter_Country")}
            name="title"
            value={newCountry.title}
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
          <TextField
            fullWidth
            label={t("Enter_code")}
            name="code"
            value={newCountry.code}
            onChange={handleChange}
            variant="outlined"
            required
            error={!!errors.code}
            helperText={errors.code}
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
    </Box>
  );
};

export default CountryList;
