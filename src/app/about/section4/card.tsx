interface plog {
  image: string;
  info: string;
  title: string;
  des: string;
  link: string;
}

export default function Card({ image, info, title, des, link }: plog) {
  return (
    <div className="box w-[300px]  flex flex-col gap-[18px] items-start justify-center">
      <div className="plog_image w-full h- flex items-center justify-center">
        <img src={image} alt="plog" className="w-full" />
      </div>
      <div className="content flex flex-col gap-[10px]">
        <div
          className={`info flex items-center justify-center w-[50px] h-[25px] ${
            info === "New"
              ? "bg-red-200 text-red-800"
              : "bg-blue-200 text-blue-800"
          } `}
        >
          {info}
        </div>
        <h3 className="text-black text-2xl ">{title}</h3>
        <p className="des1">{des}</p>
        <a className="text-primary1 w-[100px]" href={link}>
          <div className="action w-[100px] flex items-center justify-between">
            Read more
            <img src="/images/iconarrow.png" />
          </div>
        </a>
      </div>
    </div>
  );
}
