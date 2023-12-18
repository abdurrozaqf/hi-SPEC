import axiosWithConfig from "../axiosWithConfig";
import { Response } from "@/utils/types/api";

export const getDetailProduk = async (product_id: number) => {
  try {
    const response = await axiosWithConfig.get(`/product/${product_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
