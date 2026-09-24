export type ProductVariant = { id: string; weight: string; price: number; stock: number };
export type Product = { id: string; name: string; category: string; description: string; image: string; variants: ProductVariant[]; popular: boolean; halal: boolean; available: boolean };
export type CartLine = { productId: string; variantId: string; quantity: number };
export type AddressDraft = { label: "Home" | "Work" | "Other"; house: string; street: string; area: string; city: string; state: string; pincode: string; landmark: string; latitude?: number; longitude?: number; formattedAddress: string };
