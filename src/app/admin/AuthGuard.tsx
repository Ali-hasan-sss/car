"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = !!Cookies.get("Token");
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;
