interface coverprops {
  label: string;
}
export default function CoverImage({ label }: coverprops) {
  return (
    <div className="w-full relative ">
      <img src="images/Hero.png" alt="hero" />
      <div className="absolute bottom-[35px]  start-[40px] ">
        <h1 className="text-white text-[40px] ">{label}</h1>
      </div>
    </div>
  );
}
