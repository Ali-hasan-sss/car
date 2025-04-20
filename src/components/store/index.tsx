import Slider_card from "./slider";
import "./store.css";
import Tabs from "./tabs";
export default function Store() {
  return (
    <div className="w-full px-[10px] py-[20px] md:px-[64px] md:py-[50px] bg-white ">
      <div className="w-full ">
        <div className=" flex flex-col py-2 gap-2">
          <h1 className="font-bold text-3xl">Popular Vehicles</h1>
          <p className="text-gray-500 text-sm font-normal">
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
