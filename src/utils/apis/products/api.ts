import { Response, Request, ResponsePagination } from "@/utils/types/api";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import {
  Product,
  ResponseProducts,
  AddProductSchema,
  EditProductSchema,
} from "./types";
import { Transactions } from "../admin/types";

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

    const url = query ? `/products?${query}` : `/products`;

    const response = await axiosWithConfig.get(url);

    return response.data as ResponsePagination<ResponseProducts[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailProduct = async (product_id: number) => {
  try {
    const response = await axiosWithConfig.get(`/products/${product_id}`);

    return response.data as Response<Product>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const buyProducts = async (body: {
  product_id: number;
  total_price: number;
}) => {
  try {
    const response = await axiosWithConfig.post(`/transactions`, body);

    return response.data as Response<Transactions>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const addProduct = async (body: AddProductSchema) => {
  try {
    const response = await axiosWithConfig.post(`/products`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const editProduct = async (
  product_id: number,
  body: EditProductSchema
) => {
  try {
    const response = await axiosWithConfig.patch(
      `/products/${product_id}`,
      body
    );

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteProduct = async (product_id: number) => {
  try {
    const response = await axiosWithConfig.delete(`/products/${product_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
