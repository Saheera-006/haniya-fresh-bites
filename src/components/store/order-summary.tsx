export function OrderSummary({subtotal,deliveryFee,discount,total}:{subtotal:number;deliveryFee:number;discount:number;total:number}){
 const row=(l:string,v:string)=><div className="flex justify-between py-1.5 text-sm"><span className="text-muted-foreground">{l}</span><span className="font-semibold">{v}</span></div>;
 return <div className="rounded-lg border border-border bg-card p-4"><h2 className="mb-2 font-bold">Bill summary</h2>{row("Subtotal",`₹${subtotal}`)}{row("Delivery fee",deliveryFee?`₹${deliveryFee}`:"Free")}{row("Discount",discount?`−₹${discount}`:"₹0")}<div className="mt-2 flex justify-between border-t border-border pt-3 text-base font-extrabold"><span>Total</span><span>₹{total}</span></div></div>;
}
