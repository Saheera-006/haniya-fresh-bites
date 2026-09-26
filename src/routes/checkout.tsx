import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Banknote, CreditCard, LoaderCircle, QrCode, Store, Truck } from "lucide-react";
import { ShopShell } from "@/components/store/shop-shell";
import { OrderSummary } from "@/components/store/order-summary";
import { AuthPanel } from "@/components/store/auth-panel";
import { AddressList } from "@/components/store/address-list";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { lineDetails, useStore } from "@/context/store-context";
import { summarize } from "@/lib/pricing";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Haniya Proteins" }, { name: "description", content: "Choose address, delivery and payment for your chicken order." }, { property: "og:title", content: "Checkout — Haniya Proteins" }, { property: "og:description", content: "Complete your fresh chicken order." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: Checkout,
});

const input = "h-11 w-full rounded-md border border-input bg-card px-3 text-sm outline-none focus:border-primary";

function Checkout() {
  const st = useStore();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);
  const s = summarize(st.total, st.deliveryMethod);
  const a = st.address;

  if (!st.cart.length) return <ShopShell><div className="py-24 text-center"><h1 className="font-display text-3xl uppercase">Your cart is waiting for something fresh.</h1><Button asChild className="mt-5"><Link to="/products" search={{ category: "All" }}>SHOP CHICKEN</Link></Button></div></ShopShell>;

  const place = async () => {
    setError("");
    if (st.customer.name.trim().length < 2 || st.customer.mobile.replace(/\D/g, "").length < 10) return setError("Please enter your name and a 10-digit mobile number.");
    if (st.deliveryMethod === "delivery" && (!st.selectedAddressId || !st.addresses.some(x => x.id === st.selectedAddressId))) return setError("Please add or select a delivery address.");
    if (!st.authenticated) return setAuthOpen(true);
    setPlacing(true);
    await new Promise(r => setTimeout(r, 600));
    const id = "HP" + Date.now().toString().slice(-8);
    st.addOrder({ id, date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), items: st.cart.map(l => { const { product, variant } = lineDetails(l); return { name: product?.name ?? "", weight: variant?.weight ?? "", price: variant?.price ?? 0, quantity: l.quantity }; }), ...s, paymentMethod: st.payment, paymentStatus: st.payment === "COD" ? "Cash on delivery" : "Pending", deliveryMethod: st.deliveryMethod, address: st.deliveryMethod === "pickup" ? "Store pickup" : a.formattedAddress, status: "Placed" });
    st.clear(); setPlacing(false);
    navigate({ to: "/order-success/$orderId", params: { orderId: id } });
  };

  const opt = (active: boolean) => `flex min-h-14 items-center gap-3 rounded-md border p-3 text-left text-sm font-semibold ${active ? "border-primary bg-primary/10" : "border-border bg-card"}`;
  return <ShopShell><div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 pb-32 md:grid-cols-[1fr_360px] md:pb-6 lg:px-8">
    <div className="space-y-5"><h1 className="font-display text-4xl uppercase">Checkout</h1>
      <Section title="Your details"><div className="grid gap-3 sm:grid-cols-2"><L label="Full name"><input className={input} value={st.customer.name} onChange={e => st.setCustomer({ ...st.customer, name: e.target.value })} autoComplete="name" /></L><L label="Mobile number"><input className={input} inputMode="tel" value={st.customer.mobile} onChange={e => st.setCustomer({ ...st.customer, mobile: e.target.value })} autoComplete="tel" /></L></div></Section>
      <Section title="Delivery method"><div className="grid grid-cols-2 gap-3"><button className={opt(st.deliveryMethod === "delivery")} onClick={() => st.setDeliveryMethod("delivery")}><Truck className="text-primary" />Home delivery</button><button className={opt(st.deliveryMethod === "pickup")} onClick={() => st.setDeliveryMethod("pickup")}><Store className="text-primary" />Pickup</button></div></Section>
      {st.deliveryMethod === "delivery" && <Section title="Delivery address"><AddressList selectable /></Section>}
      <Section title="Payment"><div className="grid gap-3 sm:grid-cols-3">{([["UPI", QrCode, "UPI"], ["Card", CreditCard, "Card"], ["COD", Banknote, "Cash on delivery"]] as const).map(([k, I, l]) => <button key={k} className={opt(st.payment === k)} onClick={() => st.setPayment(k)}><I className="text-primary" />{l}</button>)}</div>{st.payment !== "COD" && <p className="mt-3 text-xs text-muted-foreground">You'll complete {st.payment} payment securely after placing the order. Payment is confirmed only after verification.</p>}</Section>
    </div>
    <aside className="space-y-3 md:sticky md:top-20 md:self-start">
      <div className="rounded-lg border border-border bg-card p-4"><h2 className="mb-2 font-bold">Items</h2>{st.cart.map(l => { const { product, variant } = lineDetails(l); return <div key={l.variantId} className="flex justify-between py-1 text-sm"><span>{product?.name} · {variant?.weight} × {l.quantity}</span><b>₹{(variant?.price ?? 0) * l.quantity}</b></div>; })}</div>
      <OrderSummary {...s} />
      {error && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
      <div className="fixed inset-x-0 bottom-[72px] z-40 border-t border-border bg-background p-3 md:static md:border-0 md:p-0"><Button size="lg" className="w-full" onClick={place} disabled={placing}>{placing && <LoaderCircle className="animate-spin" />}PLACE ORDER · ₹{s.total}</Button></div>
    </aside>
    <Dialog open={authOpen && !st.authenticated} onOpenChange={setAuthOpen}><DialogContent className="max-h-[90vh] overflow-y-auto"><DialogTitle className="sr-only">Login before placing your order</DialogTitle><p className="rounded-md bg-secondary p-3 text-sm font-semibold">Login before placing your order. Your cart, address and payment choice stay saved.</p><AuthPanel checkoutReturn /></DialogContent></Dialog>
  </div></ShopShell>;
}
function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className="rounded-lg border border-border bg-card p-4"><h2 className="mb-3 font-bold">{title}</h2>{children}</section>; }
function L({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-xs font-semibold text-muted-foreground"><span className="mb-1 block">{label}</span>{children}</label>; }
