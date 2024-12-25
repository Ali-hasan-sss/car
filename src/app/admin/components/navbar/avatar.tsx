import { useState } from "react";

export default function Avatar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" onClick={toggleDropdown} className="">
        <div className="avatar">
          <div className="ring-primary1 ring-offset-base-100 w-[40px] rounded-full ring ring-offset-2 overflow-hidden">
            <img src="/images/avatar.png" alt="avatar" />
          </div>
        </div>
      </div>
      {isOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content rounded fixed top-[75px] right-[15px] menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li className="p-3 hover:bg-gray-200 rounded cursor-pointer">
            <a className="text-gray-800">Profile</a>
          </li>
          <li className="p-3 hover:bg-red-200 rounded cursor-pointer">
            <a className="text-red-600">Logout</a>
          </li>
        </ul>
      )}
    </div>
  );
}
