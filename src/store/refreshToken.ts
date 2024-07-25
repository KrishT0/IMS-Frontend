import { create } from "zustand";
import { persist } from "zustand/middleware";

type refreshTokenType = {
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string | null) => void;
};

export const useRefreshToken = create<refreshTokenType>()(
  persist(
    (set) => ({
      refreshToken: null,
      setRefreshToken: (refreshToken) => set({ refreshToken }),
    }),
    { name: "refreshToken" }
  )
);
