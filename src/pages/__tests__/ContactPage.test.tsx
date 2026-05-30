import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ContactPage } from "../ContactPage";

describe("ContactPage validation", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("alerts when name contains numbers", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    const nameInput = screen.getAllByPlaceholderText("Nombre aquí")[0];
    const emailInput = screen.getAllByPlaceholderText("Email aquí")[0];
    const messageInput = screen.getAllByRole("textbox")[0];
    await userEvent.type(nameInput, "John123");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(messageInput, "Hola");
    const firstBtn = screen.getAllByRole("button", { name: /Enviar/i })[0];
    const form = firstBtn.closest("form");
    if (!form) throw new Error("Form not found");
    fireEvent.submit(form);
    expect(alertSpy).toHaveBeenCalled();
    alertSpy.mockRestore();
  });
});
