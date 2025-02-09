interface InfoCardProps {
  image: string;
  title: string;
  des: string;
  height?: string;
  width: string;
}
export default function InfoCard({
  image,
  title,
  des,
  height,
  width,
}: InfoCardProps) {
  return (
    <>
      <div
        className={`flex flex-col items-center gap-4 h-[${height}px] w-[${width}px] p-[20px] justify-center`}
      >
        <img src={image} className="w-[50px]" alt="service" />
        <h2 className="text-text_title text-2xl font-bold text-center">
          {title}
        </h2>
        <p className="text-text_des text-xl">{des}</p>
      </div>
    </>
  );
}
