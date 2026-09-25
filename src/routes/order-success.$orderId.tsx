import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleCheck } from "lucide-react";
import { ShopShell } from "@/components/store/shop-shell";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/store-context";

export const Route = createFileRoute("/order-success/$orderId")({
  head: () => ({ meta: [{ title: "Order Placed — Haniya Proteins" }, { name: "description", content: "Your fresh chicken order has been placed." }, { property: "og:title", content: "Order Placed — Haniya Proteins" }, { property: "og:description", content: "Your fresh chicken order has been placed." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Success,
});

function Success() {
  const { orderId } = Route.useParams();
  const order = useStore().orders.find(o => o.id === orderId);
  return <ShopShell><div className="mx-auto max-w-lg px-4 py-10 text-center">
    <CircleCheck className="mx-auto size-16 text-primary" />
    <h1 className="mt-4 font-display text-4xl uppercase">Order placed successfully</h1>
    <p className="mt-2 text-muted-foreground">Order ID <b className="text-foreground">{orderId}</b></p>
    {order && <div className="mt-6 space-y-2 rounded-lg border border-border bg-card p-4 text-left text-sm">
      {order.items.map(i => <div key={i.name + i.weight} className="flex justify-between"><span>{i.name} · {i.weight} × {i.quantity}</span><b>₹{i.price * i.quantity}</b></div>)}
      <div className="flex justify-between border-t border-border pt-2 font-extrabold"><span>Total</span><span>₹{order.total}</span></div>
      <p><span className="text-muted-foreground">Payment:</span> {order.paymentMethod} ({order.paymentStatus})</p>
      <p><span className="text-muted-foreground">Address:</span> {order.address}</p>
    </div>}
    <div className="mt-6 grid grid-cols-2 gap-3"><Button asChild variant="outline" size="lg"><Link to="/orders/$orderId" params={{ orderId }}>VIEW ORDER</Link></Button><Button asChild size="lg"><Link to="/home">CONTINUE SHOPPING</Link></Button></div>
  </div></ShopShell>;
}
