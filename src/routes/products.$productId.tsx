import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { products } from "@/data/catalog";
import { ShopShell } from "@/components/store/shop-shell";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/store-context";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => { const product = products.find(p => p.id === params.productId); if (!product) throw notFound(); return { product }; },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.product.name} — Haniya Proteins` : "Product not found — Haniya Proteins";
    const d = loaderData ? `${loaderData.product.description}. Choose your weight and add to cart.` : "This chicken cut is unavailable.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  notFoundComponent: () => <ShopShell><div className="py-24 text-center"><h1 className="font-display text-3xl uppercase">Product unavailable</h1><Button asChild className="mt-4"><Link to="/products" search={{ category: "All" }}>Browse products</Link></Button></div></ShopShell>,
  errorComponent: () => <ShopShell><div className="py-24 text-center"><h1 className="font-display text-3xl uppercase">Couldn't load this product</h1><Button asChild className="mt-4"><Link to="/products" search={{ category: "All" }}>Back to products</Link></Button></div></ShopShell>,
  component: ProductDetails,
});

function ProductDetails() {
  const { product } = Route.useLoaderData();
  const { cart, change } = useStore();
  const navigate = useNavigate();
  const [vid, setVid] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const v = product.variants.find(x => x.id === vid)!;
  const inCart = cart.find(x => x.productId === product.id && x.variantId === vid)?.quantity ?? 0;
  return <ShopShell><div className="mx-auto max-w-6xl px-4 py-4 lg:px-8 lg:py-8">
    <Link to="/products" search={{ category: "All" }} className="mb-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><ArrowLeft className="size-4" />Products</Link>
    <div className="grid gap-6 md:grid-cols-2 md:gap-10">
      <div className="aspect-square overflow-hidden rounded-lg bg-muted"><img src={product.image} alt={product.name} width={912} height={912} className="h-full w-full object-cover" /></div>
      <div>
        <p className="text-xs font-bold uppercase text-primary">{product.category}</p>
        <h1 className="mt-1 font-display text-4xl uppercase">{product.name}</h1>
        <p className="mt-2 text-muted-foreground">{product.description}</p>
        {product.halal && <p className="mt-3 inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-bold"><span lang="ar">حلال</span> HALAL</p>}
        <fieldset className="mt-6"><legend className="mb-2 text-sm font-bold">Choose weight</legend><div className="flex flex-wrap gap-2">
          {product.variants.map(x => <button key={x.id} onClick={() => setVid(x.id)} aria-pressed={x.id === vid} className={`min-h-11 rounded-md border px-4 text-sm font-semibold ${x.id === vid ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"}`}>{x.weight} · ₹{x.price}</button>)}
        </div></fieldset>
        <div className="mt-6 flex items-end justify-between"><div><strong className="text-3xl">₹{v.price}</strong><span className="ml-2 text-sm text-muted-foreground">/ {v.weight}</span></div><span className={`text-sm font-semibold ${v.stock > 0 ? "text-foreground" : "text-destructive"}`}>{v.stock > 0 ? "In stock" : "Out of stock"}</span></div>
        <div className="mt-5 flex items-center gap-3"><span className="text-sm font-bold">Quantity</span><div className="flex items-center rounded-md border border-border"><Button variant="ghost" size="icon" aria-label="Decrease quantity" onClick={() => setQty(q => Math.max(1, q - 1))}><Minus /></Button><b className="w-8 text-center" aria-live="polite">{qty}</b><Button variant="ghost" size="icon" aria-label="Increase quantity" onClick={() => setQty(q => q + 1)}><Plus /></Button></div></div>
        {inCart > 0 && <p className="mt-3 text-sm text-muted-foreground">{inCart} already in your cart</p>}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="outline" size="lg" disabled={!v.stock} onClick={() => change(product.id, vid, qty)}>ADD TO CART</Button>
          <Button size="lg" disabled={!v.stock} onClick={() => { change(product.id, vid, qty); navigate({ to: "/cart" }); }}>BUY NOW</Button>
        </div>
      </div>
    </div>
  </div></ShopShell>;
}
