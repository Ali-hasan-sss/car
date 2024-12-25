import React from "react";

interface InputProps {
  id: string;
  placeHolder: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function TextInput({
  id,
  placeHolder,
  label,
  type = "text",
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div className="form_group flex flex-col gap-[8px] items-start justify-start">
      <label htmlFor={id}>
        {label}
        <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeHolder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input ${error ? "input_err" : ""}`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
