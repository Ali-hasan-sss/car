import React from "react";
import "../btn.css";

interface Btn_bordedProops {
  label: string;
  onclick?: () => void;
  className?: string;
  icon?: boolean;
}

export default function Btn_borded({
  label,
  onclick,
  className,
  icon,
}: Btn_bordedProops) {
  return (
    <button
      type="button"
      className={`${className} bordered_btn rounded`}
      onClick={onclick}
    >
      {icon && <img src="/images/plus.png" className="w-[15px]" />}
      {label}
    </button>
  );
}
