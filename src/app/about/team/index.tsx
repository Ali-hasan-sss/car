import Team_card from "./card";
import { team } from "./data";
export default function Team() {
  return (
    <div className="container py-[20px] md:py-[60px] flex flex-col items-center justify-center gap-[30px]">
      <div className="flex flex-col items-center justify-center max-w-[600px] gap-[16px]">
        <h1 className="title">Introduce your team</h1>
        <p className="des2 text-center">
          A common concern a visitor experiences is how well will the product or
          service be supported. Introducing the team eases fears while showing
          confidence.
        </p>
      </div>
      <div className="content flex flex-wrap items-center justify-center gap-[20px]">
        {team.map((T, index) => (
          <div key={index}>
            <Team_card image={T.image} name={T.name} jop={T.jop} des={T.des} />
          </div>
        ))}
      </div>
      <div className="action flex flex-col items-center justify-center gap-[20px] ">
        <h3 className="title3">Were hiring!</h3>
        <p className="des2">
          Our team is growing fast and were always looking for smart people.
        </p>
        <button className="bg-primary1 hover:bg-blue-400 rounded text-white px-5 py-3">
          Open positions
        </button>
      </div>
    </div>
  );
}
