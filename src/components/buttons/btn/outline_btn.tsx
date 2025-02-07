import React from "react";
import "../btn.css";

interface Btn_outlinProops {
  label: string;
  onclick: () => void; // إزالة المعلمة e
  className?: string;
}

export default function Btn_outlin({
  label,
  onclick,
  className,
}: Btn_outlinProops) {
  return (
    <button
      type="button"
      className={`${className} outline_btn rounded`}
      onClick={onclick} // استدعاء الدالة مباشرة دون تمرير الحدث
    >
      {label}
    </button>
  );
}
