/**
 * userService.ts
 * Gestiona la persistencia de usuarios y sesión en localStorage.
 * Requerimiento tarea.md: carpeta services/ para datos simulados (Mocks).
 */

export type User = {
  nombre: string;
  email: string;
  password: string;
  rol: "CLIENTE" | "ADMIN";
};

const USERS_KEY = "users-react";
const SESSION_KEY = "loggedInUser";

function isValidUser(value: unknown): value is User {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<User>;
  return (
    typeof candidate.nombre === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.password === "string" &&
    (candidate.rol === "ADMIN" || candidate.rol === "CLIENTE")
  );
}

/** Lee todos los usuarios almacenados */
export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    const users = parsed.filter(isValidUser);

    // Si había datos con el esquema viejo, saneamos y persistimos solo válidos.
    if (users.length !== parsed.length) {
      saveUsers(users);
    }

    return users;
  } catch {
    return [];
  }
}

/** Persiste la lista completa de usuarios */
export function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** Busca un usuario por correo */
export function findUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

/** Agrega un usuario nuevo. Retorna false si ya existe el correo. */
export function createUser(input: Omit<User, "rol">): {
  ok: boolean;
  message: string;
  user?: User;
} {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    return { ok: false, message: "Ya existe un usuario con ese correo." };
  }
  const newUser: User = {
    ...input,
    rol:
      input.email.toLowerCase() === "admin@chopper.com" ? "ADMIN" : "CLIENTE",
  };
  saveUsers([...users, newUser]);
  return {
    ok: true,
    message: "Usuario registrado correctamente.",
    user: newUser,
  };
}

/** Lee la sesión activa */
export function getSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    return isValidUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Inicia sesión guardando el usuario en sessionStorage de localStorage */
export function saveSession(user: User): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  localStorage.setItem(
    "welcomeMessage",
    `Bienvenido a Chopper, ${user.nombre}!`,
  );
}

/** Valida credenciales por correo y contraseña */
export function validateCredentials(
  email: string,
  password: string,
): User | null {
  const user = findUserByEmail(email);
  if (!user) return null;
  return user.password === password ? user : null;
}

/** Cierra la sesión */
export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("welcomeMessage");
}
