import Link from "next/link";

export default function Register_footer() {
  return (
    <div className="container login_footer flex items-center justify-between bg-white h-[60px] text-gray-500">
      <p className="copyright"> © 2024 AWA</p>
      <Link href={"/terms&condition"}>terms & condition</Link>
    </div>
  );
}
