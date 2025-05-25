import { useLanguage } from "../../../context/LanguageContext";
import { base_url } from "@/utils/domain";

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
  year: number;
}

export default function Card({ car }: { car: CarResponse }) {
  const brandName = car.category.manufacturer.title;
  const carImage = `https://${base_url}/assets/img/common/${car.images[0]?.image}`;
  const year = car.year;
  const category = car.category.title;
  const lotNumber = car.id.toString();
  const currentBid = car.price.toString();
  const location = car.user?.contact?.city;
  const { t } = useLanguage();
  return (
    <div
      className="car-card bg-white rounded border py-1 overflow-hidden relative"
      style={{ width: "200px", height: "310px" }}
    >
      {/* الشريط العلوي */}
      <div
        className="header-bar flex justify-between items-center py-1 mt-1 px-4"
        style={{ height: "12px" }}
      >
        <span className="text-sm font-semibold">{brandName}</span>
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

      {/* صورة السيارة */}
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

      {/* وصف السيارة أو الشحنة */}
      <div
        className="description flex flex-col justify-end gap-1 font-montserrat text-[10px] px-1 py-3 font-montserrat "
        style={{ overflow: "hidden" }}
      >
        <>
          <div className="info-row flex mt-1 gap-2">
            <span className="font-bold truncate text-gray-700">
              {t("Car_Model")} :
            </span>
            <span className="text-gray-500 truncate flex-1 block">
              {brandName} - {category} - {year}
            </span>
          </div>
          <div className="info-row flex mt-1 gap-2">
            <span className="font-bold text-gray-700">{t("Lot_No")} :</span>
            <span className="text-gray-500 flex-1 gap-2">{lotNumber}</span>
          </div>
          <div className="info-row flex mt-1 gap-2">
            <span className="font-bold text-gray-700">
              {t("Current_Bid")} :
            </span>
            <span className="text-red-500 flex-1 gap-2">{currentBid} RO</span>
          </div>
          <div className="info-row flex mt-1 gap-2">
            <span className="font-bold text-gray-700">{t("Location")} :</span>
            <span className="text-gray-500 flex-1">{location}</span>
          </div>
        </>
      </div>

      {/* زر التفاصيل */}
      <div className="flex px-1">
        <button
          className="button_outline px-3  py-1 mt-2 transition"
          style={{ fontSize: "14px", borderRadius: "20px" }}
          onClick={() => {
            localStorage.setItem("selectedCar", JSON.stringify(car));
            window.location.replace(`/car-store/details`);
          }}
        >
          {t("details")}
        </button>
      </div>
    </div>
  );
}
