import React from "react";
import "../forms/form_style.css";
interface InputProps {
  id?: string;
  name?: string;
  placeHolder?: string;
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
export default function FullTextInput({
  id,
  name,
  placeHolder,
  label,
  type = "text",
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div className="form_group flex flex-col gap-[8px] items-start  w-full justify-start">
      <label className="text-text_des" htmlFor={id}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        id={id}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        className={`textinput rounded w-full ${error ? "input_err" : ""}`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
