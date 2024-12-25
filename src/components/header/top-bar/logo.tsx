import Image from "next/image";
import logo from "@/images/logo.png";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="logo w-[157px] h-[72px] p-[10px] flex items-center justify-center ">
      <Link href="/">
        <Image src={logo} alt="logo" className="" />
      </Link>
    </div>
  );
}
