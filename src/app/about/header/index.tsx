export default function About_header() {
  return (
    <div className="py-[30px] md:py-[100px] px-[10px] md:px-[60px] flex items-center justify-center bg-secondary1 ">
      <div className="flex flex-col max-w-[700px] text-center items-center justify-center gap-[20px]">
        <h1 className="text-xl md:text-3xl font-bold">
          Describe why your company exists [mission statement]
        </h1>
        <p className="text-text_des text-lg">
          Explain what your company is working on and the value you provide to
          your customers.
        </p>
      </div>
    </div>
  );
}
