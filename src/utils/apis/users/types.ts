import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const updateProfileSchema = z.object({
  name: z.string().min(1, { message: "Full name is required" }).max(50),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email"),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password minimum 8 character" }),
  newpassword: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password minimum 8 character" }),
  address: z.string().min(1, { message: "Address is required" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  avatar: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, and .png files are accepted."
    )
    .optional()
    .or(z.literal("")),
});

export const updateUsersAdminSchema = z.object({
  name: z.string().min(1, { message: "Full name is required" }).max(50),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email"),
  newpassword: z.string(),
  address: z.string().min(1, { message: "Address is required" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  avatar: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, and .png files are accepted."
    )
    .optional()
    .or(z.literal("")),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type UpdateUsersAdminSchema = z.infer<typeof updateUsersAdminSchema>;

export type User = {
  user: Profile;
  my_favorite: MyWishlists[];
  transaction: MyTransactions[];
};

export type Profile = {
  user_id: number;
  name: string;
  email: string;
  avatar: string;
  phone_number: string;
  address: string;
  role: string;
};

export type ResponseUsers = {
  user_id: number;
  email: string;
  name: string;
  address: string;
  phone_number: string;
  avatar: string;
  time: Date;
  role: string;
};

export type MyWishlists = {
  favorite_id: number;
  product_id: number;
  name: string;
  price: number;
  picture: string;
};

export type MyTransactions = {
  product_picture: string;
  product_name: string;
  nota: string;
  total_price: number;
  timestamp: Date;
  status: string;
  transaction_id: number;
  product_id: number;
  token: string;
  url: string;
};
