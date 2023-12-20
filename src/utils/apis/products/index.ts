import {
  getCategoryProducts,
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
  getDetailProduct,
} from "./api";

import {
  Product,
  AddProductSchema,
  EditProductSchema,
  ResponseProducts,
  addProductSchema,
  editProductSchema,
} from "./types";

export {
  getProducts,
  getCategoryProducts,
  getDetailProduct,
  addProduct,
  editProduct,
  deleteProduct,
  addProductSchema,
  editProductSchema,
};

export type { Product, AddProductSchema, EditProductSchema, ResponseProducts };
