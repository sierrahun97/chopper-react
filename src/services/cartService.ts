export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const CART_KEY = "cart";

/** Lee el carrito almacenado */
export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

/** Persiste el carrito completo */
export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

/** Agrega un ítem o incrementa su cantidad */
export function addItemToCart(
  items: CartItem[],
  item: Omit<CartItem, "quantity">,
): CartItem[] {
  const idx = items.findIndex((i) => i.id === item.id);
  if (idx === -1) {
    return [...items, { ...item, quantity: 1 }];
  }
  const next = [...items];
  next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
  return next;
}

/** Decrementa 1 unidad; elimina el ítem si llega a 0 */
export function decrementItem(items: CartItem[], id: number): CartItem[] {
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return items;
  const next = [...items];
  if (next[idx].quantity > 1) {
    next[idx] = { ...next[idx], quantity: next[idx].quantity - 1 };
    return next;
  }
  return next.filter((i) => i.id !== id);
}

/** Incrementa 1 unidad de un ítem existente */
export function incrementItem(items: CartItem[], id: number): CartItem[] {
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return items;
  const next = [...items];
  next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
  return next;
}
