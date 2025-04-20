import Slider_image from "./slider";

export default function Gallery() {
  return (
    <div className="w-full px-[10px] md:px-[64px] py-10 md:py-[50px] bg-secondary1 ">
      <div className="w-full ">
        <div className="title  ">
          <h1 className="text-center text-3xl font-bold">
            Explore Our Gallery
          </h1>
          <p className="text-center text-gray-400 text-sm my-10">
            Discover our curated collection of stunning vehicles, carefully
            selected to meet diverse preferences and needs. From luxury sedans
            to robust SUVs, each car in our gallery tells a story of quality,
            performance, and craftsmanship.
          </p>
        </div>
        <Slider_image />
      </div>
    </div>
  );
}
