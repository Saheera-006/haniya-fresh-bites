import breast from "@/assets/chicken-breast.jpg";
import legs from "@/assets/chicken-legs.jpg";
import whole from "@/assets/chicken-whole.jpg";
import type { Product } from "@/types/store";

export const categories = ["All", "Whole", "Breast", "Thigh", "Wings", "Legs", "Boneless"];
export const products: Product[] = [
  { id:"breast", name:"Chicken Breast", category:"Breast", description:"Fresh boneless breast cut", image:breast, popular:true, halal:true, available:true, variants:[{id:"breast-500",weight:"500g",price:240,stock:20},{id:"breast-1",weight:"1kg",price:450,stock:12}]},
  { id:"thigh", name:"Chicken Thigh", category:"Thigh", description:"Tender, flavour-rich thigh cuts", image:legs, popular:true, halal:true, available:true, variants:[{id:"thigh-500",weight:"500g",price:220,stock:16},{id:"thigh-1",weight:"1kg",price:420,stock:9}]},
  { id:"wings", name:"Chicken Wings", category:"Wings", description:"Clean-cut wings for frying or grilling", image:whole, popular:false, halal:true, available:true, variants:[{id:"wings-500",weight:"500g",price:200,stock:18},{id:"wings-1",weight:"1kg",price:380,stock:10}]},
  { id:"drumsticks", name:"Chicken Drumsticks", category:"Legs", description:"Juicy skin-on drumsticks", image:legs, popular:true, halal:true, available:true, variants:[{id:"drum-500",weight:"500g",price:210,stock:14},{id:"drum-1",weight:"1kg",price:400,stock:8}]},
  { id:"whole", name:"Whole Chicken", category:"Whole", description:"Whole dressed chicken, kitchen-ready", image:whole, popular:false, halal:true, available:true, variants:[{id:"whole-1",weight:"1kg",price:260,stock:8},{id:"whole-15",weight:"1.5kg",price:390,stock:7},{id:"whole-2",weight:"2kg",price:510,stock:4}]},
  { id:"boneless", name:"Chicken Boneless", category:"Boneless", description:"Lean boneless curry cut", image:breast, popular:true, halal:true, available:true, variants:[{id:"boneless-500",weight:"500g",price:280,stock:14},{id:"boneless-1",weight:"1kg",price:530,stock:6}]},
];
export const offers = [
  { id:"first", title:"First order offer", detail:"₹75 off on orders above ₹699", code:"FRESH75" },
  { id:"cuts", title:"Weeknight cuts", detail:"Save ₹40 on selected 1kg cuts", code:"CUT40" },
];
export const sampleOrders = [{id:"HP240921",date:"21 Sep 2026",items:"Chicken Breast, Drumsticks",total:690,status:"Preparing"}];
