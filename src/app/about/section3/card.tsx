interface Box {
  image: string;
  title: string;
  des: string;
}

export default function Card({ image, title, des }: Box) {
  return (
    <div className="box w-[300px] h-[200px] flex flex-col gap-[18px] items-center justify-center">
      <div className="victor w-[40px] h-[40px] flex items-center justify-center">
        <img src={image} alt="victor" />
      </div>
      <h3 className="text-black font-bold text-2xl text-center">{title}</h3>
      <p className="text-text_des text-center">{des}</p>
    </div>
  );
}
