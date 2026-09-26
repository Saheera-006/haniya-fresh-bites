export type ProductVariant = { id: string; weight: string; price: number; stock: number };
export type Product = { id: string; name: string; category: string; description: string; image: string; variants: ProductVariant[]; popular: boolean; halal: boolean; available: boolean };
export type CartLine = { productId: string; variantId: string; quantity: number };
export type AddressDraft = { label: "Home" | "Work" | "Other"; house: string; street: string; area: string; city: string; state: string; pincode: string; landmark: string; latitude?: number; longitude?: number; formattedAddress: string };
export type SavedAddress = AddressDraft & { id: string; isDefault?: boolean };
export type OrderStatus = "Placed" | "Confirmed" | "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled";
export type OrderItem = { name: string; weight: string; price: number; quantity: number };
export type Order = { id: string; date: string; items: OrderItem[]; subtotal: number; deliveryFee: number; discount: number; total: number; paymentMethod: "UPI" | "Card" | "COD"; paymentStatus: "Pending" | "Paid" | "Cash on delivery"; deliveryMethod: "delivery" | "pickup"; address: string; status: OrderStatus };
