import {
  getProducts,
  getDetailProduct,
  addProduct,
  editProduct,
  deleteProduct,
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
  getDetailProduct,
  addProduct,
  editProduct,
  deleteProduct,
  addProductSchema,
  editProductSchema,
};

export type { Product, AddProductSchema, EditProductSchema, ResponseProducts };
