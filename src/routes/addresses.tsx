import { createFileRoute } from "@tanstack/react-router";
import { ShopShell } from "@/components/store/shop-shell";
import { AddressList } from "@/components/store/address-list";

export const Route = createFileRoute("/addresses")({
  head: () => ({ meta: [{ title: "Saved Addresses — Haniya Proteins" }, { name: "description", content: "Add, edit and manage your delivery addresses on the map." }, { property: "og:title", content: "Saved Addresses — Haniya Proteins" }, { property: "og:description", content: "Manage where your fresh chicken is delivered." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: () => <ShopShell><div className="mx-auto max-w-2xl px-4 py-6"><p className="text-xs font-bold uppercase tracking-widest text-primary">Delivery</p><h1 className="mb-5 font-display text-4xl uppercase">Saved addresses</h1><AddressList selectable /></div></ShopShell>,
});
