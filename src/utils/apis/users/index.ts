import { getUser, updateUser, deleteUser, getDetailUser } from "./api";
import {
  User,
  UpdateUserSchema,
  updateUserSchema,
  AllUser,
  tokenUser,
} from "./types";

export { getUser, getDetailUser, updateUser, deleteUser, updateUserSchema };
export type { User, AllUser, UpdateUserSchema, tokenUser };
