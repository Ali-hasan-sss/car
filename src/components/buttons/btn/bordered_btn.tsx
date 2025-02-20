import React from "react";
import "../btn.css";

interface Btn_bordedProops {
  label: string;
  onclick?: () => void;
  className?: string;
  iconAdd?: boolean;
  iconClear?: boolean;
}

export default function Btn_borded({
  label,
  onclick,
  className,
  iconAdd,
  iconClear,
}: Btn_bordedProops) {
  return (
    <button
      type="button"
      className={`${className} bordered_btn rounded`}
      onClick={onclick}
    >
      {iconAdd && <img src="/images/plus.png" className="w-[15px]" />}
      {iconClear && <img src="/images/clear.png" className="w-[15px]" />}
      {label}
    </button>
  );
}
