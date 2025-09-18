// Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Bottombar from "./bottom-bar/bottombar";
import Topbar from "./top-bar/Topbar";
import "./header.css";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 80;
      setIsSticky(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`z-50 w-full transition-all duration-300 ${
          isSticky
            ? "fixed top-0 shadow-md  backdrop-blur-xl bg-opacity-90"
            : "bg-secondary1"
        }`}
      >
        <div className="py-[12px] h-[80px] md:h-[125px]">
          <div className="max-w-screen-xl mx-auto flex flex-col items-center">
            <div className="top-bar w-full">
              <Topbar />
            </div>
            <div className="bottom-bar w-full p-2">
              <Bottombar />
            </div>
          </div>
        </div>
      </div>

      {/* مساحة تعويضية عندما يصبح navbar ثابت حتى لا يغطي المحتوى */}
      {isSticky && <div className="h-[125px]" />}
    </>
  );
}
