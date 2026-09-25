// Display estimate only. Final fees and discounts are confirmed by the backend when ordering.
export function summarize(subtotal: number, method: "delivery" | "pickup") {
  const deliveryFee = method === "pickup" || subtotal === 0 || subtotal >= 499 ? 0 : 30;
  const discount = 0;
  return { subtotal, deliveryFee, discount, total: subtotal + deliveryFee - discount };
}
