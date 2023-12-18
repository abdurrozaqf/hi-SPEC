import { AddProductSchema, EditProductSchema } from "./types";
import axiosWithConfig from "../axiosWithConfig";
import { Response } from "@/utils/types/api";

export const addProduct = async (body: AddProductSchema) => {
  try {
    const response = await axiosWithConfig.post(`/product`, body);

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
      `/product/${product_id}`,
      body
    );

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteProduct = async (product_id: number) => {
  try {
    const response = await axiosWithConfig.delete(`/product/${product_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
