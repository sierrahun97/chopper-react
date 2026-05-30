import { getLikes, saveLikes, incrementLike } from "../blogService";

describe("blogService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("saveLikes and getLikes persist likes", () => {
    const likes = [0, 2, 1];
    saveLikes(likes);
    expect(getLikes()).toEqual(likes);
  });

  test("incrementLike increases counter and persists", () => {
    const likes = [0, 0, 0];
    const next = incrementLike(likes, 1);
    expect(next[1]).toBe(1);
    expect(getLikes()[1]).toBe(1);
  });
});
