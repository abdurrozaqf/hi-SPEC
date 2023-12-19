import { getCategoryProducts, getProducts } from "./api";
import {
  AddProductSchema,
  EditProductSchema,
  Product,
  ResponseProducts,
  addProductSchema,
  editProductSchema,
} from "./types";

export {
  getProducts,
  getCategoryProducts,
  addProductSchema,
  editProductSchema,
};
export type { Product, ResponseProducts, AddProductSchema, EditProductSchema };
