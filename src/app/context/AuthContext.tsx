"use client";
import React, { createContext, useState } from "react";

interface AuthContextType {
  isLOgedIn: boolean;
  login: () => void;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  isLOgedIn: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLOgedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("AuthToken");
      return token === "true"; // افتراض أن "AuthToken" هو علامة على تسجيل الدخول
    }
    return false;
  });

  const login = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("AuthToken", "true");
    }
    setIsLoggedIn(true);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("AuthToken");
    }
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLOgedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
