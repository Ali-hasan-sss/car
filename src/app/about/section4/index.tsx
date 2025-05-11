import Card from "./card";
import { plogs } from "./data";

export default function Section4() {
  return (
    <div className="w-full px-2 md:px-10 ">
      <div className="py-[30px] md:py-[80px] flex flex-col items-center justify-center gap-[60px]">
        <div className="flex max-h-[500px] flex-col items-center justify-center gap-[18px]">
          <h1 className="title1">News from Soufan Global</h1>
          <p className="des">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="flex w-full flex-wrap gap-[30px] items-center justify-center md:justify-between">
          {plogs.map((plog, index) => (
            <Card
              image={plog.image}
              info={plog.info}
              title={plog.title}
              des={plog.des}
              link={plog.link}
              key={index}
            />
          ))}
        </div>
        <button className=" button_outline rounded-lg  py-1 px-4">
          View all
        </button>
      </div>
    </div>
  );
}
