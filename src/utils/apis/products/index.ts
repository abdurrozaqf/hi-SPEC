import {
  getCategoryProducts,
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
  getDetailProduk,
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
  getDetailProduk,
  addProduct,
  editProduct,
  deleteProduct,
  addProductSchema,
  editProductSchema,
};

export type { Product, AddProductSchema, EditProductSchema, ResponseProducts };
