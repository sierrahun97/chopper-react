const clearCartMock = jest.fn();
const cartMock: any = { items: [], totalValue: 0, clearCart: clearCartMock };

jest.mock("../../contexts/CartContext", () => ({ useCart: () => cartMock }));

const addSalesMock = jest.fn();
jest.mock("../../services/salesService", () => ({ addSales: addSalesMock }));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockNavigate,
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckoutPage } from "../CheckoutPage";

describe("CheckoutPage", () => {
  beforeEach(() => {
    clearCartMock.mockClear();
    addSalesMock.mockClear();
    mockNavigate.mockClear();
    localStorage.clear();
    cartMock.items = [];
    cartMock.totalValue = 0;
  });

  test("shows empty cart message when no items", () => {
    render(<CheckoutPage />);
    expect(
      screen.getByText(/No hay productos en tuc carrito/i),
    ).toBeInTheDocument();
  });

  test("processes purchase and redirects after timeout", async () => {
    cartMock.items = [{ id: 1, name: "A", price: 10, quantity: 2, image: "" }];
    cartMock.totalValue = 20;
    addSalesMock.mockResolvedValue(undefined);

    // mock setTimeout to call immediately so we don't wait real time
    const setTimeoutSpy = jest
      .spyOn(global, "setTimeout")
      .mockImplementation((cb: any) => {
        cb();
        return 0 as any;
      });

    render(<CheckoutPage />);

    const buyBtn = screen.getByRole("button", { name: /Comprar/i });
    await userEvent.click(buyBtn);

    await expect(addSalesMock).toHaveBeenCalled();
    expect(clearCartMock).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/home");

    setTimeoutSpy.mockRestore();
  });
});
