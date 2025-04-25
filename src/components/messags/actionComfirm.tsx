import { useLanguage } from "../../context/LanguageContext";
import { Typography } from "@mui/material";
import AnimatedModal from "../modal/AnimatedModal";

interface ActionComfirm {
  handleClose: () => void;
  open: boolean;
  message: string;
  onActionSuccess?: () => void; // دالة يتم استدعاؤها بعد الحذف
}

export default function ActionComfirm({
  handleClose,
  open,
  message,
  onActionSuccess,
}: ActionComfirm) {
  const { t } = useLanguage();

  return (
    <AnimatedModal
      style={{ width: "300px", padding: "16px 20px" }}
      open={open}
      handleClose={handleClose}
    >
      <Typography variant="h6" className="font-bold mb-4">
        {message}
      </Typography>
      <div className="flex justify-between gap-4 mt-4">
        <button
          type="button"
          onClick={handleClose}
          className="button_bordered py-2 px-3"
        >
          {t("No")}
        </button>
        <button
          type="submit"
          onClick={onActionSuccess}
          className="button_close py-2 px-3"
        >
          {t("Yes")}
        </button>
      </div>
    </AnimatedModal>
  );
}
