import { create } from 'zustand';

interface State {
    currentUser: {
        id: number;
        username: string;
        nickname?:string;
        profile?: string;
    } | null;
}
interface Action {
    setCurrentUser(user: State['currentUser']): void;
}
type Store = State & Action;

const useStore = create<Store>((set) => ({
    currentUser: null,
    setCurrentUser(user) {
        set({ currentUser: user });
    }
}));

export { useStore, type Store };