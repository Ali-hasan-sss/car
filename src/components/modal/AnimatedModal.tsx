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
  className = "",
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
            },
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(0, 0, 0, 0.3)", // خلفية شفافة
              width: "100vw", // خلفية شفافة
            },
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }} // تأثير الخروج
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`p-3 bg-white rounded-md shadow-lg object-contain ${className}`}
            style={style}
          >
            {children}
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
