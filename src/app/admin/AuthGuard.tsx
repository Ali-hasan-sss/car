"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Loader from "@/components/loading/loadingPage";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const authToken = useSelector((state: RootState) => state.auth.authToken);

  useEffect(() => {
    if (pathname === null) return; // نتأكد أن القيمة موجودة

    if (!authToken) {
      if (pathname.startsWith("/admin")) {
        router.replace("/admin/login");
      } else {
        router.replace("/login");
      }
    } else {
      setIsLoading(false);
    }
  }, [authToken, pathname, router]);

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
