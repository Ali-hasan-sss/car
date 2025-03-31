import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axiosInstance from "@/utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setTableData } from "@/store/Reducers/tableDataReducer";
import LoadingBTN from "@/components/loading/loadingBTN";
import { toast } from "sonner";
import { useLanguage } from "../../../context/LanguageContext";
import { TableRow } from "@/Types/adminTypes";
import { RootState } from "@/store/store";

interface DynamicFormProps {
  open: boolean;
  onClose: () => void;
  apiUrl: string;
  fields: { id: string; label: string }[];
  initialData?: Record<string, TableRow[]> | null;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  open,
  onClose,
  apiUrl,
  fields,
  initialData,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  const dispatch = useDispatch();
  const tableData = useSelector(
    (state: RootState) => state.tableData[apiUrl] || []
  );
  const [loading, setLoading] = useState(false);
  const [manufacturers, setManufacturers] = useState<
    { id: number; title: string }[]
  >([]);
  const [Categories, setCategories] = useState<{ id: number; title: string }[]>(
    []
  );
  const { t } = useLanguage();

  // جلب الأنواع عند فتح الفورم
  useEffect(() => {
    if (open) {
      axiosInstance
        .get("admin/manufacturers") // تعديل الرابط حسب API الخاص بك
        .then((res) => setManufacturers(res.data.data))
        .catch((err) => console.error("❌ خطأ في جلب الأنواع:", err));
    }
    reset(initialData || {});
  }, [open, initialData, reset]);
  // جلب الأنواع عند فتح الفورم
  useEffect(() => {
    if (open) {
      axiosInstance
        .get("admin/categories") // تعديل الرابط حسب API الخاص بك
        .then((res) => setCategories(res.data.data))
        .catch((err) => console.error("❌ خطأ في جلب الفئات:", err));
    }
    reset(initialData || {});
  }, [open, initialData, reset]);

  // إرسال البيانات
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      let response;

      if (initialData) {
        response = await axiosInstance.put(`${apiUrl}/${initialData.id}`, data);
      } else {
        response = await axiosInstance.post(apiUrl, data);
      }

      const responseData = response.data.data || response.data;

      // تحديث البيانات في الجدول
      const updatedTableData = initialData
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tableData.map((item: any) =>
            item.id === initialData.id ? responseData : item
          )
        : [...tableData, responseData];

      dispatch(setTableData({ key: apiUrl, data: updatedTableData }));
      toast.success(t(initialData ? "Edit_Item" : "Add_Item"));

      onClose();
    } catch (error) {
      console.error("❌ خطأ أثناء الإرسال:", error);
      toast.error(t("Error_Edit_Item"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "تعديل العنصر" : "إضافة عنصر جديد"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} id="dynamic-form">
          {fields.map((field) =>
            field.id === "manufacturer_id" ? ( // إذا كان الحقل هو manufacturer_id استخدم Select
              <Controller
                key={field.id}
                name={field.id}
                control={control}
                defaultValue={initialData?.[field.id] || []}
                rules={{ required: true }}
                render={({ field: controllerField }) => (
                  <FormControl
                    fullWidth
                    margin="dense"
                    error={!!errors[field.id]}
                  >
                    <InputLabel>{field.label}</InputLabel>
                    <Select {...controllerField}>
                      {manufacturers.map((manufacturer) => (
                        <MenuItem key={manufacturer.id} value={manufacturer.id}>
                          {manufacturer.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            ) : field.id === "category_id" ? (
              <Controller
                key={field.id}
                name={field.id}
                control={control}
                defaultValue={initialData?.[field.id] || []}
                rules={{ required: true }}
                render={({ field: controllerField }) => (
                  <FormControl
                    fullWidth
                    margin="dense"
                    error={!!errors[field.id]}
                  >
                    <InputLabel>{field.label}</InputLabel>
                    <Select {...controllerField}>
                      {Categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            ) : (
              <Controller
                key={field.id}
                name={field.id}
                control={control}
                defaultValue={initialData?.[field.id] || []}
                rules={{ required: true }}
                render={({ field: controllerField }) => (
                  <TextField
                    {...controllerField}
                    margin="dense"
                    label={field.label}
                    fullWidth
                    variant="outlined"
                    error={!!errors[field.id]}
                    helperText={errors[field.id] ? "هذا الحقل مطلوب" : ""}
                  />
                )}
              />
            )
          )}
        </form>
      </DialogContent>
      <div className="flex px-5 py-4 items-center justify-between">
        <button onClick={onClose} className="button_close px-5 py-2">
          إلغاء
        </button>
        <button
          type="submit"
          form="dynamic-form"
          className="button_bordered px-5 py-2"
        >
          {loading ? <LoadingBTN /> : initialData ? "تحديث" : "إضافة"}
        </button>
      </div>
    </Dialog>
  );
};

export default DynamicForm;
