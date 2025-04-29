interface InfoItemProps {
  label: string;
  value: string | number;
}
export default function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="w-full text-xs text-center">
      <div className=" border py-1 px-3 text-gray-500 bg-secondary1 whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </div>
      <div className="border p-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
        {value || "-"}
      </div>
    </div>
  );
}
