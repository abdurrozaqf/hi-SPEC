import axiosWithConfig from "../axiosWithConfig";
import { Product } from "./types";

export const getProducts = async (
  name: string,
  category: string,
  minPrice: string,
  maxPrice: string
) => {
  try {
    const response = await axiosWithConfig.get(
      `/product/search?name=${name}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );

    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getCategoryProducts = async (category: string) => {
  try {
    const response = await axiosWithConfig.get(
      `/product/search?category=${category}`
    );

    return response.data;
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
