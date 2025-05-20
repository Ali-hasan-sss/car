import Sucial_icon from "./sucial_icon";

export default function Follow_us() {
  return (
    <div className="flex flex-col gap-4 py-[20px] px-[50px]">
      <h2 className="title">Follow us</h2>
      <div className="w-full">
        <p className="text-text_des text-xl">
          Stay connected with us on social media to get updates, news, and
          special offers:
        </p>
        <Sucial_icon />
        {/* <ul className="list-disc pl-[20px] text-xl text-text_des">
          <li>Instagram: [Insert link]</li>
          <li>Twitter: [Insert link]</li>
          <li> LinkedIn: [Insert link]</li>
        </ul> */}
      </div>
    </div>
  );
}
