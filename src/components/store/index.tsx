import Slider_card from "./slider";
import "./store.css";
import Tabs from "./tabs";
export default function Store() {
  return (
    <div className="w-full px-[10px] md:px-[64px] py-[10px] md:py-[50px] bg-white ">
      <div className="w-full ">
        <div className="title ">
          <h1 className="stor-title">Popular Vehicles</h1>
          <p className="stor-des">
            Comprehensive services to import and ship cars from Canada to Oman
          </p>
        </div>
        <Tabs />
        <p className="text-primary1 mt-4">What are you shipping?</p>
        <Slider_card />
      </div>
    </div>
  );
}
