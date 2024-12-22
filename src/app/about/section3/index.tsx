import Card from "./card";
import { Boxs } from "./data";
export default function Section3() {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center gap-[40px] py-[30px] md:py-[80px]">
        <div className="heading max-w-[500px] flex flex-col items-center justify-center gap-[18px]">
          <h2 className="title1 text-center">
            Emphasize whats important to your company
          </h2>
          <p className="des1 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare.
          </p>
        </div>
        <div className="flex flex-wrap gap-[25px] items-center justify-center">
          {Boxs.map((Box, index) => (
            <Card
              image={Box.image}
              title={Box.title}
              des={Box.des}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
