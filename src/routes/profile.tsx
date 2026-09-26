import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronRight, FileText, HelpCircle, LogOut, MapPin, Moon, ReceiptText, Shield, UserRound } from "lucide-react";
import { ShopShell } from "@/components/store/shop-shell";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/store-context";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Haniya Proteins" }, { name: "description", content: "Manage your Haniya Proteins account." }, { property: "og:title", content: "Profile — Haniya Proteins" }, { property: "og:description", content: "Manage your account, addresses and orders." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: Profile,
});

function Profile() {
  const st = useStore();
  const navigate = useNavigate();
  const logout = async () => { st.setAuthenticated(false); navigate({ to: "/", replace: true }); };
  const Row = ({ icon: I, label, sub, onClick }: { icon: typeof Bell; label: string; sub?: string; onClick?: () => void }) => <button onClick={onClick} className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left hover:bg-secondary"><I className="size-5 text-muted-foreground" /><span className="flex-1"><span className="block font-semibold">{label}</span>{sub && <span className="block text-xs text-muted-foreground">{sub}</span>}</span><ChevronRight className="size-4 text-muted-foreground" /></button>;
  return <ShopShell><div className="mx-auto max-w-2xl space-y-4 px-4 py-6">
    <section className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"><span className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary"><UserRound /></span><div className="flex-1"><h1 className="text-lg font-extrabold">{st.authenticated ? st.customer.name || "Haniya customer" : "Guest"}</h1><p className="text-sm text-muted-foreground">{st.authenticated ? st.customer.mobile || "Add your mobile at checkout" : "Login to save addresses and see orders"}</p></div>{!st.authenticated && <Button asChild size="sm"><Link to="/">LOGIN</Link></Button>}</section>
    <section className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
      <Row icon={ReceiptText} label="My orders" onClick={() => navigate({ to: "/orders" })} />
      <Row icon={MapPin} label="Saved addresses" sub={st.addresses.length ? `${st.addresses.length} saved` : "Add your delivery spots"} onClick={() => navigate({ to: "/addresses" })} />
      <Row icon={Bell} label="Notifications" sub="Order updates" />
      <Row icon={Moon} label="Theme" sub={st.theme === "light" ? "Light" : "Dark"} onClick={st.toggleTheme} />
    </section>
    <section className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
      <Row icon={HelpCircle} label="Help & support" onClick={() => navigate({ to: "/home" })} />
      <Row icon={Shield} label="Privacy policy" />
      <Row icon={FileText} label="Terms & conditions" />
    </section>
    {st.authenticated && <Button variant="outline" className="w-full text-destructive" onClick={logout}><LogOut />Logout</Button>}
  </div></ShopShell>;
}
