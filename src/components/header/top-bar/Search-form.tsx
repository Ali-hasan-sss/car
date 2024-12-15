export default function search() {
  return (
    <div className="track relative w-2/5 bg-white h-[40px] flex items-center justify-between">
      {/* Input field */}
      <input
        type="text"
        placeholder="Enter your tracking number"
        className="input rounded p-2 w-full h-full"
      />
      {/* Button */}
      <button className="btn h-full px-[10px] bg-trackbtn text-light hover:bg-gray-500 rounded-r">
        Track
      </button>
    </div>
  );
}
