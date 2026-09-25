import { Check } from "lucide-react";
import type { OrderStatus } from "@/types/store";
const steps: OrderStatus[] = ["Placed", "Confirmed", "Preparing", "Out for Delivery", "Delivered"];
export function OrderTracker({ status }: { status: OrderStatus }) {
  if (status === "Cancelled") return <p className="rounded-md bg-destructive/10 p-3 text-sm font-semibold text-destructive">This order was cancelled.</p>;
  const idx = steps.indexOf(status);
  return <ol className="space-y-0">{steps.map((s, i) => <li key={s} className="flex gap-3"><div className="flex flex-col items-center"><span className={`grid size-7 place-items-center rounded-full border-2 text-xs font-bold ${i <= idx ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>{i <= idx ? <Check className="size-4" /> : i + 1}</span>{i < steps.length - 1 && <span className={`h-6 w-0.5 ${i < idx ? "bg-primary" : "bg-border"}`} />}</div><span className={`pt-1 text-sm ${i <= idx ? "font-bold" : "text-muted-foreground"}`}>{s}{i === idx && " · current"}</span></li>)}</ol>;
}
