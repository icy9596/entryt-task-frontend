const TOKEN_KEY = 'token';

const getTokenFromStorage = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export { getTokenFromStorage, clearToken };
