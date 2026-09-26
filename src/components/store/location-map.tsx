import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const pin = L.divIcon({
  className: "",
  html: `<div style="transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center"><div style="width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:oklch(0.52 0.205 27);border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,.35)"></div></div>`,
  iconSize: [0, 0],
});

export default function LocationMap({ lat, lng, onMove }: { lat: number; lng: number; onMove: (lat: number, lng: number) => void }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);
  const cb = useRef(onMove); cb.current = onMove;

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, { zoomControl: true, attributionControl: true }).setView([lat, lng], 16);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(m);
    const mk = L.marker([lat, lng], { draggable: true, icon: pin }).addTo(m);
    mk.on("dragend", () => { const p = mk.getLatLng(); cb.current(p.lat, p.lng); });
    m.on("click", (e: L.LeafletMouseEvent) => { mk.setLatLng(e.latlng); cb.current(e.latlng.lat, e.latlng.lng); });
    map.current = m; marker.current = mk;
    setTimeout(() => m.invalidateSize(), 200);
    return () => { m.remove(); map.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const m = map.current, mk = marker.current; if (!m || !mk) return;
    const cur = mk.getLatLng();
    if (Math.abs(cur.lat - lat) > 1e-6 || Math.abs(cur.lng - lng) > 1e-6) { mk.setLatLng([lat, lng]); m.setView([lat, lng], Math.max(m.getZoom(), 16)); }
  }, [lat, lng]);

  return <div ref={el} className="h-full w-full" />;
}
