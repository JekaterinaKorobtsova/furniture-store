import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import React from "react";
import mapStyles from "./mapStyles";


const center = { lat: 59.448228, lng: 24.745719 };

const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return "Error loading map";

  if (!isLoaded) {
    return <>Loading...</>;
  }

  return (
    <div className="map">
      <GoogleMap
        center={center}
        zoom={14}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options = {{
            mapTypeControl: false,
            fullscreenControl: false,
            styles: mapStyles
        }}
      >
          <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map;
