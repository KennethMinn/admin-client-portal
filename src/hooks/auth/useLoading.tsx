import { create } from "zustand";

type Load = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useLoading = create<Load>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
