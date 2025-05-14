"use client";

import Loader from "@/components/loading/loadingPage";
import DeleteMessage from "@/components/messags/deleteMessage";
import UploadFile from "@/components/uploders/Uploader/UploadFile";
import { useLanguage } from "@/context/LanguageContext";
import {
  deleteService,
  singleServiceSuccess,
  updateService,
} from "@/store/Reducers/servicesReducer";

import { RootState } from "@/store/store";
import axiosInstance from "@/utils/axiosInstance";
import { base_url } from "@/utils/domain";
import { Switch, TextField } from "@mui/material";
import { ChevronDown, ChevronUp, Edit, Loader2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function ServiceDetails() {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const [isArabic, setIsArabic] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingloading, seteditingLoading] = useState(false);
  const service = useSelector(
    (state: RootState) => state.services.selectedService
  );
  const [formData, setFormData] = useState({
    image: service?.image,
    title: { ar: service?.title.ar || "", en: service?.title.en || "" },
    body: { ar: service?.body.ar || "", en: service?.body.en || "" },
    description: {
      ar: service?.description.ar || "",
      en: service?.description.en || "",
    },
  });
  const BASE_IMAGE_URL = `https://${base_url}/assets/img/common/`;
  const initData = () => {
    if (service) {
      setFormData({
        image: service?.image ? service.image.split("/").pop() : "",
        title: { ar: service.title.ar, en: service.title.en },
        body: { ar: service.body.ar, en: service.body.en },
        description: { ar: service.description.ar, en: service.description.en },
      });
    }
  };
  const [id, setId] = useState(0);
  useEffect(() => {
    if (localStorage !== undefined) {
      const storedid = localStorage.getItem("itemselected");
      setId(Number(storedid));
    }
  }, []);

  const fetchService = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/admin/services/${id}`);
      dispatch(singleServiceSuccess(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id !== 0) {
      fetchService();
    }
  }, [id, dispatch]);

  const hanleSave = async () => {
    try {
      seteditingLoading(true);
      const payload = {
        title: JSON.stringify(formData.title),
        body: JSON.stringify(formData.body),
        image: formData.image,
        description: JSON.stringify(formData.description),
      };
      const response = await axiosInstance.put(
        `/admin/services/${id}`,
        payload
      );
      if (response.data.success) {
        const updatedService = {
          ...formData,
          id,
          image: response.data.data?.image,
        };
        dispatch(updateService(updatedService));
        dispatch(singleServiceSuccess(updatedService));
        toast.success(t("Edit_Item"));
        setEditMode(false);
      } else {
        toast.error(t("Error_Edit_Item"));
      }
    } catch (err) {
      console.error(err);
    } finally {
      seteditingLoading(false);
    }
  };

  if (loading)
    return (
      <div className="w-full h-[50vh] flex items-center justify-center">
        <Loader />
      </div>
    );

  if (!service)
    return (
      <div className="w-full h-[50vh] flex items-center justify-center">
        no data avilable
      </div>
    );
  return (
    <div className="px-5 w-full">
      <div className="flex items-center justify-between">
        <div className="px-2 flex items-center gap-2">
          <span className="text-sm font-medium">{isArabic ? "AR" : "EN"}</span>
          <Switch
            checked={isArabic}
            onChange={() => setIsArabic((prev) => !prev)}
            color="primary"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpenDelete(true)}
            className="py-1 px-2 bg-red-100 rounded-lg"
          >
            <Trash className="text-red-500" />
          </button>
          <button
            className="flex items-center gap-2 button_outline py-1 px-3"
            onClick={() => {
              setEditMode(!editMode);
              initData();
            }}
          >
            {!editMode && <Edit />}
            <span className={`${editMode ? "text-red-400" : ""}`}>
              {editMode ? "X" : t("Edit")}
            </span>
          </button>
        </div>
      </div>
      <div className="w-full bg-white py-5 px-10 flex flex-col gap-10 items-center justify-center rounded-xl">
        {isArabic ? (
          <div className="items w-full flex flex-wrap items-center justify-center">
            <div className="flex flex-col items-center w-[250px] h-[250px] bg-white shadow-md rounded-lg border p-5 justify-between">
              {editMode ? (
                <div className="relative w-full h-[100px] flex justify-center items-center">
                  <img
                    src={`${BASE_IMAGE_URL}${formData.image}`}
                    alt="service"
                    className="w-15 object-cover rounded-md"
                  />

                  {editMode && (
                    <div className="absolute bottom-2 left-2">
                      <UploadFile
                        transparentMode
                        onFileUpload={(file) =>
                          setFormData({
                            ...formData,
                            image: file,
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              ) : (
                <img src={service.image} alt="service" />
              )}

              {editMode ? (
                <div className="flex my-1 w-full flex-col items-center justify-center ">
                  <TextField
                    label={t("title_ar")}
                    value={formData.title.ar}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: {
                          ...formData.title,
                          ar: e.target.value,
                        },
                      })
                    }
                    fullWidth
                    multiline
                    rows={1}
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
                </div>
              ) : (
                <h2> {service.title.ar}</h2>
              )}

              <button
                onClick={() => setShowDetails(!showDetails)}
                className={`flex items-center justify-center gap-1  border rounded p-2 px-3 ${
                  showDetails
                    ? "bg-primary1 text-blue-50"
                    : "border-primary1 text-primary1 hover:bg-secondary1"
                }`}
              >
                {showDetails ? "Hide Details" : "Explore Service"}
                {showDetails ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
          </div>
        ) : (
          <div className="items w-full flex flex-wrap items-center justify-center gap-[50px]">
            <div className=" flex flex-col items-center w-[250px] h-[250px] bg-white shadow-md rounded-lg border p-[20px] justify-between">
              {editMode ? (
                <div className="relative w-full h-[100px] flex justify-center items-center">
                  <img
                    src={`${BASE_IMAGE_URL}${formData.image}`}
                    alt="service"
                    className="w-15 object-cover rounded-md"
                  />

                  {editMode && (
                    <div className="absolute bottom-2 left-2">
                      <UploadFile
                        transparentMode
                        onFileUpload={(file) => {
                          setFormData({
                            ...formData,
                            image: file,
                          });
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <img src={service.image} alt="service" />
              )}
              {editMode ? (
                <div className="flex w-full my-1 flex-col items-center justify-center ">
                  <TextField
                    label={t("title_en")}
                    value={formData.title.en}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: {
                          ...formData.title,
                          en: e.target.value,
                        },
                      })
                    }
                    fullWidth
                    multiline
                    rows={1}
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
                </div>
              ) : (
                <h2>{service.title.en}</h2>
              )}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className={`flex items-center justify-center gap-1  border rounded p-2 px-3 ${
                  showDetails
                    ? "bg-primary1 text-blue-50"
                    : "border-primary1 text-primary1 hover:bg-secondary1"
                }`}
              >
                {showDetails ? "Hide Details" : "Explore Service"}
                {showDetails ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
          </div>
        )}
        {showDetails && !editMode ? (
          <>
            {isArabic ? (
              <>
                {" "}
                <div className="flex flex-col items-start justify-start px-[50px] ">
                  {service?.body.ar}
                </div>
                <div className="flex flex-col items-start justify-start px-[50px] ">
                  {service?.description.ar}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-start justify-start px-[50px] ">
                  {service?.body.en}
                </div>
                <div className="flex flex-col items-start justify-start px-[50px] ">
                  {service?.description.en}
                </div>
              </>
            )}
          </>
        ) : (
          showDetails &&
          editMode && (
            <>
              {isArabic ? (
                <>
                  {" "}
                  <div className="flex w-full flex-col items-start justify-start px-[50px] ">
                    <TextField
                      label={t("desc_ar")}
                      value={formData.description.ar}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: {
                            ...formData.description,
                            ar: e.target.value,
                          },
                        })
                      }
                      fullWidth
                      multiline
                      rows={2}
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
                  </div>
                  <div className="flex w-full flex-col items-start justify-start px-[50px] ">
                    <TextField
                      label={t("Body_ar")}
                      value={formData.body.ar}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          body: { ...formData.body, ar: e.target.value },
                        })
                      }
                      fullWidth
                      multiline
                      rows={4}
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
                  </div>
                </>
              ) : (
                <>
                  <div className="flex w-full flex-col items-start justify-start px-[50px] ">
                    <TextField
                      label={t("desc_en")}
                      value={formData.description.en}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: {
                            ...formData.description,
                            en: e.target.value,
                          },
                        })
                      }
                      fullWidth
                      multiline
                      rows={2}
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
                  </div>
                  <div className="flex w-full flex-col items-start justify-start px-[50px] ">
                    <TextField
                      label={t("Body_en")}
                      value={formData.body.en}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          body: { ...formData.body, en: e.target.value },
                        })
                      }
                      fullWidth
                      multiline
                      rows={4}
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
                  </div>
                </>
              )}
            </>
          )
        )}
        {editMode && (
          <button
            onClick={hanleSave}
            className="button_outline py-1 px-4 rounded"
          >
            {editingloading ? (
              <Loader2 className="animate-spin text-gray-500" />
            ) : (
              t("Save")
            )}
          </button>
        )}
      </div>
      <DeleteMessage
        API={`/admin/services`}
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        id={id}
        onDeleteSuccess={(id: number) => {
          dispatch(deleteService(id));
          window.history.back();
        }}
      />
    </div>
  );
}
