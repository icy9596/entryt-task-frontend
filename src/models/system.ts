import { create } from "zustand";

import { User } from "@/types/model";
import { parseTokenToUser, getToken, setToken } from "@/utils/helper";

interface State {
  currentUser: User | null;
}
interface Action {
  setCurrentUser(user: State["currentUser"]): void;
  logout(): void;
}
type Store = State & Action;

const useStore = create<Store>((set) => {
  const token = getToken();
  let user: User | null = null;
  if (token) {
    user = parseTokenToUser(token);
  }

  return {
    currentUser: user,
    setCurrentUser(user) {
      set({ currentUser: user });
    },
    logout() {
      set({ currentUser: null });
      setToken(null);
    },
  };
});

export { useStore, type Store };
