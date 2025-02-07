interface helloProps {
  title: string;
  titleDes: string;
  information: string;
}
export default function WellCome({ title, titleDes, information }: helloProps) {
  return (
    <div className="flex  flex-col items-center justify-center px-[50px] py-[30px] gap-[50px]">
      <div className="  flex flex-col items-start gap-4 justify-center">
        <div className="header ">
          <h1 className="title">{title}</h1>
          <p className="text-sm font-bold">{titleDes}</p>
        </div>
        <p className="text-xl text-text_des">{information}</p>
      </div>
    </div>
  );
}
