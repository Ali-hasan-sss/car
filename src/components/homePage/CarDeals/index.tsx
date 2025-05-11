import Slider_card from "./slider";
import "./store.css";
export default function CarDeals() {
  return (
    <div className="w-full px-[10px] md:px-[64px] py-[10px] md:py-[50px] bg-secondary1 ">
      <div className="w-full ">
        <div className="title ">
          <h1 className="stor-title">
            Find Your Next Ride at the Perfect Price
          </h1>
          <p className="stor-des">
            Explore our extensive selection of vehicles available for auction
          </p>
        </div>
        <Slider_card />
      </div>
    </div>
  );
}
