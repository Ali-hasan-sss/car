interface ChooserProps {
  question: string;
  value: string; // القيمة الحالية المختارة
  value1: string; // قيمة الخيار الأول
  value2: string; // قيمة الخيار الثاني
  option1: string; // نص الخيار الأول
  option2: string; // نص الخيار الثاني
  onChange: (selectedValue: string) => void; // دالة لإرسال القيمة المختارة إلى المكون الأب
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
  const handleOptionChange = (selectedValue: string) => {
    // استدعاء الدالة onChange وتمرير القيمة المختارة
    onChange(selectedValue);
  };

  return (
    <div className="flex flex-col gap-1 items-start">
      <label className="font-bold text-text_titles text-xl">{question}</label>
      <div className="flex items-center gap-[5px]">
        <input
          type="radio"
          id="1"
          value={value1}
          checked={value === value1} // تحديد إذا كان الخيار محددًا
          onChange={() => handleOptionChange(value1)} // إرسال قيمة الخيار الأول عند التغيير
          className="custom-radio cursor-pointer"
        />
        <label className="text-text_des" htmlFor="1">
          {option1}
        </label>
      </div>
      <div className="flex items-center gap-[10px]">
        <input
          type="radio"
          id="2"
          value={value2}
          checked={value === value2} // تحديد إذا كان الخيار محددًا
          onChange={() => handleOptionChange(value2)} // إرسال قيمة الخيار الثاني عند التغيير
          className="custom-radio cursor-pointer"
        />
        <label className="text-text_des" htmlFor="2">
          {option2}
        </label>
      </div>
    </div>
  );
}
