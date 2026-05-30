import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFoundPage } from "../NotFoundPage";

test("NotFoundPage shows message and link", () => {
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>,
  );
  expect(screen.getByText(/Pagina no encontrada/i)).toBeInTheDocument();
  expect(screen.getByText(/Volver al inicio/i)).toBeInTheDocument();
});
