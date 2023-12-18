import { addProduct, deleteProduct, editProduct } from "./api";
import {
  AddProductSchema,
  EditProductSchema,
  Product,
  addProductSchema,
  editProductSchema,
} from "./types";

export {
  addProduct,
  editProduct,
  deleteProduct,
  addProductSchema,
  editProductSchema,
};
export type { Product, AddProductSchema, EditProductSchema };
