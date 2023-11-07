import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { ReactElement, useState } from "react";
import { setDoc, GeoPoint, doc, serverTimestamp } from "firebase/firestore";

import { MapComponent } from "./Components/Map";
import { db } from "./firebase";
import { Marker } from "./Components/Marker";

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <div>Error</div>;
  return <div>Loading...</div>;
};

const MyApp = () => {
  const apiKey = "AIzaSyApbLm--Ad4o-L0w_GDU53AxJF9rlySUvM";
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const onClick = async (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const docName = `Quest ${clicks.length + 1}`;
      setClicks([...clicks, e.latLng!]);
      const { lat, lng } = e.latLng.toJSON();
      const location = new GeoPoint(lat, lng);
      const timestamp = serverTimestamp();
      await setDoc(doc(db, "places", docName), {
        Location: location,
        Timestamp: timestamp,
      });
    }
  };
  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper apiKey={apiKey} render={render}>
        <MapComponent
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%", width: "100%" }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} label={(i + 1).toString()} />
          ))}
        </MapComponent>
      </Wrapper>
    </div>
  );
};
export default MyApp;
