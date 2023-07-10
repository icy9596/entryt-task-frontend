import storage from "./storage";
import { User } from "@/types/model";

const TOKEN_KEY = "token";

const getToken = (): string | null => {
  return storage.getItem(TOKEN_KEY);
};

const setToken = (token: string | null) => {
  storage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  storage.removeItem(TOKEN_KEY);
};

const parseTokenToUser = (token: string): User => {
  const [, payloadStr] = token.split(".");
  const payload = JSON.parse(window.atob(payloadStr)) as User;
  const { id, username } = payload || {};
  const user = { id, username };
  return user;
};

export { getToken, setToken, clearToken, parseTokenToUser };
