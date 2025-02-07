import React from "react";

interface TextareaProps {
  id?: string;
  name: string;
  value: string;
  placeholder?: string;
  label?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // تحديث النوع إلى HTMLTextAreaElement
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  name,
  value,
  placeholder,
  error,
  label,
  onChange,
  className,
}) => {
  return (
    <div className="form_group flex flex-col gap-[8px] items-start justify-start">
      {/* Label */}
      {label && (
        <label className="text-sm" htmlFor={id}>
          {label}
        </label>
      )}

      {/* Textarea */}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-1 text-lg outline-none border rounded ${className} ${
          error ? "input_err" : "textarea"
        }`}
      />

      {/* Error Message */}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Textarea;
