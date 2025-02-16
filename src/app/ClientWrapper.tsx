// src/components/ClientWrapper.tsx
"use client";

import { Provider } from "react-redux";
import { LanguageProvider } from "./context/LanguageContext";
import store from "@/store/store";
import AuthProvider from "./context/AuthContext";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </AuthProvider>
    </Provider>
  );
};

export default ClientWrapper;
