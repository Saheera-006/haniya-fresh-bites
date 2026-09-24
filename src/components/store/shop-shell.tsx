import { Link, useRouterState } from "@tanstack/react-router";
import { Home, PackageSearch, ReceiptText, UserRound, ShoppingBag, MapPin, Moon, Sun } from "lucide-react";
import logo from "@/assets/haniya-logo.png.asset.json";
import { useStore } from "@/context/store-context";
import { Button } from "@/components/ui/button";

export function ShopShell({children}:{children:React.ReactNode}){
 const {count,total,theme,toggleTheme}=useStore(); const path=useRouterState({select:s=>s.location.pathname});
 const nav=[{to:"/home" as const,label:"Home",icon:Home},{to:"/products" as const,label:"Products",icon:PackageSearch},{to:"/orders" as const,label:"Orders",icon:ReceiptText},{to:"/profile" as const,label:"Profile",icon:UserRound}];
 return <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
  <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur"><div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 lg:px-8">
   <Link to="/home" className="flex shrink-0 items-center gap-2"><img src={logo.url} alt="Haniya Proteins" className="size-12 object-contain"/><span className="hidden font-display text-xl uppercase sm:block">Haniya Proteins</span></Link>
   <button className="min-w-0 flex-1 text-left md:ml-6" aria-label="Change delivery location"><span className="block text-[10px] font-bold uppercase text-muted-foreground">Deliver to</span><span className="flex items-center gap-1 truncate text-sm font-semibold"><MapPin className="size-4 text-primary"/>Nagercoil</span></button>
   <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">{theme==="light"?<Moon/>:<Sun/>}</Button>
   <Button asChild variant="ghost" size="icon" className="relative"><Link to="/cart" aria-label={`Cart with ${count} items`}><ShoppingBag/><span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">{count}</span></Link></Button>
  </div></header>
  <main>{children}</main>
  {count>0&&path!=="/cart"&&path!=="/checkout"&&<div className="animate-cart-in fixed bottom-[76px] left-3 right-3 z-50 mx-auto flex max-w-xl items-center justify-between rounded-lg bg-foreground p-3 pl-4 text-background shadow-xl md:bottom-5"><div><b>{count} {count===1?"Item":"Items"}</b><span className="mx-2 opacity-50">·</span><b>₹{total}</b></div><Button asChild size="sm"><Link to="/cart">View cart</Link></Button></div>}
  <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background md:hidden"><div className="grid h-[72px] grid-cols-4">{nav.map(n=>{const I=n.icon;const active=path===n.to;return <Link key={n.to} to={n.to} className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold ${active?"text-primary":"text-muted-foreground"}`}><I className="size-5"/>{n.label}</Link>})}</div></nav>
 </div>
}
