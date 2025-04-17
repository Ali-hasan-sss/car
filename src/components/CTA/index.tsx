import "./style.css";
interface CTAProps {
  title: string;
  des: string;
  btnText: string;
  onClick?: () => void;
}
export default function CTA({ title, des, btnText, onClick }: CTAProps) {
  return (
    <div className="w-full py-[50px] md:py-[112px] px-[10px] md:px-[64px] bg-secondary1 ">
      <div
        className="bg-primary1 block  md:flex item-center justify-center gap-[32px] p-[30px]"
        style={{ borderRadius: "15px" }}
      >
        <div className=" flex flex-col text md:w-2/3 gap-[20px]">
          <h2
            className="text-secondary1"
            style={{ fontSize: "32px", fontWeight: "700" }}
          >
            {title}
          </h2>
          <p className="text-white mb-4" style={{ fontWeight: "400" }}>
            {des}
          </p>
        </div>
        <div className="md:w-1/3  flex items-center justify-center">
          <button onClick={onClick} className="btn-cta">
            {" "}
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}
