import { create } from "zustand";

import { fetchLogin } from "@/services/auth";
import { setToken, parseTokenToUser } from "@/utils/helper";
import { useStore as useSystemStore } from "@/models/system";

interface State {
  loading: boolean;
}
interface Action {
  setLoading(loading: State["loading"]): void;
  login(formValues: { username: string; password: string }): void;
}
type Store = State & Action;

const useStore = create<Store>((set, get) => ({
  loading: false,
  setLoading(loading) {
    set({ loading });
  },
  async login(formValues) {
    const { setLoading } = get();
    try {
      setLoading(true);
      const { token } = await fetchLogin(formValues);
      setToken(token);
      const user = parseTokenToUser(token);
      useSystemStore.getState().setCurrentUser(user);
    } finally {
      setLoading(false);
    }
  },
}));

export { useStore, type Store };
