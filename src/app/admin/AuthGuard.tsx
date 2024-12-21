"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("adminToken");
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;
