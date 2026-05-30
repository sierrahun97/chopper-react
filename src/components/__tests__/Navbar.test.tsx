import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock contexts used by Navbar
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    users: [],
    register: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  }),
}));

jest.mock("../../contexts/CartContext", () => ({
  useCart: () => ({
    items: [],
    isOpen: false,
    totalCount: 0,
    totalValue: 0,
    openCart: jest.fn(),
    closeCart: jest.fn(),
    addToCart: jest.fn(),
    removeOne: jest.fn(),
    addOne: jest.fn(),
    clearCart: jest.fn(),
  }),
}));

import { Navbar } from "../Navbar";

test("renders basic navigation links", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );

  expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
  expect(screen.getByText(/Blog/i)).toBeInTheDocument();
});
