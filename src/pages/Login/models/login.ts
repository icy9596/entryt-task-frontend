import { create } from "zustand";

import { fetchLogin } from "@/services/auth";
import { setToken } from '@/utils/helper';
import { useStore as useSystemStore } from '@/models/system';

interface State {
  loading: boolean;
}
interface Action {
  setLoading(loading: State["loading"]): void;
  login(formValues: { username: string; password: string }): void;
  logout(): void;
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
      const user = await fetchLogin(formValues);
      const { token } = user;
      setToken(token);
      useSystemStore.getState().setCurrentUser(user);
    } finally {
      setLoading(false);
    }
  },
  logout() {},
}));

export { useStore, type Store };
