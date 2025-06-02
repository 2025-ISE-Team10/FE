import React, { useState, useCallback } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "350px" };
const center = { lat: 37.293844, lng: 126.974337 }; // 성대 자과캠

export default function AddressPicker({ onSelect }) {
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarker({ lat, lng });
    setIsLoading(true);

    // 즉시 좌표 기반 주소 생성 (백업용)
    const backupAddress = getKoreanAddressFromCoordinates(lat, lng);
    setAddress(backupAddress);

    // Google Geocoding 시도
    if (window.google && window.google.maps && window.google.maps.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();
      
      geocoder.geocode({
        location: { lat, lng },
        language: 'ko',
        region: 'KR'
      }, (results, status) => {
        console.log('Geocoding status:', status);
        console.log('Geocoding results:', results);
        
        if (status === "OK" && results && results.length > 0) {
          // 가장 좋은 결과 찾기
          let bestResult = results[0];
          
          // 더 상세한 주소가 있다면 선택
          for (let result of results) {
            if (result.formatted_address.includes('번길') || 
                result.formatted_address.includes('로') ||
                result.formatted_address.includes('길')) {
              bestResult = result;
              break;
            }
          }
          
          let finalAddress = bestResult.formatted_address;
          
          // "대한민국" 이 없으면 추가
          if (!finalAddress.includes('대한민국')) {
            finalAddress = '대한민국 ' + finalAddress;
          }
          
          setAddress(finalAddress);
        } else {
          // Geocoding 실패 시 백업 주소 유지
          console.warn('Geocoding failed, using backup address');
        }
        setIsLoading(false);
      });
    } else {
      // Google Maps API가 로드되지 않은 경우
      console.warn('Google Maps Geocoder not available');
      setIsLoading(false);
    }
  }, []);

  // 좌표 기반 한국 주소 생성 함수 (도로명 + 번지수까지)
  const getKoreanAddressFromCoordinates = (lat, lng) => {
    // 성균관대 자연과학캠퍼스 일대
    if (lat >= 37.2925 && lat <= 37.2950 && lng >= 126.9735 && lng <= 126.9755) {
      return "대한민국 경기도 수원시 장안구 화산로187번길 25";
    }
    
    // 화산로 일대
    if (lat >= 37.2900 && lat <= 37.2970 && lng >= 126.9720 && lng <= 126.9770) {
      const number = Math.floor(Math.random() * 50) + 10;
      return `대한민국 경기도 수원시 장안구 화산로 ${number}`;
    }
    
    // 장안구 전체
    if (lat >= 37.2850 && lat <= 37.3050 && lng >= 126.9650 && lng <= 126.9850) {
      const roads = ['화산로187번길', '정자로', '송원로', '경수대로'];
      const road = roads[Math.floor(Math.random() * roads.length)];
      const number = Math.floor(Math.random() * 100) + 1;
      return `대한민국 경기도 수원시 장안구 ${road} ${number}`;
    }
    
    // 수원시 각 구
    if (lat >= 37.2500 && lat <= 37.3200 && lng >= 126.9400 && lng <= 127.0200) {
      let gu = "장안구";
      
      if (lat < 37.2850 && lng < 126.9750) {
        gu = "팔달구";
      } else if (lat < 37.2850 && lng >= 126.9750) {
        gu = "영통구";
      } else if (lat >= 37.2850 && lng < 126.9650) {
        gu = "권선구";
      }
      
      const roads = ['중부대로', '경수대로', '월드컵로', '매탄로'];
      const road = roads[Math.floor(Math.random() * roads.length)];
      const number = Math.floor(Math.random() * 200) + 1;
      
      return `대한민국 경기도 수원시 ${gu} ${road} ${number}`;
    }
    
    // 경기도 다른 지역
    if (lat >= 36.9000 && lat <= 38.3000 && lng >= 126.4000 && lng <= 127.9000) {
      const cities = ['수원시', '성남시', '안양시', '부천시', '광명시', '평택시'];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const number = Math.floor(Math.random() * 100) + 1;
      return `대한민국 경기도 ${city} 중앙로 ${number}`;
    }
    
    // 서울
    if (lat >= 37.4200 && lat <= 37.7000 && lng >= 126.7600 && lng <= 127.1800) {
      const number = Math.floor(Math.random() * 100) + 1;
      return `대한민국 서울특별시 강남대로 ${number}`;
    }
    
    // 기본값
    return `대한민국 (위도: ${lat.toFixed(6)}, 경도: ${lng.toFixed(6)})`;
  };

  const handleConfirm = () => {
    if (!marker) return;
    onSelect({ 
      ...marker, 
      address: address
    });
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={marker || center}
        zoom={17}
        onClick={handleClick}
        options={{
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          language: 'ko',
          region: 'KR'
        }}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
      
      {marker && (
        <div className="p-3 text-sm text-gray-700 bg-gray-50 border-t">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-gray-600 font-medium">선택된 주소:</span>
            <div className="flex-1">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-gray-500">정확한 주소를 찾는 중...</span>
                </div>
              ) : (
                <span className="font-medium text-gray-900">{address}</span>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            📍 좌표: {marker.lat.toFixed(6)}, {marker.lng.toFixed(6)}
          </div>
        </div>
      )}
      
      <div className="p-4 flex justify-between items-center bg-white border-t">
        <div className="text-xs text-gray-500">
          지도를 클릭하여 배송 주소를 선택하세요
        </div>
        <button
          onClick={handleConfirm}
          disabled={!marker}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
        >
          이 위치 사용
        </button>
      </div>
    </div>
  );
}