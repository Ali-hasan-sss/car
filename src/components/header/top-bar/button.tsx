"use client";
import Link from "next/link";

export default function Navbutton() {
  return (
    <div className="flex w-[209px] h-[57px] p-[5px] gap-[8px] item-center">
      <Link
        href="/login"
        className="btn bg-transparent text-blue-400 w-[89px] h-[40px] border-primary1 py-[10px] px-[14px] hover:bg-primary1 hover:text-light flex items-center justify-center"
      >
        Sign in
      </Link>
      <Link
        href="/register"
        className="btn bg-primary1 hover:bg-transparent hover:border-primary1 hover:text-black text-blue-200 w-[89px] h-[40px] py-[10px] px-[14px] flex items-center justify-center"
      >
        Register
      </Link>
    </div>
  );
}
