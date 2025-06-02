import React, { useState, useCallback } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "350px" };
const center = { lat: 37.293844, lng: 126.974337 }; // 성대 자과캠

export default function AddressPicker({ onSelect }) {
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState("");

  const handleClick = useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarker({ lat, lng });

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        setAddress("주소를 찾을 수 없습니다");
      }
    });
  }, []);

  const handleConfirm = () => {
    if (!marker) return;
    onSelect({ ...marker, address });
  };

  return (
    
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={marker || center}
          zoom={17}
          onClick={handleClick}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>
        {marker && (
          <div className="p-2 text-sm text-gray-700">
            선택된 주소: <span className="font-medium">{address}</span>
          </div>
        )}
        <div className="p-4 flex justify-end">
          <button
            onClick={handleConfirm}
            disabled={!marker}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40"
          >
            이 위치 사용
          </button>
        </div>
      </div>
  );
}
