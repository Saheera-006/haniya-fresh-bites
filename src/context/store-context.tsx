import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products } from "@/data/catalog";
import type { AddressDraft, CartLine } from "@/types/store";

type StoreContextValue = { cart: CartLine[]; add:(productId:string,variantId:string)=>void; change:(productId:string,variantId:string,delta:number)=>void; count:number; total:number; clear:()=>void; theme:"light"|"dark"; toggleTheme:()=>void; address:AddressDraft; setAddress:(a:AddressDraft)=>void; deliveryMethod:"delivery"|"pickup"; setDeliveryMethod:(v:"delivery"|"pickup")=>void; payment:"UPI"|"Card"|"COD"; setPayment:(v:"UPI"|"Card"|"COD")=>void; authenticated:boolean; setAuthenticated:(v:boolean)=>void };
const defaultAddress: AddressDraft={label:"Home",house:"",street:"",area:"",city:"Nagercoil",state:"Tamil Nadu",pincode:"",landmark:"",formattedAddress:"Nagercoil, Tamil Nadu"};
const C=createContext<StoreContextValue|null>(null);
export function StoreProvider({children}:{children:ReactNode}){
 const [cart,setCart]=useState<CartLine[]>([]); const [theme,setTheme]=useState<"light"|"dark">("light"); const [address,setAddress]=useState(defaultAddress); const [deliveryMethod,setDeliveryMethod]=useState<"delivery"|"pickup">("delivery"); const [payment,setPayment]=useState<"UPI"|"Card"|"COD">("UPI"); const [authenticated,setAuthenticated]=useState(false);
 useEffect(()=>{try{const saved=localStorage.getItem("haniya-store");if(saved){const s=JSON.parse(saved);setCart(s.cart??[]);setTheme(s.theme??"light");setAddress(s.address??defaultAddress);setDeliveryMethod(s.deliveryMethod??"delivery");setPayment(s.payment??"UPI");setAuthenticated(s.authenticated??false)}}catch{}},[]);
 useEffect(()=>{document.documentElement.classList.toggle("dark",theme==="dark");localStorage.setItem("haniya-store",JSON.stringify({cart,theme,address,deliveryMethod,payment,authenticated}))},[cart,theme,address,deliveryMethod,payment,authenticated]);
 const change=(productId:string,variantId:string,delta:number)=>setCart(prev=>{const found=prev.find(x=>x.productId===productId&&x.variantId===variantId);if(!found&&delta>0)return[...prev,{productId,variantId,quantity:delta}];return prev.map(x=>x===found?{...x,quantity:x.quantity+delta}:x).filter(x=>x.quantity>0)});
 const add=(p:string,v:string)=>change(p,v,1); const count=cart.reduce((a,b)=>a+b.quantity,0); const total=cart.reduce((sum,line)=>{const p=products.find(x=>x.id===line.productId);const v=p?.variants.find(x=>x.id===line.variantId);return sum+(v?.price??0)*line.quantity},0);
 const value=useMemo(()=>({cart,add,change,count,total,clear:()=>setCart([]),theme,toggleTheme:()=>setTheme(t=>t==="light"?"dark":"light"),address,setAddress,deliveryMethod,setDeliveryMethod,payment,setPayment,authenticated,setAuthenticated}),[cart,count,total,theme,address,deliveryMethod,payment,authenticated]); return <C.Provider value={value}>{children}</C.Provider>
}
export const useStore=()=>{const v=useContext(C);if(!v)throw new Error("StoreProvider missing");return v};
