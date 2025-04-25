interface ChooserProps {
  question: string;
  value: string | number | "";
  value1: string | number;
  value2: string | number;
  option1: string;
  option2: string;
  onChange: (selectedValue: string | number | "") => void;
}

export default function Chooser({
  question,
  value,
  value1,
  value2,
  option1,
  option2,
  onChange,
}: ChooserProps) {
  const handleOptionChange = (selectedValue: string | number) => {
    if (value === selectedValue) {
      onChange("");
    } else {
      onChange(selectedValue);
    }
  };

  return (
    <div className="flex flex-col gap-1 items-start">
      <label className=" text-text_titles text-xl">{question}</label>

      <div className="flex items-center gap-[5px]">
        <input
          type="radio"
          id="option1"
          value={value1.toString()}
          checked={value === value1}
          onClick={() => handleOptionChange(value1)}
          readOnly
          className="custom-radio cursor-pointer"
        />
        <label className="text-text_des cursor-pointer" htmlFor="option1">
          {option1}
        </label>
      </div>

      <div className="flex items-center gap-[5px]">
        <input
          type="radio"
          id="option2"
          value={value2.toString()}
          checked={value === value2}
          onClick={() => handleOptionChange(value2)}
          readOnly
          className="custom-radio cursor-pointer"
        />
        <label className="text-text_des cursor-pointer" htmlFor="option2">
          {option2}
        </label>
      </div>
    </div>
  );
}
