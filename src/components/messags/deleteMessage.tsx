import LoadingBTN from "@/components/loading/loadingBTN";
import { useLanguage } from "@/app/context/LanguageContext";
import axiosInstance from "@/utils/axiosInstance";
import { Typography } from "@mui/material";
import { toast } from "sonner";
import { useState } from "react";
import AnimatedModal from "@/components/modal/AnimatedModal";

interface ConfirmProps {
  handleClose: () => void;
  open: boolean;
  API: string;
  id?: number;
  onDeleteSuccess?: (id: number) => void;
}

export default function DeleteMessage({
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
      await axiosInstance.delete(`${API}/${id}`);

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
    <AnimatedModal
      open={open}
      handleClose={handleClose}
      style={{ width: "300px" }}
    >
      <Typography variant="h6" className="font-bold mb-4">
        {t("Comfirm_dellete")}
      </Typography>
      <div className="flex justify-between gap-4 mt-4">
        <button
          type="button"
          onClick={handleClose}
          className="button_close text-red-500 py-2 px-3"
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
    </AnimatedModal>
  );
}
