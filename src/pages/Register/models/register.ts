import { create } from "zustand";

import { fetchRegister } from "@/services/auth";

interface State {
  loading: boolean;
}
interface Action {
  register(formValues: { username: string; password: string }): void;
  setLoading(loading: State['loading']): void;
}
type Store = State & Action;

const useStore = create<Store>((set, get) => ({
  loading: false,
  async register(formValues) {
    const { setLoading } = get();
    setLoading(true);
    try {
      await fetchRegister(formValues);
    } finally {
      setLoading(false);
    }
  },
  setLoading(loading: boolean) {
    set({ loading });
  },
}));

export { useStore, type Store };
