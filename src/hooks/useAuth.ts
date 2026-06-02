import { useMemo } from "react";
import { AuthUser } from "../types";
import { useLocalStorage } from "./useLocalStorage";

const usersKey = "finansmart:auth:users";
const sessionKey = "finansmart:auth:session";

const adminUser: AuthUser = {
  id: "admin",
  name: "Administrador",
  email: "admin",
  password: "admin",
  role: "admin",
  createdAt: new Date("2026-06-01T00:00:00.000Z").toISOString(),
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function useAuth() {
  const [users, setUsers] = useLocalStorage<AuthUser[]>(usersKey, [adminUser]);
  const [sessionId, setSessionId] = useLocalStorage<string | null>(sessionKey, null);

  const hydratedUsers = useMemo(() => {
    const hasAdmin = users.some((user) => user.id === "admin");
    return hasAdmin ? users : [adminUser, ...users];
  }, [users]);

  const currentUser = hydratedUsers.find((user) => user.id === sessionId) || null;

  const login = (email: string, password: string) => {
    const user = hydratedUsers.find((item) => normalize(item.email) === normalize(email) && item.password === password);
    if (!user) return { ok: false, message: "E-mail ou senha invalidos." };
    setSessionId(user.id);
    return { ok: true, message: "Login realizado com sucesso." };
  };

  const register = (input: { name: string; email: string; password: string }) => {
    const email = normalize(input.email);
    if (!input.name.trim() || !email || !input.password) return { ok: false, message: "Preencha todos os campos." };
    if (hydratedUsers.some((user) => normalize(user.email) === email)) return { ok: false, message: "Este usuario ja existe." };
    const user: AuthUser = {
      id: crypto.randomUUID(),
      name: input.name.trim(),
      email,
      password: input.password,
      role: "user",
      createdAt: new Date().toISOString(),
    };
    setUsers([...hydratedUsers, user]);
    setSessionId(user.id);
    return { ok: true, message: "Cadastro criado com sucesso." };
  };

  const updateProfile = (input: { name: string; email: string; password?: string }) => {
    if (!currentUser) return { ok: false, message: "Usuario nao autenticado." };
    const email = normalize(input.email);
    if (hydratedUsers.some((user) => user.id !== currentUser.id && normalize(user.email) === email)) {
      return { ok: false, message: "Este e-mail ja esta em uso." };
    }
    setUsers(hydratedUsers.map((user) => user.id === currentUser.id ? {
      ...user,
      name: input.name.trim(),
      email,
      password: input.password?.trim() ? input.password : user.password,
    } : user));
    return { ok: true, message: "Perfil atualizado com sucesso." };
  };

  const logout = () => setSessionId(null);

  return { users: hydratedUsers, currentUser, login, register, updateProfile, logout };
}
