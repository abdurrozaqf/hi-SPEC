import { Request, ResponsePagination } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { Product } from "./types";

export const getProducts = async (params?: Request) => {
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

    const url = query ? `/product/search?${query}` : `/products`;

    const response = await axiosWithConfig.get(url);

    return response.data as ResponsePagination;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getCategoryProducts = async (category: string, limit: number) => {
  try {
    const response = await axiosWithConfig.get(
      `/product/search?category=${category}&limit=${limit}`
    );

    return response.data as ResponsePagination;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailProducts = async (product_id: number) => {
  try {
    const response = await axiosWithConfig.get(`/product/${product_id}`);

    return response.data as Product;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
