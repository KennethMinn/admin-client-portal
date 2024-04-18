import { create } from "zustand";

type Search = {
  searchKey: string;
  setSearchKey: (searchKey: string) => void;
};

export const useSearch = create<Search>()((set) => ({
  searchKey: "",
  setSearchKey: (searchKey: string) => set({ searchKey }),
}));
