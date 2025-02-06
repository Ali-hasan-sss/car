interface info_cardPoops {
  image: string;
  title: string;
  des: string;
}
export default function Info_card({ image, title, des }: info_cardPoops) {
  return (
    <div className="w-[250px] h-[200px] py-[12px] flex flex-col items-center justify-center text-center gap-[10px]">
      <img src={image} className="w-[50px]" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{des}</p>
    </div>
  );
}
