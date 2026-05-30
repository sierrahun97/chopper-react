import { getSales, addSales } from "../salesService";

describe("salesService fallbacks", () => {
  beforeEach(() => {
    localStorage.clear();
    (global as any).fetch = jest.fn();
  });

  test("getSales falls back to localStorage on network error", async () => {
    const stored = [
      {
        id: "1",
        codigoVenta: "VTA-1",
        date: "01/01/2020",
        total: 100,
        items: [],
      },
    ];
    localStorage.setItem("listaventas_ordenes", JSON.stringify(stored));
    (global as any).fetch.mockRejectedValue(new TypeError("network"));
    const res = await getSales();
    expect(res).toEqual(stored);
  });

  test("addSales saves to localStorage when network error", async () => {
    (global as any).fetch.mockRejectedValue(new TypeError("network"));
    const cartItems = [{ id: 1, name: "A", price: 10, quantity: 2 }];
    await addSales(cartItems as any);
    const stored = JSON.parse(
      localStorage.getItem("listaventas_ordenes") || "[]",
    );
    expect(stored).toHaveLength(1);
    expect(stored[0].items[0].productName).toBe("A");
    expect(stored[0].total).toBe(20);
  });
});
