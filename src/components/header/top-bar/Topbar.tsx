import Search from "./Search-form";
import Navbutton from "./button";
import Dropdown from "../dropdown";
import Logo from "./logo";
export default function Topbar() {
  return (
    <>
      <div className="d-none top-bar  d-md-flex item-center justify-between w-full h-[72px] p-[0px 96px]">
        <Logo />
        <Search />
        <Navbutton />
      </div>
      <div className="flex d-md-none item-center justify-between w-full h-[72px]">
        <Logo />
        <Dropdown />
      </div>
    </>
  );
}
