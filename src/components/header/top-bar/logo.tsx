import Link from "next/link";
interface logoprops {
  width?: string;
}
export default function Logo({ width }: logoprops) {
  return (
    <div className={`logo px-[5px]  flex items-center justify-center `}>
      <Link href="/">
        <img src="/images/logo.png" width={width} alt="" />
      </Link>
    </div>
  );
}
