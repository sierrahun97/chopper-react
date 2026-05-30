const getAdminProductsMock = jest.fn(async () => [
  {
    id_producto: 1,
    codigo_producto: "P1",
    nombre_producto: "ProdAdmin",
    categoria_producto: "cat",
    descripcion_producto: "d",
    precio: 10,
    stock: 5,
    descuento_vip: 0,
    url: "",
  },
]);
const getSalesMock = jest.fn(async () => []);

jest.mock("../../services/productService", () => ({
  getAdminProducts: getAdminProductsMock,
  addAdminProduct: jest.fn(),
  removeAdminProduct: jest.fn(),
  updateAdminProduct: jest.fn(),
}));
jest.mock("../../services/salesService", () => ({ getSales: getSalesMock }));
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { nombre: "Admin", email: "a@x.com", password: "p", rol: "ADMIN" },
    users: [],
    register: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  }),
}));

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AdminPage } from "../AdminPage";

describe("AdminPage", () => {
  beforeEach(() => {
    getAdminProductsMock.mockClear();
    getSalesMock.mockClear();
    localStorage.clear();
  });

  test("renders admin dashboard and lists products", async () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Ventas e Inventario/i)).toBeInTheDocument();
    const prod = await screen.findByText(/ProdAdmin/i);
    expect(prod).toBeInTheDocument();
  });
});
