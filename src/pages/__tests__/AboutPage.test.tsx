import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AboutPage } from "../AboutPage";

test("AboutPage renders heading", () => {
  render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>,
  );
  expect(screen.getByText(/Tienda para mascotas Chopper/i)).toBeInTheDocument();
});
