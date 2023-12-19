import { create } from "zustand";

import { Product } from "./apis/products";

interface WishlistState {
  cart: Product[];
  addProduk: (product: Product) => void;
  deleteProduk: (product: Product) => void;
}

const useCartProduct = create<WishlistState>((set) => ({
  cart: [],
  addProduk: (product) => set((state) => ({ cart: [...state.cart, product] })),
  deleteProduk: (product) =>
    set((state) => {
      const newCart = state.cart.filter(
        (item) => item.product_id !== product.product_id
      );
      return { cart: newCart };
    }),
}));

export default useCartProduct;
