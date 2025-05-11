export default function About_section2() {
  return (
    <div className="py-[30px] md:py-[100px] px-[10px] md:px-[60px] bg-white block md:flex items-center justify-center gap-[50px] ">
      <div className="w-full md:w-1/2 flex flex-col ">
        <div className="heading flex flex-col gap-[16px]">
          <h1 className="title1">Highlight achievements by the numbers</h1>
          <p className="des1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </p>
        </div>
        <div className="py-[8px] flex flex-col gap-[24px]">
          <div className="list1 flex items-center  gap-[24px]">
            <div className="list_item flex flex-col gap-[8px]">
              <h2 className="title3 text-primary1">500+</h2>
              <p className="des1">Projects completed</p>
            </div>
            <div className="list_item flex flex-col gap-[8px]">
              <h2 className="title3 text-primary1">200%</h2>
              <p className="des1">Year on year growth</p>
            </div>
          </div>
          <div className="list2 flex items-center  gap-[24px]">
            <div className="list_item  flex flex-col  gap-[8px]">
              <h2 className="title3 text-primary1">$50m</h2>
              <p className="des1">Funded</p>
            </div>
            <div className="list_item flex flex-col gap-[8px]">
              <h2 className="title3 text-primary1">10k</h2>
              <p className="des1">Downloads</p>
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
