import { create } from 'zustand';
import type { User } from '@/types';

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  loadUserFromSession: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loadUserFromSession: () => {
    const user = sessionStorage.getItem('user');
    if (user) {
      set({ user: JSON.parse(user) });
    }
  },
}));
