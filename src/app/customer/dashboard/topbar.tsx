import Avatar from "@/app/admin/components/navbar/avatar";
import Search_input from "@/components/inputs/search_input";
import { FaBell } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between gap-[16px]">
      <div className="w-1/2">
        <Search_input />
      </div>
      <div className="flex items-center justify-center gap-4">
        <FaBell className="text-gray-400 text-2xl" />
        <Avatar />
      </div>
    </div>
  );
}
