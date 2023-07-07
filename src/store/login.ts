import { create } from 'zustand';

interface State {
    currentUser: {
        id: string;
        username: string;
        nickname?:string;
        profile?: string;
    } | null;
}
interface Action {
    login(data: { username: string, password: string }): void;
    logout(): void;
    setCurrentUser(user: State['currentUser']): void;
}
type Store = State & Action;



const useStore = create<Store>((set) => ({
    currentUser: null,
    login(data) {
        console.log(data);
    },
    logout() {

    },
    setCurrentUser(user) {
        set({ currentUser: user });
    }
}));

export { useStore, type Store };