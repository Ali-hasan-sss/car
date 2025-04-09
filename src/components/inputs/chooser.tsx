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
    // إذا كان الخيار المضغوط هو نفسه الحالي، قم بإلغاء التحديد
    if (value === selectedValue) {
      onChange(""); // إزالة التحديد
    } else {
      onChange(selectedValue); // تحديد الخيار
    }
  };

  return (
    <div className="flex flex-col gap-1 items-start">
      <label className="font-bold text-text_titles text-xl">{question}</label>

      <div className="flex items-center gap-[5px]">
        <input
          type="radio"
          id="option1"
          value={value1}
          checked={value === value1}
          onClick={() => handleOptionChange(value1)} // استخدم onClick بدلاً من onChange
          readOnly // منع التغيير التلقائي من المتصفح
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
          value={value2}
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
