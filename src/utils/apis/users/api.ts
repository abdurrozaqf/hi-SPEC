import { Request, Response, ResponsePagination } from "@/utils/types/api";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { User, UpdateProfileSchema } from "./types";

export const getUsers = async (params?: Request) => {
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

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get(`/user`);

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
    const response = await axiosWithConfig.patch(`/user/${user_id}`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteProfile = async (user_id: number) => {
  try {
    const response = await axiosWithConfig.delete(`/user/${user_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const addWishlist = async (product_id: number) => {
  try {
    const response = await axiosWithConfig.post(`/user/fav/add/${product_id}`);

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

export const getTransactionUser = async (user_id: number) => {
  try {
    const response = await axiosWithConfig.get(`/transaction/user/${user_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
