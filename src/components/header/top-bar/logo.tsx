import Link from "next/link";

export default function Logo() {
  return (
    <div className="logo w-[140px] h-[72px] p-[10px] flex items-center justify-center ">
      <Link href="/">
        <img src="/images/logo.png" alt="" />
      </Link>
    </div>
  );
}
