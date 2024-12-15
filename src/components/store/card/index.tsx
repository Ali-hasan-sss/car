interface Car {
  brandLogo: string;
  brandName: string;
  carImage: string;
  carModel: string;
  lotNumber: string;
  currentBid: string;
  location: string;
}

export default function Card({
  brandLogo,
  brandName,
  carImage,
  carModel,
  lotNumber,
  currentBid,
  location,
}: Car) {
  return (
    <div
      className="car-card bg-white shadow-md rounded-lg border py-1 overflow-hidden"
      style={{
        width: "200px",
        height: "300px",
      }}
    >
      {/* الشريط العلوي */}
      <div
        className="header-bar flex justify-between items-center px-4"
        style={{
          height: "20px",
        }}
      >
        {/* اسم البراند مع اللوغو */}
        <div className="flex items-center gap-2">
          <img
            src={brandLogo}
            alt="Brand Logo"
            style={{
              height: "10px",
              width: "auto",
            }}
          />
          <span className="text-sm font-semibold">{brandName}</span>
        </div>

        {/* أيقونة القلب */}
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

      {/* صورة السيارة */}
      <div className="car-image flex justify-center items-center mt-2">
        <img
          src={carImage}
          alt="Car"
          style={{
            width: "200px",
            height: "125px",
            objectFit: "contain",
            borderRadius: "5px",
          }}
        />
      </div>

      {/* الوصف */}
      <div className="description text-sm px-4 py-2">
        <div className="info-row flex justify-between">
          <span className="font-semibold text-gray-700">Car Model:</span>
          <span className="text-gray-500">{carModel}</span>
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

      {/* الزر */}
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
