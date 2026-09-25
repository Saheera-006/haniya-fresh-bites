import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { ShopShell } from "@/components/store/shop-shell";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/store-context";

export const Route = createFileRoute("/orders/")({
  head: () => ({ meta: [{ title: "My Orders — Haniya Proteins" }, { name: "description", content: "Track and review your chicken orders." }, { property: "og:title", content: "My Orders — Haniya Proteins" }, { property: "og:description", content: "Track and review your chicken orders." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: Orders,
});

function Orders() {
  const { orders, authenticated } = useStore();
  return <ShopShell><div className="mx-auto max-w-3xl px-4 py-6">
    <h1 className="mb-4 font-display text-4xl uppercase">My orders</h1>
    {!authenticated ? <div className="py-16 text-center"><p className="text-muted-foreground">Login to see your orders.</p><Button asChild className="mt-4"><Link to="/">LOGIN</Link></Button></div>
    : !orders.length ? <div className="py-16 text-center"><h2 className="font-display text-2xl uppercase">No orders yet.</h2><Button asChild className="mt-4"><Link to="/products" search={{ category: "All" }}>START SHOPPING</Link></Button></div>
    : <ul className="space-y-3">{orders.map(o => <li key={o.id}><Link to="/orders/$orderId" params={{ orderId: o.id }} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:border-primary">
        <div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><b>{o.id}</b><span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold">{o.status}</span></div><p className="truncate text-sm text-muted-foreground">{o.items.map(i => i.name).join(", ")}</p><p className="mt-1 text-sm">{o.date} · <b>₹{o.total}</b></p></div><ChevronRight className="text-muted-foreground" /></Link></li>)}</ul>}
  </div></ShopShell>;
}
