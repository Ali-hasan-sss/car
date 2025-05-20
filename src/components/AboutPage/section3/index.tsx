import Card from "./card";
import { Boxs } from "./data";
export default function Section3() {
  return (
    <div className="w-full px-2 md:px-10 ">
      <div className="flex flex-col items-center justify-center gap-10 py-[60px] ">
        <div className="heading max-w-[700px] flex flex-col items-center justify-center gap-4">
          <h2 className="text-xl md:text-3xl font-bold text-center">
            Emphasize whats important to your company
          </h2>
          <p className="text-text_des text-sm md:text-lg text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare.
          </p>
        </div>
        <div className="flex w-full flex-wrap gap-[25px] items-center justify-center md:justify-between">
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
