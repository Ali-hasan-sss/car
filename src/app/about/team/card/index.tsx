interface Team {
  image: string;
  name: string;
  jop: string;
  des: string;
}

export default function Team_card({ image, name, jop, des }: Team) {
  return (
    <div className="box w-[300px] h-[250px] flex flex-col items-center justify-center gap-[18px] ">
      <div className="w-[60px] h-[60px] ">
        <img src={image} className="w-full" alt="team" />
      </div>
      <div className="content flex flex-col items-center justify-center gap-[14px]">
        <div className="flex flex-col items-center justify-center">
          <h3 className="card_title">{name}</h3>
          <h4 className="jop">{jop}</h4>
        </div>
        <p className="text-center jop">{des}</p>
      </div>
    </div>
  );
}
