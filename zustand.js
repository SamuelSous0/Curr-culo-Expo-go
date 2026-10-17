import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStore = create(
  persist(
    (set, get) => ({
      modoEscuro: false,
      toggleModoEscuro: () => set((state) => ({ modoEscuro: !state.modoEscuro })),
      setModoEscuro: (val) => set({ modoEscuro: val }),

      perfilAtivoId: "223dc11e-9f18-42b1-9245-36aae75e7d87",
      setPerfilAtivoId: (id) => set({ perfilAtivoId: id }),

      projetosFavoritos: [],
      toggleFavorito: (projetoId) => {
        const favoritos = get().projetosFavoritos;
        if (favoritos.includes(projetoId)) {
          set({ projetosFavoritos: favoritos.filter((id) => id !== projetoId) });
        } else {
          set({ projetosFavoritos: [...favoritos, projetoId] });
        }
      },
      isFavorito: (projetoId) => get().projetosFavoritos.includes(projetoId),
    }),
    {
      name: "curriculo-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
