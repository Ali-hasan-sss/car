import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { toast } from "sonner";
import LoadingBTN from "@/components/loading/loadingBTN";
import { useLanguage } from "../../../context/LanguageContext";
import axiosInstance from "@/utils/axiosInstance";
import DainamicSelector from "@/components/inputs/selectors/DainamicSelector";
import { category } from "@/Types/adminTypes";
import { useAppDispatch } from "@/store/Reducers/hooks";
import {
  addCarModel,
  editCarModel,
} from "@/store/slice/adminManufacturerSlice";

interface CmodelFormProps {
  onClose: () => void;
  initialData: category | null;
  isNew?: boolean;
  Api: string;
  category_id?: number | null;
}

export default function CmodelForm({
  onClose,
  initialData,
  isNew,
  Api,
  category_id,
}: CmodelFormProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category_id: category_id || null,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        category_id: (category_id && category_id) || null,
      });
    } else {
      setFormData({
        title: "",
        category_id: (category_id && category_id) || null,
      });
    }
  }, [initialData, category_id]);

  const handleSubmit = async () => {
    if (!formData.category_id) {
      toast.error("يرجى تحديد الفئة");
      return;
    }

    try {
      console.log(`id:${formData.category_id}`);
      setLoading(true);

      if (isNew) {
        const res = await axiosInstance.post(Api, formData);
        const newModel = res.data.data; // تأكد من شكل البيانات القادمة من السيرفر

        dispatch(
          addCarModel({
            categoryId: formData.category_id,
            model: newModel,
          })
        );
      } else {
        const res = await axiosInstance.put(
          `${Api}/${initialData?.id}`,
          formData
        );
        const updatedModel = res.data.data;

        dispatch(
          editCarModel({
            categoryId: formData.category_id,
            model: updatedModel,
          })
        );
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
      {!category_id && (
        <DainamicSelector
          value={formData.category_id}
          Api_URL="admin/categories"
          onChange={(value: number | null) =>
            setFormData({ ...formData, category_id: value })
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
