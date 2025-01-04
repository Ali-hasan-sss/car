import React from "react";

interface EmailInputProps {
  id: string;
  value: string;
  placeholder?: string;
  label?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Text_input: React.FC<EmailInputProps> = ({
  id,
  value,
  placeholder,
  error,
  label,
  onChange, // التأكد من وجود الخاصية
}) => {
  return (
    <div className="form_group flex flex-col gap-[8px] items-start justify-start">
      <label className="text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange} // تمرير الخاصية مباشرة هنا
        className={`w-full p-1 text-lg outline-none border rounded  ${
          error ? "input_err" : "input"
        }`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Text_input;
