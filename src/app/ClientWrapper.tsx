"use client";

import { Provider } from "react-redux";
import { LanguageProvider } from "../context/LanguageContext";
import store from "@/store/store";
import AuthProvider from "../context/AuthContext";
import NextNProgress from "nextjs-progressbar";
import "nprogress/nprogress.css";
import { AnimatePresence, motion } from "framer-motion";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  //  console.log("NextNProgress Loaded");
  return (
    <Provider store={store}>
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
        showOnShallow={true}
      />
      <LanguageProvider>
        <AuthProvider>
          <AnimatePresence mode="wait">
            <motion.div
              key={
                typeof window !== "undefined"
                  ? window.location.pathname
                  : "page"
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </AuthProvider>
      </LanguageProvider>
    </Provider>
  );
};

export default ClientWrapper;
