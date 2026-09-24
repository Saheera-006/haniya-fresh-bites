import { categories, offers, products, sampleOrders } from "@/data/catalog";
const wait = (ms=180) => new Promise((resolve)=>setTimeout(resolve,ms));
export const productService = { list: async()=>{await wait(); return products}, byId: async(id:string)=>{await wait(); return products.find(p=>p.id===id) ?? null} };
export const categoryService = { list: async()=>{await wait(); return categories} };
export const offerService = { list: async()=>{await wait(); return offers} };
export const orderService = { list: async()=>{await wait(); return sampleOrders} };
export const paymentService = { createTransaction: async()=>({status:"backend_required" as const}), verify: async()=>({verified:false}) };
export const locationService = { checkServiceability: async()=>({status:"backend_required" as const}) };
