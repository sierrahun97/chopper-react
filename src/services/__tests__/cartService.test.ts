import {
  getCart,
  saveCart,
  addItemToCart,
  decrementItem,
  incrementItem,
  type CartItem,
} from "../cartService";

describe("cartService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("getCart returns empty array when no data", () => {
    expect(getCart()).toEqual([]);
  });

  test("saveCart and getCart persist items", () => {
    const it: CartItem = {
      id: 1,
      name: "A",
      price: 10,
      image: "x",
      quantity: 2,
    };
    saveCart([it]);
    expect(getCart()).toEqual([it]);
  });

  test("addItemToCart adds new item and increments existing", () => {
    const itemNoQty = { id: 1, name: "A", price: 10, image: "x" } as Omit<
      CartItem,
      "quantity"
    >;
    let res = addItemToCart([], itemNoQty);
    expect(res).toHaveLength(1);
    expect(res[0].quantity).toBe(1);

    res = addItemToCart(res, itemNoQty);
    expect(res[0].quantity).toBe(2);
  });

  test("decrementItem decrements and removes when zero", () => {
    let arr: CartItem[] = [
      { id: 1, name: "A", price: 10, image: "x", quantity: 2 },
    ];
    arr = decrementItem(arr, 1);
    expect(arr[0].quantity).toBe(1);
    arr = decrementItem(arr, 1);
    expect(arr).toHaveLength(0);
  });

  test("incrementItem increases quantity", () => {
    let arr: CartItem[] = [
      { id: 1, name: "A", price: 10, image: "x", quantity: 1 },
    ];
    arr = incrementItem(arr, 1);
    expect(arr[0].quantity).toBe(2);
  });
});
