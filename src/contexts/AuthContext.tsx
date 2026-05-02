import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type User,
  getUsers,
  getSession,
  createUser,
  validateCredentials,
  saveSession,
  clearSession,
} from "../services/userService";

type AuthContextType = {
  user: User | null;
  users: User[];
  register: (input: Omit<User, "rol">) => { ok: boolean; message: string };
  login: (email: string, password: string) => { ok: boolean; message: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => getUsers());
  const [user, setUser] = useState<User | null>(() => getSession());

  const register = (input: Omit<User, "rol">) => {
    const result = createUser(input);
    if (result.ok) {
      setUsers(getUsers());
    }
    return { ok: result.ok, message: result.message };
  };

  const login = (email: string, password: string) => {
    const found = validateCredentials(email, password);
    if (!found) {
      return {
        ok: false,
        message: "Correo o contraseña incorrectos.",
      };
    }
    saveSession(found);
    setUser(found);
    return { ok: true, message: "Inicio de sesión exitoso." };
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, users, register, login, logout }),
    [user, users],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return ctx;
}
