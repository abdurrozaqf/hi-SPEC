import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const updateUserSchema = z.object({
  name: z.string().min(1, { message: "Full name is required" }).max(50),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email"),
  password: z.string().min(1, { message: "Password is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  phone_number: z.number().min(1, { message: "Phone number is required" }),
  image: z
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

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export interface User {
  user_id: number;
  name: string;
  email: string;
  avatar: string;
  password: string;
  my_favorite: {
    product_id: number;
    favorite_id: number;
    name: string;
    price: number;
    picture: string;
  }[];
}

export interface AllUser {
  id: number;
  email: string;
  name: string;
  address: string;
  phone_number: string;
  avatar: string;
}
