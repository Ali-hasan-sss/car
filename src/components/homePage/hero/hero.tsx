import Slider from "./slider";
import "./hero.css";
import Cotation from "./cotition";
export default function Hero() {
  return (
    <div className="hero flex flex-col lg:flex-row px-[10px] md:px-[64px] py-[10px] md:py-[50px] bg-secondary1 gap-6">
      <div className="w-full lg:w-1/2">
        <Cotation />
      </div>
      <div className="w-full lg:w-1/2">
        <Slider />
      </div>
    </div>
  );
}
