"use client";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MarkerClusterGroup } from "./marker-cluster-group";
import { coordinates } from "@/fake-locations";

const position: LatLngExpression = [32.4279, 53.688];

const icon = L.divIcon({
  className: "",
  iconSize: [20, 40],
  iconAnchor: [10, 20],
  popupAnchor: [0, -30],
  html: `<img src="/marker-icon.png" />`,
});

export function LeafletMap() {
  return (
    <MapContainer
      className="w-full h-full"
      center={position}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup chunkedLoading>
        {coordinates.map((coordinate) => (
          <Marker
            key={coordinate.id}
            position={coordinate.position}
            icon={icon}
          >
            <Popup>this is {coordinate.id}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
