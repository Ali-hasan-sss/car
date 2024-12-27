import Logo from "@/components/header/top-bar/logo";
import Search_input from "@/components/inputs/search_input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaBook,
  FaHome,
  FaRegQuestionCircle,
  FaSignInAlt,
  FaUser,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

export default function Sidebar() {
  const [isExpand, setIsExpand] = useState(false);
  const pathname = usePathname();
  const sideItems_top = [
    {
      label: "Home",
      icon: <FaHome className="text-primary1 text-2xl side_icon" />,
      path: "/customer/dashboard",
    },
    {
      label: "My Actions",
      icon: (
        <FaRegQuestionCircle className="text-primary1 text-2xl side_icon" />
      ),
      path: "/customer/dashboard/actions",
    },
    {
      label: "Containers",
      icon: <FaBook className="text-primary1 text-2xl side_icon" />,
      path: "/customer/dashboard/containers",
    },
  ];
  const sideItems_buttom = [
    {
      label: "Profile",
      icon: <FaUser className="text-primary1 text-2xl side_icon" />,
      path: "/customer/dashboard/profile",
    },
    {
      label: "Sign in",
      icon: <FaSignInAlt className="text-primary1 text-2xl side_icon" />,
      path: "/",
    },
    {
      label: "Setting",
      icon: <FiSettings className="text-primary1 text-2xl side_icon" />,
      path: "/customer/dashboard/settings",
    },
  ];
  return (
    <div
      className={`siedbar h-screen bg-secondary2  flex flex-col gap-[25px] ${
        isExpand ? "w-[40x]" : "w-[200px]"
      } `}
    >
      <div className="header  flex items-center justify-between">
        {!isExpand && <Logo />}

        {!isExpand ? (
          <button
            onClick={() => {
              setIsExpand(!isExpand);
            }}
            className={`w-[20px]  flex ${isExpand ? "m-2" : ""} `}
          >
            <img src="/images/arrow-left.png" alt="arrow" />
            <img src="/images/arrow-left.png" alt="arrow" />
          </button>
        ) : (
          <button
            onClick={() => {
              setIsExpand(!isExpand);
            }}
            className={`w-[20px]  flex ${isExpand ? "m-2" : ""} `}
          >
            <img src="/images/arrow-left.png" alt="arrow" />
            <img src="/images/arrow-left.png" alt="arrow" />
          </button>
        )}
      </div>
      <Search_input isExpand={isExpand} />
      <hr className="bg-gray-300" />
      <div className="flex flex-col h-screen items-between justify-between">
        <ul className="">
          {sideItems_top.map((item, index) => (
            <li
              key={index}
              className={`sied_item ${
                pathname === item.path ? "sied_item_active" : ""
              } `}
            >
              <Link className="w-full flex items-start gap-4" href={item.path}>
                {item.icon}
                {!isExpand && <p className="text-gray-400">{item.label}</p>}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="">
          {sideItems_buttom.map((item, index) => (
            <li
              key={index}
              className={`sied_item ${
                pathname === item.path ? "sied_item_active" : ""
              } `}
            >
              <Link className="w-full flex items-start gap-4" href={item.path}>
                {item.icon}
                {!isExpand && <p className="text-gray-400">{item.label}</p>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
