import {
  getAdminProducts,
  addAdminProduct,
  updateAdminProduct,
  removeAdminProduct,
  type AdminProduct,
} from "../productService";

describe("productService (fallbacks)", () => {
  beforeEach(() => {
    localStorage.clear();
    (global as any).fetch = jest.fn();
  });

  test("getAdminProducts falls back to localStorage on network error", async () => {
    const stored = [
      {
        id_producto: 1,
        codigo_producto: "P1",
        nombre_producto: "Prod1",
        categoria_producto: "cat",
        descripcion_producto: "d",
        precio: 10,
        stock: 5,
        descuento_vip: 0,
        url: "",
      },
    ];
    localStorage.setItem("listaproductos", JSON.stringify(stored));
    (global as any).fetch.mockRejectedValue(new TypeError("network"));
    const res = await getAdminProducts();
    expect(res).toEqual(stored);
  });

  test("addAdminProduct falls back to localStorage when network error", async () => {
    const p: AdminProduct = {
      codigo_producto: "P2",
      nombre_producto: "Prod2",
      categoria_producto: "cat",
      descripcion_producto: "d",
      precio: 20,
      stock: 3,
      descuento_vip: 0,
      url: "",
    } as AdminProduct;
    (global as any).fetch.mockRejectedValue(new TypeError("network"));
    await addAdminProduct(p);
    const current = JSON.parse(localStorage.getItem("listaproductos") || "[]");
    expect(current).toHaveLength(1);
    expect(current[0].nombre_producto).toBe("Prod2");
  });

  test("updateAdminProduct falls back to localStorage on TypeError", async () => {
    const existing = [
      {
        id_producto: 1,
        codigo_producto: "P1",
        nombre_producto: "Old",
        categoria_producto: "cat",
        descripcion_producto: "old",
        precio: 10,
        stock: 2,
        descuento_vip: 0,
        url: "",
      },
    ];
    localStorage.setItem("listaproductos", JSON.stringify(existing));
    (global as any).fetch.mockRejectedValue(new TypeError("network"));
    await updateAdminProduct(1, {
      codigo_producto: "P1",
      nombre_producto: "New",
      categoria_producto: "cat",
      descripcion_producto: "new",
      precio: 15,
      stock: 7,
      descuento_vip: 0,
      url: "",
    } as AdminProduct);
    const updated = JSON.parse(localStorage.getItem("listaproductos") || "[]");
    expect(updated[0].nombre_producto).toBe("New");
    expect(updated[0].stock).toBe(7);
  });

  test("removeAdminProduct throws when response is not ok", async () => {
    (global as any).fetch.mockResolvedValue({
      ok: false,
      status: 400,
      text: async () => "bad",
    });
    await expect(removeAdminProduct(1)).rejects.toThrow(
      "No se pudo eliminar el producto",
    );
  });
});
