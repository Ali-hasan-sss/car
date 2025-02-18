"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const authToken = useSelector((state: RootState) => state.auth.authToken);
  useEffect(() => {
    if (!authToken) {
      router.push("/admin/login"); // إعادة التوجيه إذا لم يكن هناك token
    }
  }, [authToken, router]);

  return <>{children}</>;
};

export default AuthGuard;
