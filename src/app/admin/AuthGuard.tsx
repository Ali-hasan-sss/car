"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Loader from "@/components/loading/loadingPage";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const authToken = useSelector((state: RootState) => state.auth.authToken);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pathname = window.location.pathname;

    if (!authToken) {
      if (pathname.startsWith("/admin")) {
        window.location.replace("/admin/login");
      } else {
        window.location.replace("/login");
      }
    } else {
      setIsLoading(false);
    }
  }, [authToken]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-secondary1 text-white text-lg">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
