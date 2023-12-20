import { create } from "zustand";

import { Product } from "./apis/products";

interface WishlistState {
  compares: Partial<Product>[];
  addCompare: () => void;
  updateCompare: (index: number, product: Product) => void;
  deleteCompare: (index: number) => void;
}

const useCompareStore = create<WishlistState>((set) => ({
  compares: [{}, {}],
  addCompare: () =>
    set((state) => {
      const temp = [...state.compares, {}];
      return { compares: temp };
    }),
  updateCompare: (index, product) =>
    set((state) => {
      let temp = [...state.compares];
      temp[index] = product;

      return { compares: temp };
    }),
  deleteCompare: (index) =>
    set((state) => {
      const newCart = state.compares.filter((_, idx) => idx !== index);
      return { compares: newCart };
    }),
}));

export { useCompareStore };
