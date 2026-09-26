import { useState } from "react";
import { Briefcase, Check, Home, MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressEditor } from "./address-editor";
import { useStore } from "@/context/store-context";
import type { SavedAddress } from "@/types/store";

const icon = { Home, Work: Briefcase, Other: MapPin };

export function AddressList({ selectable = false }: { selectable?: boolean }) {
  const st = useStore();
  const [editing, setEditing] = useState<SavedAddress | null>(null);
  const [open, setOpen] = useState(false);
  const edit = (a: SavedAddress | null) => { setEditing(a); setOpen(true); };
  return <div className="space-y-3">
    {st.addresses.length === 0 && <div className="rounded-xl border border-dashed border-border p-6 text-center"><MapPin className="mx-auto mb-2 text-primary" /><p className="font-semibold">No saved addresses yet</p><p className="text-sm text-muted-foreground">Pick your spot on the map to add one.</p></div>}
    {st.addresses.map(a => { const I = icon[a.label]; const active = selectable && st.selectedAddressId === a.id; return <div key={a.id} className={`flex gap-3 rounded-xl border p-4 transition ${active ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-card"}`}>
      <button className="flex flex-1 gap-3 text-left" onClick={() => selectable && st.selectAddress(a.id)} disabled={!selectable} aria-pressed={active}>
        <span className={`grid size-10 shrink-0 place-items-center rounded-full ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>{active ? <Check className="size-5" /> : <I className="size-5" />}</span>
        <span className="min-w-0"><span className="flex items-center gap-2 font-bold">{a.label}{a.isDefault && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">Default</span>}</span><span className="mt-0.5 block text-sm text-muted-foreground">{a.formattedAddress}</span>{a.landmark && <span className="block text-xs text-muted-foreground">Near {a.landmark}</span>}</span>
      </button>
      <div className="flex flex-col items-end gap-1">
        <Button variant="ghost" size="icon" onClick={() => edit(a)} aria-label={`Edit ${a.label} address`}><Pencil className="size-4" /></Button>
        <Button variant="ghost" size="icon" onClick={() => st.deleteAddress(a.id)} aria-label={`Delete ${a.label} address`} className="text-destructive"><Trash2 className="size-4" /></Button>
        {!a.isDefault && <button onClick={() => st.setDefaultAddress(a.id)} className="text-[11px] font-bold text-primary">Make default</button>}
      </div>
    </div>; })}
    <Button variant="outline" className="w-full border-dashed" onClick={() => edit(null)}><Plus />Add new address</Button>
    <AddressEditor open={open} onOpenChange={setOpen} initial={editing} onSave={st.saveAddress} />
  </div>;
}
