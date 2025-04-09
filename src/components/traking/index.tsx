import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AnimatedModal from "../modal/AnimatedModal";

const DEFAULT_LOCATION: [number, number] = [49.2827, -123.1207]; // الموقع الافتراضي

const TrackingMap = () => {
  const [trackingNumber, setTrackingNumber] = useState(""); // رقم IMO أو MMSI
  const [location, setLocation] = useState<[number, number]>(DEFAULT_LOCATION); // الموقع الحالي
  const [zoom] = useState(13); // مستوى التكبير
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة النافذة المنبثقة

  const trackShipment = async () => {
    try {
      const response = await fetch(`/api/proxy?imo=${trackingNumber}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const vessel = data[0];
        const latitude = vessel.AIS.LAT;
        const longitude = vessel.AIS.LON;

        if (latitude && longitude) {
          setLocation([latitude, longitude]);
        } else {
          setLocation(DEFAULT_LOCATION);
        }

        setIsModalOpen(true);
      } else {
        alert("لم يتم العثور على بيانات للسفينة.");
      }
    } catch (error) {
      console.error("Error fetching tracking data:", error);
      alert("حدث خطأ أثناء جلب بيانات التتبع!");
    }
  };

  return (
    <div>
      {/* حقل إدخال رقم الحاوية أو السفينة */}
      <input
        type="text"
        placeholder="أدخل رقم IMO أو MMSI"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
      <button onClick={trackShipment}>تتبع الشحنة</button>

      {/* النافذة المنبثقة لعرض الخريطة */}
      <AnimatedModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        <>
          <h2>موقع الشحنة</h2>
          <MapContainer
            center={location}
            zoom={zoom}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location}>
              <Popup>موقع الشحنة</Popup>
            </Marker>
          </MapContainer>
          <button onClick={() => setIsModalOpen(false)}>إغلاق</button>
        </>
      </AnimatedModal>
    </div>
  );
};

export default TrackingMap;
