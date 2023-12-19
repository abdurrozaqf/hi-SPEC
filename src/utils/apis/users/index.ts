import {
  getUser,
  updateUser,
  deleteUser,
  getDetailUser,
  addWishlist,
  deleteWishlist,
} from "./api";
import { User, UpdateUserSchema, updateUserSchema, AllUser } from "./types";

export {
  getUser,
  getDetailUser,
  updateUser,
  deleteUser,
  addWishlist,
  deleteWishlist,
  updateUserSchema,
};
export type { User, AllUser, UpdateUserSchema };
