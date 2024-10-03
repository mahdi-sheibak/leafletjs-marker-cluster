"use client";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(
  () => import("@/components/leaflet-map").then((m) => m.LeafletMap),
  {
    ssr: false,
  }
);

export default function HomePage() {
  return (
    <main className="w-full h-full">
      <LeafletMap />
    </main>
  );
}
