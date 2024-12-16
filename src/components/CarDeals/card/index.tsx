interface Cardeals {
  car_image: string;
  auction_date: string;
  model: string;
}

export default function Card({ car_image, auction_date, model }: Cardeals) {
  return (
    <div
      className="car-card bg-white shadow-md rounded-lg border py-1 overflow-hidden"
      style={{
        width: "200px",
        height: "300px",
      }}
    >
      {/* صورة السيارة */}
      <div className="car-image flex justify-center items-center mt-2">
        <img
          src={car_image}
          alt="Car"
          style={{
            width: "200px",
            height: "125px",
            objectFit: "contain",
            borderRadius: "5px",
          }}
        />
      </div>
      <div className="info-row flex justify-between mt-5 px-4 ">
        <span className="font-semibold text-gray-700">Get in my Faviroit </span>
        <div>
          <img
            src="/images/heart.png"
            alt="Favorite"
            style={{
              height: "15px",
              width: "auto",
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      {/* الوصف */}
      <div className="description text-sm px-4 py-2">
        <div className="info-row flex justify-between my-1">
          <span className="font-semibold text-gray-700">Car auction date</span>
          <span className="text-gray-500">{auction_date}</span>
        </div>
        <div className="info-row flex justify-between my-1">
          <span className="font-semibold text-gray-700"> Model</span>
          <span className="text-gray-500">{model}</span>
        </div>
      </div>

      {/* الزر */}
      <div className="flex justify-start px-4 items-center mt-3">
        <button
          className="view-details-btn px-4 py-2 transition"
          style={{ fontSize: "14px" }}
        >
          Get Car
        </button>
      </div>
    </div>
  );
}
