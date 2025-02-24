import React from "react";
import "../btn.css";

interface Btn_outlinProops {
  label: string;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "button" | "reset";
}

export default function Btn_outlin({
  label,
  onClick,
  className,
  type,
}: Btn_outlinProops) {
  return (
    <button
      type={type}
      className={`${className} outline_btn flex items-center rounded`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
