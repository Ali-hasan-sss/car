import Fillter from "./fillter";
import Slider from "./slider";
import "./hero.css";
export default function Hero() {
  return (
    <div className="hero flex flex-col md:flex-row px-[10px] md:px-[64px] py-[10px] md:py-[50px] bg-secondary1 gap-6">
      <div className="w-full md:w-1/2">
        <Fillter />
      </div>
      <div className="w-full md:w-1/2">
        <Slider />
      </div>
    </div>
  );
}
