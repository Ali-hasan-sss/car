import { Dialog } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedModal({
  open,
  handleClose,
  children,
  className,
  style = {},
}: AnimatedModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "transparent",
              boxShadow: "none",
              overflowX: "hidden", // ✅ منع السكرول العرضي داخل Dialog
            },
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              width: "100vw",
            },
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`py-4 px-2 bg-white rounded-md shadow-lg max-w-full overflow-x-hidden object-contain ${className}`}
            style={{
              ...style,
              maxWidth: "100%",
              overflowX: "hidden", // ✅ منع السكرول داخل العنصر المتحرك
            }}
          >
            {children}
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
