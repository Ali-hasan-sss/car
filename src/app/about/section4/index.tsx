import Card from "./card";
import { plogs } from "./data";
export default function Section4() {
  return (
    <div className="container">
      <div className="py-[30px] md:py-[80px] flex flex-col items-center justify-center gap-[60px]">
        <div className="flex max-h-[500px] flex-col items-center justify-center gap-[18px]">
          <h1 className="title1">News from Soufan Global</h1>
          <p className="des">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="flex flex-wrap gap-[30px] items-center justify-center">
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
        <button className="btn bg-primary1 hover:bg-transparent hover:border-primary1 hover:text-black text-blue-200 w-[89px] h-[30px] py-[6px] px-[14px] flex items-center justify-center">
          View all
        </button>
      </div>
    </div>
  );
}
