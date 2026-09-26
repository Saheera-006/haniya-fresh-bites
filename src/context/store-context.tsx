import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products } from "@/data/catalog";
import type { AddressDraft, CartLine, Order, SavedAddress } from "@/types/store";

type Pay = "UPI" | "Card" | "COD";
type StoreContextValue = {
  cart: CartLine[]; add: (productId: string, variantId: string) => void; change: (productId: string, variantId: string, delta: number) => void; remove: (productId: string, variantId: string) => void; count: number; total: number; clear: () => void;
  theme: "light" | "dark"; toggleTheme: () => void;
  address: AddressDraft; setAddress: (a: AddressDraft) => void;
  addresses: SavedAddress[]; saveAddress: (a: SavedAddress) => void; deleteAddress: (id: string) => void; setDefaultAddress: (id: string) => void; selectAddress: (id: string) => void; selectedAddressId: string | null;
  deliveryMethod: "delivery" | "pickup"; setDeliveryMethod: (v: "delivery" | "pickup") => void; payment: Pay; setPayment: (v: Pay) => void;
  authenticated: boolean; setAuthenticated: (v: boolean) => void; customer: { name: string; mobile: string; email?: string }; setCustomer: (c: { name: string; mobile: string; email?: string }) => void;
  orders: Order[]; addOrder: (o: Order) => void;
};
export const emptyAddress: AddressDraft = { label: "Home", house: "", street: "", area: "", city: "Nagercoil", state: "Tamil Nadu", pincode: "", landmark: "", formattedAddress: "Nagercoil, Tamil Nadu" };
const C = createContext<StoreContextValue | null>(null);
export function lineDetails(line: CartLine) { const p = products.find(x => x.id === line.productId); const v = p?.variants.find(x => x.id === line.variantId); return { product: p, variant: v }; }
export function formatAddress(a: AddressDraft) { return [a.house, a.street, a.area, a.city, a.state, a.pincode].filter(Boolean).join(", "); }

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]); const [theme, setTheme] = useState<"light" | "dark">("light"); const [address, setAddress] = useState(emptyAddress);
  const [addresses, setAddresses] = useState<SavedAddress[]>([]); const [selectedAddressId, setSelected] = useState<string | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery"); const [payment, setPayment] = useState<Pay>("UPI"); const [authenticated, setAuthenticated] = useState(false);
  const [customer, setCustomer] = useState<{ name: string; mobile: string; email?: string }>({ name: "", mobile: "" }); const [orders, setOrders] = useState<Order[]>([]); const [ready, setReady] = useState(false);
  useEffect(() => { try { const saved = localStorage.getItem("haniya-store"); if (saved) { const s = JSON.parse(saved); setCart(s.cart ?? []); setTheme(s.theme ?? "light"); setAddress(s.address ?? emptyAddress); setAddresses(s.addresses ?? []); setSelected(s.selectedAddressId ?? null); setDeliveryMethod(s.deliveryMethod ?? "delivery"); setPayment(s.payment ?? "UPI"); setAuthenticated(s.authenticated ?? false); setCustomer(s.customer ?? { name: "", mobile: "" }); setOrders(s.orders ?? []); } } catch { /* ignore */ } setReady(true); }, []);
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); if (ready) localStorage.setItem("haniya-store", JSON.stringify({ cart, theme, address, addresses, selectedAddressId, deliveryMethod, payment, authenticated, customer, orders })); }, [ready, cart, theme, address, addresses, selectedAddressId, deliveryMethod, payment, authenticated, customer, orders]);
  const change = (productId: string, variantId: string, delta: number) => setCart(prev => { const found = prev.find(x => x.productId === productId && x.variantId === variantId); if (!found && delta > 0) return [...prev, { productId, variantId, quantity: delta }]; return prev.map(x => x === found ? { ...x, quantity: x.quantity + delta } : x).filter(x => x.quantity > 0); });
  const count = cart.reduce((a, b) => a + b.quantity, 0); const total = cart.reduce((sum, line) => sum + (lineDetails(line).variant?.price ?? 0) * line.quantity, 0);
  const selectAddress = (id: string) => { const f = addresses.find(x => x.id === id); if (f) { setSelected(id); setAddress(f); } };
  const saveAddress = (a: SavedAddress) => setAddresses(prev => {
    const exists = prev.some(x => x.id === a.id);
    let next = exists ? prev.map(x => x.id === a.id ? a : x) : [...prev, { ...a, isDefault: prev.length === 0 || a.isDefault }];
    if (a.isDefault) next = next.map(x => ({ ...x, isDefault: x.id === a.id }));
    setSelected(a.id); setAddress(a);
    return next;
  });
  const deleteAddress = (id: string) => setAddresses(prev => { let next = prev.filter(x => x.id !== id); if (next.length && !next.some(x => x.isDefault)) next = next.map((x, i) => ({ ...x, isDefault: i === 0 })); if (selectedAddressId === id) { setSelected(next[0]?.id ?? null); setAddress(next[0] ?? emptyAddress); } return next; });
  const setDefaultAddress = (id: string) => setAddresses(prev => prev.map(x => ({ ...x, isDefault: x.id === id })));
  const value = useMemo(() => ({ cart, add: (p: string, v: string) => change(p, v, 1), change, remove: (p: string, v: string) => setCart(prev => prev.filter(x => !(x.productId === p && x.variantId === v))), count, total, clear: () => setCart([]), theme, toggleTheme: () => setTheme(t => t === "light" ? "dark" : "light"), address, setAddress, addresses, saveAddress, deleteAddress, setDefaultAddress, selectAddress, selectedAddressId, deliveryMethod, setDeliveryMethod, payment, setPayment, authenticated, setAuthenticated, customer, setCustomer, orders, addOrder: (o: Order) => setOrders(prev => [o, ...prev]) }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart, count, total, theme, address, addresses, selectedAddressId, deliveryMethod, payment, authenticated, customer, orders]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useStore = () => { const v = useContext(C); if (!v) throw new Error("StoreProvider missing"); return v; };
