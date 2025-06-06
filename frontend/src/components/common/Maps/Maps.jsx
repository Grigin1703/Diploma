import "./Maps.scss";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export default function Maps() {
  return (
    <YMaps query={{ apikey: "b2b15142-0c62-43fe-8cf7-ac9872dfc35e" }}>
      <Map
        defaultState={{
          center: [55.608, 37.6013],
          zoom: 17,
          bounds: [
            [55.607, 37.6],
            [55.609, 37.602],
          ],
        }}
        className="map"
        options={{
          controls: [],
          zoomControl: false,
          scrollZoom: false,
          drag: false,
          pinchZoom: false,
          suppressMapOpenBlock: true,
        }}
      >
        <Placemark
          geometry={[55.608, 37.6013]}
          options={{
            iconLayout: "default#image",
            iconImageHref: "/maps.svg",
            iconImageSize: [22, 28],
          }}
        />
      </Map>
    </YMaps>
  );
}
