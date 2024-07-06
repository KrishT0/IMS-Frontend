import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User as user } from "../types";

type userType = {
  user: user | null;
  setUser: (user: user | null) => void;
  logout: () => void;
  setToken: (token: string) => void;
};

export const useUser = create<userType>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      setToken: (token: string) =>
        set((state) => {
          if (state.user) {
            return { user: { ...state.user, token } };
          }
          return state;
        }),
    }),
    { name: "user" }
  )
);
