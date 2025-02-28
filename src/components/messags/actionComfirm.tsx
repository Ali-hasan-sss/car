import { useLanguage } from "@/app/context/LanguageContext";
import { Box, Dialog, Typography } from "@mui/material";

interface ActionComfirm {
  handleClose: () => void;
  open: boolean;
  onActionSuccess?: () => void; // دالة يتم استدعاؤها بعد الحذف
}

export default function ActionComfirm({
  handleClose,
  open,
  onActionSuccess,
}: ActionComfirm) {
  const { t } = useLanguage();

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
          {t("Confirm_logout")}
        </Typography>
        <div className="flex justify-between gap-4 mt-4">
          <button
            type="submit"
            onClick={onActionSuccess}
            className="button_outline py-2 px-3"
          >
            {t("Yes")}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="button_bordered py-2 px-3"
          >
            {t("No")}
          </button>
        </div>
      </Box>
    </Dialog>
  );
}
