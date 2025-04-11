interface CarResponse {
  id: number;
  user: {
    contact: {
      city: string;
    };
  };
  category: {
    title: string;
    manufacturer: {
      title: string;
    };
  };
  cmodel: {
    title: string;
  };
  price: number;
  images: {
    image: string;
  }[];
}

export default function Card({ car }: { car: CarResponse }) {
  const brandName = car.category.manufacturer.title;
  const carImage = `https://test.smarty.design/assets/img/common/${car.images[0]?.image}`;
  const carModel = car.cmodel.title;
  const category = car.category.title;
  const lotNumber = car.id.toString();
  const currentBid = car.price.toString();
  const location = car.user.contact.city;

  return (
    <div
      className="car-card bg-white shadow-md rounded-lg border py-1 overflow-hidden"
      style={{
        width: "200px",
        height: "300px",
      }}
    >
      <div
        className="header-bar flex justify-between items-center px-4"
        style={{ height: "20px" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{brandName}</span>
        </div>

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

      <div className="car-image flex justify-center items-center mt-2">
        <img
          src={carImage}
          alt="Car"
          style={{
            width: "200px",
            height: "125px",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="description text-sm px-4 py-2">
        <div className="info-row flex justify-between">
          <span className="font-semibold text-gray-700">Car Model:</span>
          <span className="text-gray-500">
            {brandName} - {category} - {carModel}
          </span>
        </div>
        <div className="info-row flex justify-between mt-1">
          <span className="font-semibold text-gray-700">Lot No:</span>
          <span className="text-gray-500">{lotNumber}</span>
        </div>
        <div className="info-row flex justify-between mt-1">
          <span className="font-semibold text-gray-700">Current Bid:</span>
          <span className="text-red-500">{currentBid} RO</span>
        </div>
        <div className="info-row flex justify-between mt-1">
          <span className="font-semibold text-gray-700">Location:</span>
          <span className="text-gray-500">{location}</span>
        </div>
      </div>

      <div className="flex justify-center items-center mt-3">
        <button
          className="view-details-btn px-4 py-2 transition"
          style={{ fontSize: "14px" }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
