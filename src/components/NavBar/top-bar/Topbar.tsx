import Search from "./Search-form";
import Navbutton from "./button";
import Dropdown from "../dropdown";
import Logo from "./logo";
export default function Topbar() {
  return (
    <>
      <div className="hidden w-full md:flex items-center justify-between w-full h-[72px] px-[50px]">
        <Logo />
        <Search width="1/3" />
        <Navbutton />
      </div>
      <div className="flex md:hidden items-center justify-between w-full h-[72px]">
        <Logo />
        <Navbutton />
        <Dropdown />
      </div>
    </>
  );
}
