import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { User, UpdateProfileSchema } from "./types";
import { Response } from "@/utils/types/api";

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get(`/users`);

    return response.data as Response<User>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateProfile = async (
  user_id: number,
  body: UpdateProfileSchema
) => {
  try {
    const response = await axiosWithConfig.patch(`/users/${user_id}`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteProfile = async (user_id: number) => {
  try {
    const response = await axiosWithConfig.delete(`/users/${user_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const addWishlist = async (product_id: number) => {
  try {
    const response = await axiosWithConfig.post(`/fav/${product_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteWishlist = async (favorite_id: number) => {
  try {
    const response = await axiosWithConfig.delete(`/fav/${favorite_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getNota = async (transaction_id: number) => {
  try {
    const response = await axiosWithConfig.get(
      `/transactions/${transaction_id}/download`
    );

    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
