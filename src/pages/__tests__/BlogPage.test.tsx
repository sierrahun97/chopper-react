const getLikesMock = jest.fn(() => [0, 0, 0]);
const incrementLikeMock = jest.fn((likes: number[], idx: number) => {
  const next = [...likes];
  next[idx] = (next[idx] ?? 0) + 1;
  return next;
});

jest.mock("../../services/blogService", () => ({
  getLikes: getLikesMock,
  incrementLike: incrementLikeMock,
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { BlogPage } from "../BlogPage";

describe("BlogPage", () => {
  beforeEach(() => {
    getLikesMock.mockClear();
    incrementLikeMock.mockClear();
    localStorage.clear();
  });

  test("renders and like button calls incrementLike", async () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Tips para cuidar/i)).toBeInTheDocument();
    const likeBtns = screen.getAllByText(/Me gusta/i);
    expect(likeBtns.length).toBeGreaterThan(0);
    await userEvent.click(likeBtns[0]);
    expect(incrementLikeMock).toHaveBeenCalled();
  });
});
