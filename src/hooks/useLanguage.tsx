import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { us } from "../assets";

type Lng = {
  src: string;
  label: string;
  lng: string;
  setLng: (src: string, lng: string, label: string) => void;
};

export const useLanguage = create(
  persist<Lng>(
    (set) => ({
      src: us,
      label: "English",
      lng: "en",
      setLng: (src: string, lng: string, label: string) =>
        set({ src, lng, label }),
    }),
    { name: "language", storage: createJSONStorage(() => localStorage) }
  )
);
