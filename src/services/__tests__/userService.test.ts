import {
  getUsers,
  saveUsers,
  createUser,
  validateCredentials,
  saveSession,
  getSession,
  clearSession,
  type User,
} from "../userService";

describe("userService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("saveUsers and getUsers persist and read users", () => {
    const u: User = {
      nombre: "Test User",
      email: "test@example.com",
      password: "pwd",
      rol: "CLIENTE",
    };
    saveUsers([u]);
    expect(getUsers()).toEqual([u]);
  });

  test("createUser assigns ADMIN for admin email and prevents duplicates", () => {
    const res1 = createUser({
      nombre: "Admin",
      email: "admin@chopper.com",
      password: "secret",
    });
    expect(res1.ok).toBe(true);
    expect(res1.user?.rol).toBe("ADMIN");

    const res2 = createUser({
      nombre: "Admin2",
      email: "admin@chopper.com",
      password: "secret2",
    });
    expect(res2.ok).toBe(false);
  });

  test("validateCredentials and session functions", () => {
    const u: User = {
      nombre: "U",
      email: "u@example.com",
      password: "p",
      rol: "CLIENTE",
    };
    saveUsers([u]);
    expect(validateCredentials("u@example.com", "p")).toEqual(u);
    expect(validateCredentials("u@example.com", "wrong")).toBeNull();

    saveSession(u);
    expect(getSession()).toEqual(u);
    expect(localStorage.getItem("welcomeMessage")).toContain("Bienvenido");

    clearSession();
    expect(getSession()).toBeNull();
  });
});
