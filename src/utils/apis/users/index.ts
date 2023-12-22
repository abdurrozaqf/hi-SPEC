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
  UpdateUsersAdminSchema,
  updateUsersAdminSchema,
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
  updateUsersAdminSchema,
};
export type {
  User,
  AllUser,
  UpdateUserSchema,
  MyWishlist,
  UpdateUsersAdminSchema,
};
