import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type CartItem,
  getCart,
  saveCart,
  addItemToCart,
  decrementItem,
  incrementItem,
} from "../services/cartService";

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  totalCount: number;
  totalValue: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeOne: (id: number) => void;
  addOne: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => getCart());
  const [isOpen, setIsOpen] = useState(false);

  const persist = (next: CartItem[]) => {
    setItems(next);
    saveCart(next);
  };

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    persist(addItemToCart(items, item));
  };

  const removeOne = (id: number) => {
    persist(decrementItem(items, id));
  };

  const addOne = (id: number) => {
    persist(incrementItem(items, id));
  };

  const totalCount = items.reduce((acc, it) => acc + it.quantity, 0);
  const totalValue = items.reduce((acc, it) => acc + it.price * it.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      isOpen,
      totalCount,
      totalValue,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addToCart,
      removeOne,
      addOne,
    }),
    [items, isOpen, totalCount, totalValue],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return ctx;
}
