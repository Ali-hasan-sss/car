import Bottombar from "./bottom-bar/bottombar";
import Topbar from "./top-bar/Topbar";
import "./header.css";
export default function Navbar() {
  return (
    <div className=" py-[12px] h-[125px] bg-secondary1">
      <div className=" container flex flex-col item center">
        <div className="top-bar w-full">
          <Topbar />
        </div>
        <div className="bottom-bar w-full p-2">
          <Bottombar />
        </div>
      </div>
    </div>
  );
}
