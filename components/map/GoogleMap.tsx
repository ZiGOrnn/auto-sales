"use clinet";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  latitude: 13.82703, // Latitude of Bangkok, Thailand
  longitude: 100.56431, // Longitude of Bangkok, Thailand
};

const ApiKey = "AIzaSyDNwoEC5fmiPc9di3b_9XPXOIYtKV31QO8";

const GoogleLocations = () => {
  const [isMarker, setIsMarker] = useState(false);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 1000,
    });

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      console.log("🚀 ~ file: GoogleMap.tsx:31 ~ useEffect ~ coords:", coords);
      setIsMarker(true);
    }
    return () => {};
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

  return (
    <LoadScript googleMapsApiKey={ApiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: center.latitude,
          lng: center.longitude,
        }}
        zoom={10}
      >
        <Marker
          key={`${center.latitude}-${center.longitude}`}
          position={{
            lat: center.latitude,
            lng: center.longitude,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleLocations;
