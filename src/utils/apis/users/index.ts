import {
  getUsers,
  getProfile,
  updateProfile,
  deleteProfile,
  addWishlist,
  deleteWishlist,
} from "./api";

import {
  User,
  Profile,
  MyWishlists,
  MyTransactions,
  ResponseUsers,
  UpdateProfileSchema,
  updateProfileSchema,
  UpdateUsersAdminSchema,
  updateUsersAdminSchema,
} from "./types";

export {
  getUsers,
  getProfile,
  updateProfile,
  deleteProfile,
  addWishlist,
  deleteWishlist,
  updateProfileSchema,
  updateUsersAdminSchema,
};

export type {
  User,
  Profile,
  MyWishlists,
  MyTransactions,
  ResponseUsers,
  UpdateProfileSchema,
  UpdateUsersAdminSchema,
};
