import {
  getUser,
  updateUser,
  deleteUser,
  // getDetailUser,
  addWishlist,
  deleteWishlist,
  getProfile,
} from "./api";
import {
  User,
  UpdateUserSchema,
  updateUserSchema,
  AllUser,
  MyWishlist,
} from "./types";

export {
  getUser,
  getProfile,
  // getDetailUser,
  updateUser,
  deleteUser,
  addWishlist,
  deleteWishlist,
  updateUserSchema,
};
export type { User, AllUser, UpdateUserSchema, MyWishlist };
