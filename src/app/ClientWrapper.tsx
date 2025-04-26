"use client";

import { Provider } from "react-redux";
import { LanguageProvider } from "../context/LanguageContext";
import store from "@/store/store";
import AuthProvider from "../context/AuthContext";
import NextNProgress from "nextjs-progressbar";
import "nprogress/nprogress.css";

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
        <AuthProvider>{children}</AuthProvider>
      </LanguageProvider>
    </Provider>
  );
};

export default ClientWrapper;
