import React from "react";

interface Number_inputprops {
  id?: string;
  value: number;
  placeholder?: string;
  label?: string;
  labelIkon?: string;
  error?: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Number_input: React.FC<Number_inputprops> = ({
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
    <div className="form_group  relative w-full  flex flex-col gap-1 items-start justify-start">
      <label className="text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        type="number"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={(e) => e.target.select()} // أهم شيء هنا
        className={`w-full my-0 outline-none border rounded 
    ${error ? "input_err" : "input"}
    text-gray-900 placeholder-gray-400 
    px-3 py-2 h-[35px] text-base
  `}
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

export default Number_input;
