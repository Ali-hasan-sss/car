import logo from "@/images/logo.png";
import Image from "next/image";
import Search from "./Search-form";
import Navbutton from "./button";
import Dropdown from "../dropdown";
export default function Topbar() {
  return (
    <>
      <div className="d-none top-bar  d-md-flex item-center justify-between w-full h-[72px] p-[0px 96px]">
        <div className="logo w-[157px] h-[72px] p-[10px] ">
          <Image src={logo} alt="logo" className="" />
        </div>
        <Search />
        <Navbutton />
      </div>
      <div className="flex d-md-none item-center justify-between w-full h-[72px]">
        <div className="logo w-[157px] h-[72px] ">
          <Image src={logo} alt="logo" width={147} height={40} className="" />
        </div>
        <Dropdown />
      </div>
    </>
  );
}
