const addToCartMock = jest.fn();

jest.mock("../../contexts/CartContext", () => ({
  useCart: () => ({ addToCart: addToCartMock }),
}));

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "../HomePage";

describe("HomePage", () => {
  beforeEach(() => {
    addToCartMock.mockClear();
  });

  test("renders hero heading and Add buttons work", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/Tienda para mascotas Chopper/i),
    ).toBeInTheDocument();
    const addButtons = screen.getAllByText(/Añadir/i);
    expect(addButtons.length).toBeGreaterThan(0);
  });
});
