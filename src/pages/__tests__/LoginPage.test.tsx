let registerMock = jest.fn();
let loginMock = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    register: registerMock,
    login: loginMock,
    user: null,
    users: [],
    logout: jest.fn(),
  }),
}));

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockNavigate,
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "../LoginPage";

describe("LoginPage", () => {
  beforeEach(() => {
    registerMock = jest.fn();
    loginMock = jest.fn();
  });

  test("shows error when login fields are empty", async () => {
    render(<LoginPage />);
    const submit = screen.getByDisplayValue("Iniciar sesión");
    await userEvent.click(submit);
    const matches = screen.getAllByText(
      /Por favor, ingresa tu correo y contraseña/i,
    );
    expect(matches.length).toBeGreaterThan(0);
  });

  test("calls register when signing up", async () => {
    registerMock.mockImplementation(() => ({ ok: true, message: "ok" }));
    render(<LoginPage />);
    const signUpBtn = screen.getByRole("button", { name: /Regístrate/i });
    await userEvent.click(signUpBtn);
    const nameInput = screen.getAllByPlaceholderText("Nombre")[0];
    const emailInput = screen.getAllByPlaceholderText("Correo")[1];
    const passInput = screen.getAllByPlaceholderText("Contraseña")[1];
    await userEvent.type(nameInput, "Test");
    await userEvent.type(emailInput, "t@e.com");
    await userEvent.type(passInput, "pwd");
    const submitRegister = screen.getByDisplayValue("Registrarme");
    await userEvent.click(submitRegister);
    expect(registerMock).toHaveBeenCalled();
  });
});
