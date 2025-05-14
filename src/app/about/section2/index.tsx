export default function About_section2() {
  return (
    <div className="py-[30px] px-2 md:px-10 bg-white block md:flex items-center justify-center gap-8 ">
      <div className="w-full md:w-1/2 flex flex-col ">
        <div className="heading flex flex-col gap-[16px]">
          <h1 className="text-xl md:text-3xl font-bold">
            Highlight achievements by the numbers
          </h1>
          <p className="text-sm text-text_des md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </p>
        </div>
        <div className="py-[8px] flex flex-col px-10 gap-10 mt-5">
          <div className=" flex items-center justify-between  gap-3">
            <div className=" flex flex-col items-center text-center justify-center gap-[8px]">
              <h2 className="text-2xl font-bold text-primary1">500+</h2>
              <p className="text-xl font-bold">Projects completed</p>
            </div>
            <div className=" flex items-center text-center justify-center flex-col gap-[8px]">
              <h2 className="text-2xl font-bold text-primary1">200%</h2>
              <p className="text-xl font-bold">Year on year growth</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-5 md:px-10 mt-6  gap-3">
            <div className="flex flex-col items-center text-center justify-center  gap-[8px]">
              <h2 className="text-2xl font-bold text-primary1">$50m</h2>
              <p className="text-xl font-bold">Funded</p>
            </div>
            <div className=" flex flex-col items-center text-center justify-center gap-[8px]">
              <h2 className="text-2xl font-bold text-primary1">10k</h2>
              <p className="text-xl font-bold">Downloads</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <img src="/images/Placeholder2.png" alt="Placeholder2" />
      </div>
    </div>
  );
}
