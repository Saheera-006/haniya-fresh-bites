import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { LoaderCircle, LocateFixed, MapPin, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { emptyAddress, formatAddress } from "@/context/store-context";
import { useHydrated } from "@/hooks/use-hydrated";
import type { SavedAddress } from "@/types/store";

const LocationMap = lazy(() => import("./location-map"));
const DEFAULT = { lat: 8.1833, lng: 77.4119 }; // Nagercoil
const field = "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

type Hit = { display_name: string; lat: string; lon: string };
type Rev = { address?: Record<string, string>; display_name?: string };

export function AddressEditor({ open, onOpenChange, initial, onSave }: { open: boolean; onOpenChange: (v: boolean) => void; initial?: SavedAddress | null; onSave: (a: SavedAddress) => void }) {
  const hydrated = useHydrated();
  const [a, setA] = useState<SavedAddress>(() => initial ?? { ...emptyAddress, id: "" });
  const [q, setQ] = useState(""); const [hits, setHits] = useState<Hit[]>([]); const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false); const [resolving, setResolving] = useState(false); const [error, setError] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => { if (open) { setA(initial ?? { ...emptyAddress, id: "", latitude: DEFAULT.lat, longitude: DEFAULT.lng }); setQ(""); setHits([]); setError(""); } }, [open, initial]);

  const reverse = async (lat: number, lng: number) => {
    setA(p => ({ ...p, latitude: lat, longitude: lng })); setResolving(true);
    try {
      const r: Rev = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`).then(x => x.json());
      const d = r.address ?? {};
      setA(p => ({ ...p, latitude: lat, longitude: lng, street: d.road ?? d.pedestrian ?? p.street, area: d.suburb ?? d.neighbourhood ?? d.village ?? d.quarter ?? p.area, city: d.city ?? d.town ?? d.county ?? d.state_district ?? p.city, state: d.state ?? p.state, pincode: (d.postcode ?? p.pincode).replace(/\D/g, "").slice(0, 6) }));
    } catch { setError("Couldn't read this spot's address. You can type it below."); } finally { setResolving(false); }
  };

  const search = (v: string) => {
    setQ(v); clearTimeout(timer.current);
    if (v.trim().length < 3) return setHits([]);
    timer.current = setTimeout(async () => {
      setSearching(true);
      try { setHits(await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&countrycodes=in&limit=5&q=${encodeURIComponent(v)}`).then(x => x.json())); }
      catch { setError("Search isn't reachable right now. Try moving the pin instead."); } finally { setSearching(false); }
    }, 450);
  };

  const locate = () => {
    if (!navigator.geolocation) return setError("Location isn't supported on this device.");
    setLocating(true); setError("");
    navigator.geolocation.getCurrentPosition(p => { setLocating(false); reverse(p.coords.latitude, p.coords.longitude); }, () => { setLocating(false); setError("Location permission was denied. Search or move the pin instead."); }, { enableHighAccuracy: true, timeout: 10000 });
  };

  const save = () => {
    if (!a.house.trim() || !a.street.trim() || !a.area.trim()) return setError("Please add house number, street and area.");
    if (!/^\d{6}$/.test(a.pincode)) return setError("Please enter a 6-digit pincode.");
    onSave({ ...a, id: a.id || crypto.randomUUID(), formattedAddress: formatAddress(a) }); onOpenChange(false);
  };

  const lat = a.latitude ?? DEFAULT.lat, lng = a.longitude ?? DEFAULT.lng;
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[94vh] gap-0 overflow-y-auto p-0 sm:max-w-2xl">
      <DialogTitle className="px-5 pb-3 pt-5 font-display text-2xl uppercase">{initial ? "Edit address" : "Add delivery address"}</DialogTitle>
      <div className="relative px-5">
        <div className="relative"><Search className="absolute left-3 top-3 size-5 text-muted-foreground" /><input value={q} onChange={e => search(e.target.value)} placeholder="Search area, street or landmark" className={`${field} pl-10 pr-10`} aria-label="Search location" />{searching ? <LoaderCircle className="absolute right-3 top-3 size-5 animate-spin text-muted-foreground" /> : q && <button onClick={() => { setQ(""); setHits([]); }} className="absolute right-2 top-2 p-1" aria-label="Clear search"><X className="size-5" /></button>}</div>
        {hits.length > 0 && <ul className="absolute inset-x-5 z-[1000] mt-1 overflow-hidden rounded-lg border border-border bg-popover shadow-lg">{hits.map(h => <li key={h.lat + h.lon}><button className="flex w-full gap-2 px-3 py-3 text-left text-sm hover:bg-secondary" onClick={() => { setHits([]); setQ(h.display_name.split(",")[0]); reverse(+h.lat, +h.lon); }}><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /><span className="line-clamp-2">{h.display_name}</span></button></li>)}</ul>}
      </div>
      <div className="relative mx-5 mt-3 h-64 overflow-hidden rounded-xl border border-border bg-muted sm:h-80">
        {hydrated && open ? <Suspense fallback={<div className="grid h-full place-items-center text-sm text-muted-foreground"><LoaderCircle className="animate-spin" /></div>}><LocationMap lat={lat} lng={lng} onMove={reverse} /></Suspense> : <div className="h-full animate-pulse" />}
        <Button size="sm" variant="secondary" onClick={locate} disabled={locating} className="absolute bottom-3 left-1/2 z-[500] -translate-x-1/2 shadow-md">{locating ? <LoaderCircle className="animate-spin" /> : <LocateFixed />}Use current location</Button>
      </div>
      <p className="mx-5 mt-2 flex items-center gap-2 text-xs text-muted-foreground">{resolving ? <><LoaderCircle className="size-3 animate-spin" />Finding address…</> : "Drag the pin or tap the map to set your exact spot."}</p>
      <div className="space-y-3 p-5">
        <div className="flex gap-2">{(["Home", "Work", "Other"] as const).map(l => <button key={l} onClick={() => setA({ ...a, label: l })} className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition ${a.label === l ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{l}</button>)}</div>
        <div className="grid gap-3 sm:grid-cols-2">
          {([["house", "House / Flat / Door no."], ["street", "Street / Road"], ["area", "Area / Locality"], ["landmark", "Landmark (optional)"], ["city", "City"], ["state", "State"], ["pincode", "Pincode"]] as const).map(([k, l]) => <label key={k} className="block text-xs font-semibold text-muted-foreground"><span className="mb-1 block">{l}</span><input className={field} value={a[k]} inputMode={k === "pincode" ? "numeric" : undefined} maxLength={k === "pincode" ? 6 : undefined} onChange={e => setA({ ...a, [k]: k === "pincode" ? e.target.value.replace(/\D/g, "") : e.target.value })} /></label>)}
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={!!a.isDefault} onChange={e => setA({ ...a, isDefault: e.target.checked })} className="size-4 accent-[var(--primary)]" />Set as default address</label>
        {error && <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        <Button size="lg" className="w-full" onClick={save}>SAVE ADDRESS</Button>
      </div>
    </DialogContent>
  </Dialog>;
}
