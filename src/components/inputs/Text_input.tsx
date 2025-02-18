import React from "react";

interface TextInputProps {
  id?: string;
  value: string;
  placeholder?: string;
  label?: string;
  labelIkon?: string;
  error?: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Text_input: React.FC<TextInputProps> = ({
  id,
  name,
  value,
  placeholder,
  error,
  label,
  labelIkon,
  onChange,
}) => {
  return (
    <div className="form_group  relative w-full  flex flex-col gap-[8px] items-start justify-start">
      <label className="text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange} // تمرير الخاصية مباشرة هنا
        className={`w-full p-1 py-2 text-lg outline-none border rounded  ${
          error ? "input_err" : "input"
        }`}
      />
      {labelIkon && (
        <span className="absolute " style={{ right: "3%", bottom: "10%" }}>
          {labelIkon}
        </span>
      )}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Text_input;
