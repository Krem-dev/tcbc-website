"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const ChurchMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || !window.google) return;

    const churchLocation = { lat: 45.42001, lng: -75.68954 };

    const mapOptions = {
      zoom: 15,
      center: churchLocation,
      mapTypeControl: false,
      fullscreenControl: true,
      streetViewControl: false,
      zoomControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "poi.business",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text",
          stylers: [{ visibility: "off" }],
        },
      ],
    };

    map.current = new window.google.maps.Map(mapContainer.current, mapOptions);

    const marker = new window.google.maps.Marker({
      position: churchLocation,
      map: map.current,
      title: "The Chosen Bible Church",
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 15,
        fillColor: "#48007e",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      },
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; font-family: Arial, sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #48007e;">The Chosen Bible Church</h3>
          <a href="https://www.google.com/maps/dir/?api=1&destination=45.42001,-75.68954" target="_blank" style="color: #48007e; text-decoration: none; font-weight: bold;">Get Directions →</a>
        </div>
      `,
    });

    marker.addListener("click", () => {
      infoWindow.open(map.current, marker);
    });

    infoWindow.open(map.current, marker);
  }, []);

  return <div ref={mapContainer} className="w-full h-80 rounded-lg overflow-hidden border border-gray-200" />;
};

export default ChurchMap;
