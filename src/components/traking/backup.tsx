import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AnimatedModal from "../modal/AnimatedModal";

// إحداثيات افتراضية لميناء فانكوفر في كندا
const DEFAULT_LOCATION: [number, number] = [49.2827, -123.1207];

const SetView = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const TrackingMap = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [location, setLocation] = useState<[number, number]>(DEFAULT_LOCATION);
  const [zoom] = useState(13);
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة فتح المودال

  const trackShipment = async () => {
    const API_KEY = "asat_c111c22903a143168cb73e28d942ce75"; // استبدلها بمفتاح API الخاص بك
    const carrierSlug = "testing-courier"; // استبدلها بالـ slug الخاص بالناقل الذي تستخدمه (مثل "dhl" أو "fedex")

    try {
      const response = await fetch(
        `https://api.aftership.com/v4/trackings/${carrierSlug}/${trackingNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
            "aftership-api-key": API_KEY,
          },
        }
      );

      const data = await response.json();
      if (data.data && data.data.tracking) {
        const lastCheckpoint = data.data.tracking.checkpoints.at(-1); // آخر نقطة وصول للشحنة

        if (lastCheckpoint?.location?.lat && lastCheckpoint?.location?.lng) {
          setLocation([
            lastCheckpoint.location.lat,
            lastCheckpoint.location.lng,
          ]); // تحديث الموقع الحقيقي
        } else {
          setLocation(DEFAULT_LOCATION); // استخدام الموقع الافتراضي عند عدم توفر بيانات الموقع
        }

        setIsModalOpen(true); // فتح المودال بعد تحديث الموقع
      }
    } catch (error) {
      console.error("Error fetching tracking data:", error);
      alert("حدث خطأ أثناء جلب بيانات التتبع!");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="أدخل رقم التتبع"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
      <button onClick={trackShipment}>تتبع الشحنة</button>
      {/* المودال لعرض الخريطة */}
      <AnimatedModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        <>
          <h2>موقع الشحنة</h2>
          <MapContainer className="w-full h-[400px]">
            <SetView center={location} zoom={zoom} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location}>
              <Popup>
                {location === DEFAULT_LOCATION
                  ? "موقع افتراضي"
                  : "موقع الشحنة الحالي"}
              </Popup>
            </Marker>
          </MapContainer>
          <button onClick={() => setIsModalOpen(false)}>إغلاق</button>
        </>
      </AnimatedModal>
    </div>
  );
};

export default TrackingMap;
