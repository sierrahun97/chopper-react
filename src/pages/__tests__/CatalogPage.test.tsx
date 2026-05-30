const addToCartMock = jest.fn();
const getAdminProductsMock = jest.fn(async () => [
  {
    id_producto: 42,
    codigo_producto: "P42",
    nombre_producto: "AdminProd",
    categoria_producto: "cat",
    descripcion_producto: "desc",
    precio: 100,
    stock: 5,
    descuento_vip: 0,
    url: "",
  },
]);

jest.mock("../../contexts/CartContext", () => ({
  useCart: () => ({ addToCart: addToCartMock }),
}));
jest.mock("../../services/productService", () => ({
  getAdminProducts: getAdminProductsMock,
}));

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CatalogPage } from "../CatalogPage";

describe("CatalogPage", () => {
  beforeEach(() => {
    addToCartMock.mockClear();
    getAdminProductsMock.mockClear();
    localStorage.clear();
  });

  test("renders heading and admin products are loaded", async () => {
    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/Tienda para mascotas Chopper/i),
    ).toBeInTheDocument();
    // wait for admin product to appear
    const prod = await screen.findByText(/AdminProd/i);
    expect(prod).toBeInTheDocument();
  });
});
