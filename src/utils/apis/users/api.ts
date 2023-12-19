import { Request, Response, ResponsePagination } from "@/utils/types/api";
import { User, UpdateUserSchema } from "./types";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";

export const getUser = async (params?: Request) => {
  try {
    let query = "";

    if (params) {
      const queryParams: string[] = [];

      let key: keyof typeof params;
      for (key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }

      query = queryParams.join("&");
    }

    const url = query ? `/user/search?${query}` : `/users`;

    const response = await axiosWithConfig.get(url);

    return response.data as ResponsePagination;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailUser = async (user_id: string) => {
  try {
    const response = await axiosWithConfig.get(`/user/${user_id}`);

    return response.data as Response<User>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateUser = async (user_id: number, body: UpdateUserSchema) => {
  try {
    const response = await axiosWithConfig.patch(`/user/${user_id}`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteUser = async (user_id: number) => {
  try {
    const response = await axiosWithConfig.delete(`/user/${user_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const addWishlist = async (product_id: number) => {
  try {
    const response = await axiosWithConfig.post(`/user/fav/${product_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteWishlist = async (favorite_id: number) => {
  try {
    const response = await axiosWithConfig.delete(`/user/fav/${favorite_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
