export default function Tabs() {
  const tabs = ["All", "Used cars", "New cars"];

  return (
    <div className="w-full mt-4 gap-[10px] item-center flex flex-wrap h-[30px]">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`button flex item-center justify-center h-[30px] ${
            index === 0 ? "active-tab" : ""
          }`}
        >
          <div>{tab}</div>
        </div>
      ))}
    </div>
  );
}
