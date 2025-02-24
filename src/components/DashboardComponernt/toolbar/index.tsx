export default function ToolBar() {
  // const [showing, setShowing] = useState("5");
  // const [sortby, setSortby] = useState("date");
  return (
    <div className="flex items-center w-full justify-end py-2 gap-4">
      <div className="flex gap-2">
        <label className="text-lg">Showing 1-50 of 1</label>
      </div>
      <div className="w-[2px] h-[20px] bg-gray-300"></div>
      <div className="flex items-center gap-1">
        <label className="text-lg">Showing</label>
        <select
          className="bg-secondary1 outline-none text-lg text-gray-400"
          value="j"
          onChange={(e) => e.target.value}
        >
          <option>5</option>
          <option>10</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
      <div className="w-[2px] h-[20px] bg-gray-300"></div>
      <div className="flex items-center gap-1">
        <label className="text-lg">Sort by</label>
        <select
          className="bg-secondary1 outline-none text-lg text-gray-400"
          value=";"
          onChange={(e) => e.target.value}
        >
          <option>date</option>
          <option>status</option>
          <option>model</option>
        </select>
      </div>
      <div className="w-[2px] h-[20px] bg-gray-300"></div>
      <div className="flex items-center gap-1">
        <label className="text-lg">View as : </label>
        <div className="flex items-center p-1 gap-1">
          <img
            src="/images/Lista.png"
            className="cursor-pointer rounded hover:bg-gray-300"
            alt=""
          />
          <img
            src="/images/menu.png"
            className="cursor-pointer rounded hover:bg-gray-300"
            alt=""
          />
        </div>
      </div>
      <div className="w-[2px] h-[20px] bg-gray-300"></div>
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1">
          <img
            src="/images/settings.png"
            className="cursor-pointer hover:bg-gray-300"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
