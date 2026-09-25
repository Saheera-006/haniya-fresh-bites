import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ShopShell } from "@/components/store/shop-shell";
import { OrderSummary } from "@/components/store/order-summary";
import { Button } from "@/components/ui/button";
import { lineDetails, useStore } from "@/context/store-context";
import { summarize } from "@/lib/pricing";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Haniya Proteins" }, { name: "description", content: "Review your fresh chicken cuts before checkout." }, { property: "og:title", content: "Your Cart — Haniya Proteins" }, { property: "og:description", content: "Review your fresh chicken cuts before checkout." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, change, remove, total, deliveryMethod } = useStore();
  const s = summarize(total, deliveryMethod);
  if (!cart.length) return <ShopShell><div className="mx-auto max-w-md px-4 py-24 text-center"><h1 className="font-display text-3xl uppercase">Your cart is waiting for something fresh.</h1><Button asChild size="lg" className="mt-6"><Link to="/products" search={{ category: "All" }}>SHOP CHICKEN</Link></Button></div></ShopShell>;
  return <ShopShell><div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 pb-28 md:grid-cols-[1fr_340px] md:pb-6 lg:px-8">
    <section><h1 className="mb-4 font-display text-4xl uppercase">Your cart</h1><ul className="divide-y divide-border rounded-lg border border-border bg-card">
      {cart.map(line => { const { product: p, variant: v } = lineDetails(line); if (!p || !v) return null; return <li key={line.variantId} className="flex gap-3 p-3">
        <img src={p.image} alt="" className="size-20 shrink-0 rounded-md object-cover" loading="lazy" />
        <div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><b className="truncate">{p.name}</b><button onClick={() => remove(p.id, v.id)} aria-label={`Remove ${p.name}`} className="grid size-9 place-items-center text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button></div>
          <p className="text-xs text-muted-foreground">{v.weight} · ₹{v.price}</p>
          <div className="mt-2 flex items-center justify-between"><div className="flex h-9 items-center rounded-md border border-primary text-primary"><Button variant="ghost" size="icon" className="h-9 min-h-9 w-9" aria-label="Decrease" onClick={() => change(p.id, v.id, -1)}><Minus /></Button><b className="w-7 text-center text-sm">{line.quantity}</b><Button variant="ghost" size="icon" className="h-9 min-h-9 w-9" aria-label="Increase" onClick={() => change(p.id, v.id, 1)}><Plus /></Button></div><b>₹{v.price * line.quantity}</b></div>
        </div></li>; })}
    </ul></section>
    <aside className="space-y-3 md:sticky md:top-20 md:self-start"><OrderSummary {...s} /><div className="fixed inset-x-0 bottom-[72px] z-40 border-t border-border bg-background p-3 md:static md:border-0 md:p-0"><Button asChild size="lg" className="w-full"><Link to="/checkout">PROCEED TO CHECKOUT · ₹{s.total}</Link></Button></div></aside>
  </div></ShopShell>;
}
