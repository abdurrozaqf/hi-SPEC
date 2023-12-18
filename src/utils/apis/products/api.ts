import { Request, Response } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { Product } from "./types";

export const getProducts = async (params?: Request) => {
  try {
    const url = params ? `/product/search?${params}` : `/products`;

    const response = await axiosWithConfig.get(url);
    // const response = await axiosWithConfig.get(
    //   `/product/search?name=${name}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    // );

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getCategoryProducts = async (category: string) => {
  try {
    const response = await axiosWithConfig.get(
      `/product/search?category=${category}`
    );

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailProducts = async (product_id: string) => {
  try {
    const response = await axiosWithConfig.get(`/product/${product_id}`);

    return response.data as Product;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
