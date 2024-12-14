export default function search() {
  return (
    <div className="track relative w-2/5 bg-white h-[40px]  flex item-center  ">
      <input
        type="text"
        placeholder="Enter your tracking number"
        className="input rounded p-2  w-full max-w-lg  "
      />
      <button className="btn w-[71px] right-0 h-[40px] p-[10px] gap-[10px] focus:none bg-trackbtn text-light hover:bg-gray-500">
        Track
      </button>
    </div>
  );
}
