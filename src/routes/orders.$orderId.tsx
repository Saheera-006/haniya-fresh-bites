import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ShopShell } from "@/components/store/shop-shell";
import { OrderTracker } from "@/components/store/order-tracker";
import { OrderSummary } from "@/components/store/order-summary";
import { useStore } from "@/context/store-context";

export const Route = createFileRoute("/orders/$orderId")({
  head: ({ params }) => ({ meta: [{ title: `Order ${params.orderId} — Haniya Proteins` }, { name: "description", content: "Order status and details." }, { property: "og:title", content: `Order ${params.orderId} — Haniya Proteins` }, { property: "og:description", content: "Order status and details." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: OrderDetail,
});

function OrderDetail() {
  const { orderId } = Route.useParams();
  const o = useStore().orders.find(x => x.id === orderId);
  return <ShopShell><div className="mx-auto max-w-3xl px-4 py-6">
    <Link to="/orders" className="mb-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><ArrowLeft className="size-4" />My orders</Link>
    {!o ? <p className="py-16 text-center text-muted-foreground">We couldn't find this order.</p> : <div className="space-y-4">
      <div><h1 className="font-display text-3xl uppercase">Order {o.id}</h1><p className="text-sm text-muted-foreground">{o.date}</p></div>
      <section className="rounded-lg border border-border bg-card p-4"><h2 className="mb-3 font-bold">Status</h2><OrderTracker status={o.status} /></section>
      <section className="rounded-lg border border-border bg-card p-4 text-sm"><h2 className="mb-2 font-bold">Items</h2>{o.items.map(i => <div key={i.name + i.weight} className="flex justify-between py-1"><span>{i.name} · {i.weight} × {i.quantity}</span><b>₹{i.price * i.quantity}</b></div>)}</section>
      <OrderSummary subtotal={o.subtotal} deliveryFee={o.deliveryFee} discount={o.discount} total={o.total} />
      <section className="rounded-lg border border-border bg-card p-4 text-sm space-y-1"><p><span className="text-muted-foreground">{o.deliveryMethod === "pickup" ? "Pickup" : "Delivery address"}:</span> {o.address}</p><p><span className="text-muted-foreground">Payment:</span> {o.paymentMethod} · {o.paymentStatus}</p></section>
    </div>}
  </div></ShopShell>;
}
