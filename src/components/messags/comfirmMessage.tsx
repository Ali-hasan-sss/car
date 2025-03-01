import LoadingBTN from "@/app/admin/components/loadingBTN";
import { useLanguage } from "@/app/context/LanguageContext";
import axiosInstance from "@/utils/axiosInstance";
import { Box, Dialog, Typography } from "@mui/material";
import { toast } from "sonner";
import { useState } from "react";

interface ConfirmProps {
  handleClose: () => void;
  open: boolean;
  API: string;
  id?: number;
  onDeleteSuccess?: (id: number) => void; // دالة يتم استدعاؤها بعد الحذف
}

export default function ConfirmMessage({
  handleClose,
  open,
  API,
  id,
  onDeleteSuccess,
}: ConfirmProps) {
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleDelete = async () => {
    if (!id) return;

    try {
      setLoading(true);
      await axiosInstance.delete(`${API}${id}`);

      // استدعاء الدالة الممررة من الأب لتحديث القائمة بعد الحذف
      if (onDeleteSuccess) {
        onDeleteSuccess(id);
      }

      toast.success(t("Item_deleted_successfully"));
    } catch (error) {
      console.error("حدث خطأ أثناء الحذف:", error);
      toast.error(t("Error_Delete"));
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.1)", // يجعل الخلفية شفافة
        },
      }}
      PaperProps={{
        sx: {
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // إزالة الظل من الورقة
          backgroundColor: "white", // تأكد أن الخلفية واضحة بدون تأثيرات إضافية
        },
      }}
    >
      <Box className="p-6 w-96 bg-white rounded-md">
        <Typography variant="h6" className="font-bold mb-4">
          {t("Comfirm_dellete")}
        </Typography>
        <div className="flex justify-start gap-4 mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="button_bordered py-2 px-3"
          >
            {t("No")}
          </button>
          <button
            type="submit"
            onClick={handleDelete}
            className="button_outline py-2 px-3"
            disabled={loading}
          >
            {loading ? <LoadingBTN /> : t("Yes")}
          </button>
        </div>
      </Box>
    </Dialog>
  );
}
