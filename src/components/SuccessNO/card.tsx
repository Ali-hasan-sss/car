interface success {
  successImage: string;
  count: number;
  des: string;
}

export default function Card({ successImage, count, des }: success) {
  return (
    <div
      className="success-card bg-secondary1 shadow rounded-lg border py-6 overflow-hidden flex flex-col items-center justify-between "
      style={{
        width: "300px",
        height: "250px",
      }}
    >
      <div className=" py-3 flex justify-center items-center ">
        <img
          src={successImage}
          alt="Car"
          style={{
            width: "55px",
            height: "55px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* الوصف */}

      <div className="count px-4 py-1 mt-3">
        <div className=" flex justify-center item-center">
          <span className="font-semibold text-xl text-primary1">{count}</span>
        </div>
      </div>
      <div className="des text-lg px-4 mt-3">
        <div className=" flex justify-center item-center">
          <span className="font-md text-center text-gray-500">{des}</span>
        </div>
      </div>
    </div>
  );
}
