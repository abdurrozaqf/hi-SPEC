import { getCategoryProducts, getProducts } from "./api";
import {
  AddProductSchema,
  EditProductSchema,
  Product,
  ResponseAllProducts,
  addProductSchema,
  editProductSchema,
} from "./types";

export {
  getProducts,
  getCategoryProducts,
  addProductSchema,
  editProductSchema,
};
export type {
  Product,
  ResponseAllProducts,
  AddProductSchema,
  EditProductSchema,
};
