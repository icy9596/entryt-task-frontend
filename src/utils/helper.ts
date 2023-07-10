import storage from "./storage";
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

export { getToken, setToken, clearToken };
