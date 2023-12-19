import { getCategoryProducts, getProducts, addProduct, deleteProduct, editProduct } from "./api";

import {Product,
  AddProductSchema,
  EditProductSchema,
  
  ResponseProducts,
  addProductSchema,
  editProductSchema,
} from "./types";

export {
  getProducts,
  getCategoryProducts,
  addProduct,
  editProduct,
  deleteProduct,
  addProductSchema,
  editProductSchema,
};

export type { Product, AddProductSchema, EditProductSchema, ResponseProducts };
export type { Product, AddProductSchema, ResponseProducts, EditProductSchema };

