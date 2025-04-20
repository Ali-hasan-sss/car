import Slider_card from "./slider";

export default function Reviwe() {
  return (
    <div className="w-full px-[10px] md:px-[64px] py-[10px] md:py-[50px] bg-white ">
      <div className="w-full ">
        <div className="title ">
          <h1 className="text-3xl font-bold text-center">
            What Our Customers Say
          </h1>
          <p className="text-sm text-gray-500 text-center mt-4">
            Trusted by thousands of happy customers worldwide.{" "}
          </p>
        </div>
      </div>
      <Slider_card />
    </div>
  );
}
