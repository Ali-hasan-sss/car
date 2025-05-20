"use client";
import Search_input from "@/components/inputs/search_input";
import LoadingBTN from "@/components/loading/loadingBTN";
import Loader from "@/components/loading/loadingPage";
import DeleteMessage from "@/components/messags/deleteMessage";
import AnimatedModal from "@/components/modal/AnimatedModal";
import { useLanguage } from "@/context/LanguageContext";
import Text_selector from "@/components/inputs/selectors/text_selector";
import { fetchPortsSuccess } from "@/store/slice/portsClise";
import { RootState } from "@/store/store";
import { Port } from "@/Types/adminTypes";
import axiosInstance from "@/utils/axiosInstance";
import { IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const PortsList = () => {
  const { t } = useLanguage();
  const apiUrl = "admin/ports";

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deletId, setdeletId] = useState(0);
  const [editing, setEditing] = useState<Port | null>(null);
  const [actionloading, setActionLoading] = useState(false);
  const [newPort, setNewPort] = useState({ title: "", type: 0 });
  const [errors, setErrors] = useState<{ title?: string; type?: string }>({});

  const dispatch = useDispatch();
  const { portsList, lastUpdated } = useSelector(
    (state: RootState) => state.ports
  );
  useEffect(() => {
    const fetchPorts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(apiUrl);
        if (response.data.success) {
          dispatch(fetchPortsSuccess(response.data.data));
        }
      } catch (error) {
        console.error("حدث خطأ في جلب المرافئ  :", error);
      } finally {
        setLoading(false);
      }
    };
    const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 دقائق

    const currentTime = Date.now();
    if (currentTime - lastUpdated >= UPDATE_INTERVAL) {
      fetchPorts();
    }
  }, [dispatch, lastUpdated]);

  const handleOpen = (port?: Port) => {
    if (port) {
      setEditing(port);
      setNewPort({ title: port.title, type: port.type });
    } else {
      setEditing(null);
      setNewPort({ title: "", type: 0 });
    }
    setOpen(true);
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setNewPort({ ...newPort, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    const newErrors: { title?: string; type?: string } = {};

    if (!newPort.title) newErrors.title = t("Field_Required");
    if (!newPort.type) newErrors.title = t("Field_Required");
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
        response = await axiosInstance.put(`${apiUrl}/${editing.id}`, newPort);
        if (response.data.success) {
          toast.success(t("Edit_Item"));
        } else toast.error(t("Error_Edit_Item"));
      } else {
        response = await axiosInstance.post(apiUrl, newPort);
        if (response.data.success) {
          toast.success(t("Add_Item"));
        } else toast.error(t("Error_Add_Item"));
      }

      if (response.data.success) {
        const updatedList = editing
          ? portsList.map((item) =>
              item.id === editing.id ? response.data.data : item
            )
          : [...portsList, response.data.data];

        dispatch(fetchPortsSuccess(updatedList));
        setOpen(false);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء حفظ المرقا :", error);
      toast.error(t("Error"));
    } finally {
      setActionLoading(false);
    }
  };
  const handleDelete = (id: number) => {
    setdeletId(id);
    setOpenDelete(true);
  };
  const filteredPorts = portsList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[400px] h-[300px] overflow-y-auto border p-2 ">
      <div className="flex items-center w-full gap-2 justify-between">
        <h3 className="font-bold text-xl mb-1 text-start">{t("Ports")}</h3>
        <button
          onClick={() => handleOpen()}
          className="button_outline  py-1 px-2"
        >
          + {t("Add_New_Port")}
        </button>{" "}
      </div>
      <Search_input value={searchTerm} onChange={setSearchTerm} />
      <div className="space-y-4 mt-5 bg-gray-50 h-[150px] overflow-y-auto rounded-xl e-w-full">
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Loader />
          </div>
        ) : filteredPorts.length > 0 ? (
          filteredPorts.map((item) => (
            <div
              key={item.id}
              className="flex items-center px-3 border-b border-gray-400 w-full gap-4"
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
                    fetchPortsSuccess(
                      portsList.filter((item) => item.id !== id)
                    )
                  );
                }}
              />
            </div>
          ))
        ) : (
          <Typography className="text-gray-500 text-center">
            {t("No_Ports_Found")}
          </Typography>
        )}
      </div>

      <AnimatedModal
        open={open}
        handleClose={() => setOpen(false)}
        className="w-[400px]"
      >
        <Typography variant="h6" className="font-bold mb-4">
          {editing ? t("Edit_port") : t("Add_New_Port")}
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4 p-3">
          <TextField
            fullWidth
            label={t("Enter_Port")}
            name="title"
            value={newPort.title}
            onChange={handleChange}
            variant="outlined"
            required
            error={!!errors.title}
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

          <Text_selector
            placeholder="select_type"
            value={newPort.type}
            options={[
              { value: 1, label: "local_ports" },
              { value: 2, label: "global_ports" },
            ]}
            onChange={(val) => {
              setNewPort({ ...newPort, type: Number(val) });
            }}
            error={errors.type}
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

export default PortsList;
