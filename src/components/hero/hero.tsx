import Fillter from "./fillter";
import Slider from "./slider";
import "./hero.css";
export default function Hero() {
  return (
    <div className="hero  flex py-[50px] px-[46px] bg-secondary1 ">
      <Fillter />
      <Slider />
    </div>
  );
}
