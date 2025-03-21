import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { toast } from "sonner";
import LoadingBTN from "@/components/loading/loadingBTN";
import { useLanguage } from "@/app/context/LanguageContext";
import axiosInstance from "@/utils/axiosInstance";
import DainamicSelector from "@/components/inputs/selectors/DainamicSelector";
import { category } from "@/Types/adminTypes";
import {
  addCategory,
  editCategory,
} from "@/store/slice/adminManufacturerSlice";
import { useAppDispatch } from "@/store/Reducers/hooks";

interface CategoryFormProps {
  onClose: () => void;
  initialData: category | null;
  isNew?: boolean;
  manufacturer_id?: number | null;
  Api: string;
}

export default function CategoryForm({
  onClose,
  initialData,
  isNew,
  Api,
  manufacturer_id,
}: CategoryFormProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    manufacturer_id: (manufacturer_id && manufacturer_id) || null,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        manufacturer_id: manufacturer_id || null,
      });
    } else {
      setFormData({
        title: "",
        manufacturer_id: manufacturer_id || null,
      });
    }
  }, [initialData, manufacturer_id]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (isNew) {
        const res = await axiosInstance.post(Api, formData);
        const newCategory = res.data.data; // حسب شكل البيانات في الاستجابة
        dispatch(addCategory(newCategory)); // تحديث الحالة بعد الإضافة
      } else {
        const res = await axiosInstance.put(
          `${Api}/${initialData?.id}`,
          formData
        );
        const updatedCategory = res.data.data; // حسب شكل البيانات في الاستجابة
        dispatch(editCategory(updatedCategory)); // تحديث الحالة بعد التعديل
      }

      toast.success(t("Edit_Success"));
      onClose();
    } catch (error) {
      toast.error(t("Edit_Error"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="px-4 py-3 w-full mb-4">
        {isNew ? (
          <h2 className="text-center">اضافة موديل</h2>
        ) : (
          <h2 className="text-center">تعديل موديل</h2>
        )}
      </div>
      <TextField
        fullWidth
        label={t("title")}
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        sx={{ mb: 2 }}
      />
      {!manufacturer_id && (
        <DainamicSelector
          value={formData.manufacturer_id}
          Api_URL="admin/manufacturers"
          onChange={(value: number | null) =>
            setFormData({ ...formData, manufacturer_id: value })
          }
        />
      )}

      <div className="flex justify-between gap-4 mt-4">
        <button onClick={onClose} className="button_close py-2 px-3">
          {t("Close")}
        </button>
        <button onClick={handleSubmit} className="button_outline py-2 px-3">
          {loading ? <LoadingBTN /> : isNew ? t("Add") : t("Save")}
        </button>
      </div>
    </>
  );
}
